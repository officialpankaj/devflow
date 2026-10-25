"use server";

import { ZodSchema } from "zod/v3";
import { z, ZodError } from "zod";
import { UnauthorizedError, ValidationError } from "@/lib/http-errors";
import { Session } from "next-auth";
import { auth } from "@/auth";
import dbConnect from "@/lib/mongoose";

type ActionOptions<T> = {
  params?: T;
  schema?: ZodSchema<T>;
  authorize?: boolean;
};

// 1. Checking weather the schema and params are provided and validated.
// 2. Checking weather the user is authenticated;
// 3. Connecting to the database.
// 4. Returning the params and session.

async function action<T>({ params, schema, authorize }: ActionOptions<T>) {
  if (schema && params) {
    try {
      schema.parse(params);
    } catch (error) {
      if (error instanceof ZodError) {
        return new ValidationError(z.flattenError(error).fieldErrors as Record<string, string[]>);
      } else {
        return new Error("Schema validation failed");
      }
    }
  }

  let session: Session | null = null;

  if (authorize) {
    session = await auth();

    if (!session) {
      return new UnauthorizedError();
    }
  }

  await dbConnect();

  return { params, session };
}

export default action;
