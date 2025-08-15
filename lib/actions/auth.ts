"use server";

import { signIn } from "@/auth";
import { db } from "@/database/db";
import { users } from "@/database/schema";
import ratelimit from "@/ratelimit";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { workflowClient } from "../workflow";
import config from "../config";

export const signInWithCredentials = async (params: Pick<AuthCredentials, "email" | "password">) => {
  const { email, password } = params;

 const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const {success} = await ratelimit.limit(ip);

  if(!success){
    return redirect("/too-many-requests");
  }

  const result = await signIn(
    "credentials",
    {email, password, redirect: false }
  );

  if(result?.error){
    return {
      success: false,
      error: result.error,
    }
  }

  return {
    success: true,
  };
}


export const signUp = async (params: AuthCredentials) => {
  const { fullName, email, password, universityId, universityCard } = params;
  
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const {success} = await ratelimit.limit(ip);

  if(!success){
    return redirect("/too-many-requests");
  }

  const existingUser = await db
  .select()
  .from(users)
  .where(eq(users.email, email))
  .limit(1);

  if (existingUser.length > 0) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hash(password, 10);
 
  try {
   await db
    .insert(users)
    .values({
      fullName,
      email,
      password: hashedPassword,
      universityId,
      universityCard,
    });

    await workflowClient.trigger({
      url: `${config.env.prodApiEndpoint}/api/workflows/onboarding`,
      body: {
        email,
        fullName,
      }
    });

    await signInWithCredentials({email,password});

    return {
      success: true,
    }

  }catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Failed to create user",
    };
  }
}