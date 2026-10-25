"use server";

import { ActionResponse, ErrorResponse } from "@/types/global";
import { SignInSchema, SignUpSchema } from "@/lib/validations";
import action from "@/lib/handlers/action";
import handleError from "@/lib/handlers/error";
import mongoose from "mongoose";
import User, { IUserDoc } from "@/database/user.model";
import bcrypt from "bcryptjs";
import Account, { IAccountDoc } from "@/database/account.model";
import { signIn } from "@/auth";
import { NotFoundError, UnauthorizedError, ValidationError } from "@/lib/http-errors";

export async function signUpWithCredentials(params: AuthCredentials): Promise<ActionResponse> {
  const validationResult = await action({ params, schema: SignUpSchema });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ActionResponse;
  }

  const { name, username, email, password } = validationResult.params!;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const existingUser = await User.findOne({ email }).session(session);

    if (existingUser) {
      throw new ValidationError({ email: ["User already exists"] });
    }

    const existingUsername = await User.findOne({ username }).session(session);

    if (existingUsername) {
      throw new ValidationError({ username: ["Username already exists"] });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const [newUser] = await User.create([{ username, name, email }], { session });

    await Account.create(
      [
        {
          userId: newUser._id,
          name,
          provider: "credentials",
          providerAccountId: email,
          password: hashedPassword,
        },
      ],
      { session }
    );

    await session.commitTransaction();

    await signIn("credentials", { email, password, redirect: false });

    return { success: true } as ActionResponse;
  } catch (error) {
    await session.abortTransaction();

    return handleError(error) as ErrorResponse;
  } finally {
    await session.endSession();
  }
}

export async function signInWithCredentials(
  params: Pick<AuthCredentials, "email" | "password">
): Promise<ActionResponse> {
  const validationResult = await action({ params, schema: SignInSchema });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ActionResponse;
  }

  const { email, password } = validationResult.params!;

  try {
    const existingUser = (await User.findOne({ email })) as IUserDoc;

    if (!existingUser) throw new NotFoundError("User");

    const existingAccount = (await Account.findOne({
      provider: "credentials",
      providerAccountId: email,
    })) as IAccountDoc;

    if (!existingAccount) throw new NotFoundError("Account");

    const passwordMatch = await bcrypt.compare(password, existingAccount.password!);

    if (!passwordMatch) throw new UnauthorizedError("Password does not match");

    await signIn("credentials", { email, password, redirect: false });

    return { success: true } as ActionResponse;
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
