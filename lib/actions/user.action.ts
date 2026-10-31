"use server";

import { ActionResponse, ErrorResponse, IQuestion, IUser, PaginateSearchParams } from "@/types/global";
import action from "@/lib/handlers/action";
import { GetUserQuestionsSchema, GetUserSchema, PaginatedSearchParamsSchema } from "@/lib/validations";
import handleError from "@/lib/handlers/error";
import { QueryFilter } from "mongoose";
import { Answer, Question, User } from "@/database";
import { GetUserParams, GetUserQuestionParams } from "@/types/action";
import { NotFoundError } from "@/lib/http-errors";

export async function getUsers(
  params: PaginateSearchParams
): Promise<ActionResponse<{ users: IUser[]; isNext: boolean }>> {
  const validationResult = await action({ params, schema: PaginatedSearchParamsSchema });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { page = 1, pageSize = 10, query, filter } = params;

  const skip = (Number(page) - 1) * pageSize;
  const limit = Number(pageSize);

  const filterQuery: QueryFilter<typeof User> = {};

  if (query) {
    filterQuery.$or = [{ name: { $regex: query, $options: "i" } }, { email: { $regex: query, $options: "i" } }];
  }

  let sortCriteria = {};

  switch (query) {
    case "newest":
      sortCriteria = { createdAt: -1 };
      break;
    case "oldest":
      sortCriteria = { createdAt: 1 };
      break;
    case "popular":
      sortCriteria = { popular: -1 };
      break;
    default:
      sortCriteria = { createdAt: -1 };
      break;
  }

  try {
    const totalUsers = await User.countDocuments(filterQuery);

    const users = await User.find(filterQuery).sort(sortCriteria).skip(skip).limit(limit);

    const isNext = totalUsers > skip + users.length;

    return { success: true, data: { users: JSON.parse(JSON.stringify(users)), isNext } };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getUser(
  params: GetUserParams
): Promise<ActionResponse<{ user: IUser; totalQuestions: number; totalAnswers: number }>> {
  const validationResult = await action({ params, schema: GetUserSchema });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { userId } = params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new NotFoundError("User");
    }

    const totalQuestions = await Question.countDocuments({ author: userId });

    const totalAnswers = await Answer.countDocuments({ author: userId });

    return { success: true, data: { user: JSON.parse(JSON.stringify(user)), totalQuestions, totalAnswers } };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getUserQuestions(
  params: GetUserQuestionParams
): Promise<ActionResponse<{ questions: IQuestion[]; isNext: boolean }>> {
  const validationResult = await action({ params, schema: GetUserQuestionsSchema });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { userId, page = 1, pageSize = 10 } = params;

  const skip = (Number(page) - 1) * pageSize;
  const limit = Number(pageSize);

  try {
    const totalQuestions = await Question.countDocuments({ author: userId });

    const questions = await Question.find({ author: userId })
      .populate("tags", "name")
      .populate("author", "name image")
      .skip(skip)
      .limit(limit);

    const isNext = totalQuestions > skip + questions.length;

    return { success: true, data: { questions: JSON.parse(JSON.stringify(questions)), isNext } };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
