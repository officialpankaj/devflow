"use client";

import AuthForm from "@/components/forms/AuthForm";
import { SignInSchema } from "@/lib/validations";
import { signInWithCredentials } from "@/lib/actions/auth.action";

const SignIn = () => {
  return (
    <AuthForm
      schema={SignInSchema}
      formType="SIGN_IN"
      defaultValues={{ email: "", password: "" }}
      onSubmit={signInWithCredentials}
    />
  );
};
export default SignIn;
