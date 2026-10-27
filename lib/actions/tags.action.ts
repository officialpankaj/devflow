import { ActionResponse, ErrorResponse, IQuestion, PaginateSearchParams } from "@/types/global";
import action from "@/lib/handlers/action";
import { GetTagQuestionsSchema, PaginatedSearchParamsSchema } from "@/lib/validations";
import handleError from "@/lib/handlers/error";
import { QueryFilter } from "mongoose";
import { Question, Tag } from "@/database";
import { ITagDoc } from "@/database/tag.model";
import { GetTagQuestionsParams } from "@/types/action";
import { NotFoundError } from "@/lib/http-errors";

export async function getTags(
  params: PaginateSearchParams
): Promise<ActionResponse<{ tags: ITagDoc[]; isNext: boolean }>> {
  const validationResult = await action({ params, schema: PaginatedSearchParamsSchema });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { page = 1, pageSize = 10, query, filter } = params;

  const skip = (Number(page) - 1) * pageSize;
  const limit = Number(pageSize);

  const filterQuery: QueryFilter<typeof Tag> = {};

  if (query) {
    filterQuery.$or = [{ name: { $regex: query, $options: "i" } }];
  }

  let sortCriteria = {};

  switch (filter) {
    case "popular":
      sortCriteria = { questions: -1 };
      break;
    case "recent":
      sortCriteria = { createdAt: -1 };
      break;
    case "oldest":
      sortCriteria = { createdAt: 1 };
      break;
    case "name":
      sortCriteria = { name: 1 };
      break;
    default:
      sortCriteria = { questions: 1 };
      break;
  }

  try {
    const totalTags = await Tag.countDocuments();

    const tags = await Tag.find(filterQuery).sort(sortCriteria).skip(skip).limit(limit);

    const isNext = totalTags > skip + tags.length;

    return { success: true, data: { tags: JSON.parse(JSON.stringify(tags)), isNext } };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getTagQuestion(
  params: GetTagQuestionsParams
): Promise<ActionResponse<{ tag: ITagDoc; questions: IQuestion[]; isNext: boolean }>> {
  const validationResult = await action({ params, schema: GetTagQuestionsSchema });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { page, pageSize, query, tagId } = params;

  const skip = (Number(page) - 1) * pageSize;
  const limit = Number(pageSize);

  try {
    const tag = await Tag.findById(tagId);

    if (!tag) throw new NotFoundError("Tag");

    const filterQuery: QueryFilter<typeof Question> = {
      tags: { $in: [tagId] },
    };

    if (query) {
      filterQuery.title = { $regex: query, $options: "i" };
    }

    const totalQuestion = await Question.countDocuments(filterQuery);

    const questions = await Question.find(filterQuery)
      .select("_id title views, answer, upvotes downvotes author createdAt")
      .populate([
        { path: "tags", select: "name" },
        { path: "author", select: "name image" },
      ])
      .skip(skip)
      .limit(limit);

    const isNext = totalQuestion > skip + questions.length;

    return {
      success: true,
      data: { tag: JSON.parse(JSON.stringify(tag)), questions: JSON.parse(JSON.stringify(questions)), isNext },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
