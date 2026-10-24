import dbConnect from "@/lib/mongoose";
import User from "@/database/user.model";
import { UserSchema } from "@/lib/validations";
import { NotFoundError, ValidationError } from "@/lib/http-errors";
import { z } from "zod";
import { NextResponse } from "next/server";
import handleError from "@/lib/handlers/error";
import { APIErrorResponse } from "@/types/global";

export async function POST(request: Request) {
  const { email } = await request.json();

  try {
    await dbConnect();

    const validatedData = UserSchema.partial().safeParse({ email });
    if (!validatedData.success) throw new ValidationError(z.flattenError(validatedData.error).fieldErrors);

    const user = await User.findOne({ email });
    if (!user) throw new NotFoundError("User");

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
