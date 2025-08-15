'use client';

import AuthForm from "@/components/AuthForm";
import { signInWithCredentials } from "@/lib/actions/auth";
import { signInSchema } from "@/lib/validation";
import React from "react";

function Page() {
  return (
    <AuthForm
      schema={signInSchema}
      defaultValues={{
        email: "",
        password: ""
      }}
      onSubmit={signInWithCredentials}

      type="SIGN_IN"
    />
  );
}

export default Page;