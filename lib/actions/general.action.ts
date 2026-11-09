"use server";

import { GlobalSearchParams } from "@/types/action";
import handleError from "@/lib/handlers/error";
import { ErrorResponse } from "@/types/global";
import action from "@/lib/handlers/action";
import { GlobalSearchSchema } from "@/lib/validations";
import { Answer, Question, Tag, User } from "@/database";

export async function globalSearch(params: GlobalSearchParams) {
  const validationResult = await action({ params, schema: GlobalSearchSchema });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { query, type } = validationResult.params!;
  // escape so input like "c++" or "(" is matched literally instead of crashing or running as a regex
  const regexQuery = { $regex: query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), $options: "i" };

  try {
    let results = [];

    const modelAndTypes = [
      { model: Question, searchField: "title", type: "question" },
      { model: User, searchField: "name", type: "user" },
      { model: Answer, searchField: "content", type: "answer" },
      { model: Tag, searchField: "name", type: "tag" },
    ];

    const typeLower = type?.toLowerCase();

    const SearchableTypes = ["question", "answer", "tag", "user"];

    if (!typeLower || !SearchableTypes.includes(typeLower)) {
      for (const { model, searchField, type } of modelAndTypes) {
        const queryResults = await model
          .find({
            [searchField]: regexQuery,
          })
          .limit(2);

        results.push(
          ...queryResults.map((item) => ({
            title: type === "answer" ? `Answer containing ${query}` : item[searchField],
            type,
            id: type === "answer" ? item.question : item._id,
          }))
        );
      }
    } else {
      const modelInfo = modelAndTypes?.find((item) => item.type === typeLower);

      if (!modelInfo) {
        throw new Error("Invalid search type");
      }

      const queryResults = await modelInfo.model.find({ [modelInfo.searchField]: regexQuery }).limit(8);

      results = queryResults.map((item) => ({
        title: type === "answer" ? `Answer containing ${query}` : item[modelInfo.searchField],
        type,
        id: type === "answer" ? item.question : item._id,
      }));
    }

    return { success: true, data: JSON.parse(JSON.stringify(results)) };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
