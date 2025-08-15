'use client';

import AuthForm from "@/components/AuthForm";
import { signUp } from "@/lib/actions/auth";
import { signUpSchema } from "@/lib/validation";
import React from "react";

function Page() {
  return (
    <AuthForm
      schema={signUpSchema}
      defaultValues={{
        fullName: "",
        email: "",
        universityId: 0,
        universityCard: "",
        password: ""
      }}
      onSubmit={signUp}
      type="SIGN_UP"
    />
  );
}

export default Page;