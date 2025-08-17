"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { ZodType } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import Link from "next/link";
import { FIELD_NAMES, FIELD_TYPES } from "@/constants";
import FileUpload from "./FileUpload";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface AuthFormProps<T extends FieldValues> {
  schema: ZodType<T, any, any>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  type: "SIGN_IN" | "SIGN_UP";
}



function AuthForm<T extends FieldValues>({ type, schema, defaultValues, onSubmit }: AuthFormProps<T>) {

  const router = useRouter();

  const isSignIn = type === "SIGN_IN";

  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = await onSubmit(data);
    if (result.success) {
      toast.success("Success", {
        description: isSignIn ? "You have successfully signed in." : "Your account has been created successfully.",
      })

      router.push("/");
    } else {
      toast.error("Error", {
        description: result.error || "An unexpected error occurred.",
      })
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-white">
        {isSignIn ? "Welcome back to BookWise" : "Create your BookWise account"}
      </h1>
      <p className="text-light-100">
        {isSignIn ? "Access the vast collection of resources, and stay updated."
          : "Please complete all fields and upload a valid university ID to gain access to the library."
        }
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full space-y-6"
        >
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as keyof T as any}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    {
                      field.name === "universityCard" ? (
                        <FileUpload onFileChange={field.onChange} type="image" accept="image/*" placeholder="Upload your university ID" folder="ids" variant="dark" />
                      ) : (
                        <Input
                          required
                          type={FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]}
                          {...field}
                          className="form-input"
                        />
                      )
                    }
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button type="submit" className="form-btn">
            {isSignIn ? "Sign In" : "Sign Up"}
          </Button>
        </form>
      </Form>

      <p className="text-center text-base font-medium">
        {isSignIn ? "Don't have an account?" : "Already have an account?"}
      </p>
      <Link href={isSignIn ? "/sign-up" : "/sign-in"} className="font-bold text-primary">{isSignIn ? "Sign Up" : "Sign In"}</Link>
    </div>
  );
}

export default AuthForm;