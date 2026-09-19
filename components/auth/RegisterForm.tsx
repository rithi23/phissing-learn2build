"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { recordInteraction } from "@/lib/record-interaction";
import {
  registerFormSchema,
  type RegisterFormValues,
} from "@/lib/validations";

export function RegisterForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
  });

  async function onSubmit(values: RegisterFormValues) {
    setSubmitting(true);
    try {
      const passwordLength = values.password.length;
      values.password = "";
      values.confirmPassword = "";

      await recordInteraction({
        name: values.name,
        email: values.email,
        action: "REGISTER",
        passwordEntered: passwordLength > 0,
        passwordLength,
      });

      toast.success("Account created for this demo session");
      router.push("/security-demo");
    } catch {
      toast.error("Unable to continue the demo right now");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Field id="name" label="Full name" error={errors.name?.message}>
            <Input id="name" autoComplete="name" {...register("name")} />
          </Field>
          <Field id="email" label="Email" error={errors.email?.message}>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              {...register("email")}
            />
          </Field>
          <Field id="password" label="Password" error={errors.password?.message}>
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              {...register("password")}
            />
          </Field>
          <Field
            id="confirmPassword"
            label="Confirm password"
            error={errors.confirmPassword?.message}
          >
            <Input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              {...register("confirmPassword")}
            />
          </Field>
          <label className="flex items-start gap-2 text-sm text-slate-600">
            <Checkbox className="mt-0.5" {...register("agreeToTerms")} />
            I agree to the terms
          </label>
          {errors.agreeToTerms ? (
            <p role="alert" className="text-sm text-red-600">
              {errors.agreeToTerms.message}
            </p>
          ) : null}
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Creating account..." : "Create Account"}
          </Button>
        </form>
        <p className="mt-5 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-orange-600">
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
