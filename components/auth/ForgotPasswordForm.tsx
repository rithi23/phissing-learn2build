"use client";

import { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { recordInteraction } from "@/lib/record-interaction";
import {
  forgotPasswordSchema,
  type ForgotPasswordValues,
} from "@/lib/validations";

export function ForgotPasswordForm() {
  const [completed, setCompleted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(values: ForgotPasswordValues) {
    setSubmitting(true);
    try {
      await recordInteraction({
        email: values.email,
        action: "PASSWORD_RESET",
        passwordEntered: false,
      });
      toast.success("Reset simulation completed");
      setCompleted(true);
    } catch {
      toast.error("Unable to continue the demo right now");
    } finally {
      setSubmitting(false);
    }
  }

  if (completed) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Password reset simulation completed.</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-6 text-slate-600">
            No email was actually sent.
          </p>
          <Link href="/security-demo">
            <Button className="w-full">Continue to Security Analysis</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Forgot your password?</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-5 text-sm leading-6 text-slate-600">
          Enter your email and we&apos;ll send you a password reset link.
        </p>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Field id="email" label="Email" error={errors.email?.message}>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              {...register("email")}
            />
          </Field>
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
