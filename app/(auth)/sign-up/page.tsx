"use client";

import AuthForm from "@/components/forms/AuthForm";
import { SignUpSchema } from "@/lib/validations";
import { signUpWithCredentials } from "@/lib/actions/auth.action";

const SignUp = () => {
  return (
    <AuthForm
      schema={SignUpSchema}
      formType="SIGN_UP"
      defaultValues={{ email: "", password: "", username: "", name: "" }}
      onSubmit={signUpWithCredentials}
    />
  );
};
export default SignUp;
