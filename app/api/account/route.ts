import handleError from "@/lib/handlers/error";
import { APIErrorResponse } from "@/types/global";
import dbConnect from "@/lib/mongoose";
import { NextResponse } from "next/server";
import { ForbiddenError, ValidationError } from "@/lib/http-errors";
import Account from "@/database/account.model";
import { AccountSchema } from "@/lib/validations";
import { z } from "zod";

export async function GET() {
  try {
    await dbConnect();

    const account = await Account.find();

    return NextResponse.json({ success: true, data: account }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

// Create User
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validatedData = AccountSchema.safeParse(body);

    if (!validatedData.success) {
      throw new ValidationError(z.flattenError(validatedData.error).fieldErrors);
    }

    await dbConnect();

    const existingAccount = await Account.findOne({
      provider: validatedData.data.provider,
      providerAccountId: validatedData.data.providerAccountId,
    });
    if (existingAccount) throw new ForbiddenError("An account with the same provider already exists");

    const newAccount = await Account.create(validatedData);

    return NextResponse.json({ success: true, data: newAccount }, { status: 201 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
