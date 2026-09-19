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
import { loginFormSchema, type LoginFormValues } from "@/lib/validations";

export function LoginForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit(values: LoginFormValues) {
    setSubmitting(true);
    try {
      const passwordLength = values.password.length;
      values.password = "";

      await recordInteraction({
        email: values.email,
        action: "LOGIN",
        passwordEntered: passwordLength > 0,
        passwordLength,
      });

      toast.success("Signed in to the demo session");
      router.push("/security-demo");
    } catch {
      toast.error("Unable to continue the demo right now");
    } finally {
      setSubmitting(false);
    }
  }

  async function continueWithDemo() {
    setSubmitting(true);
    try {
      await recordInteraction({
        name: "Demo Account",
        email: "demo@example.com",
        action: "LOGIN",
        passwordEntered: true,
        passwordLength: 12,
      });
      toast.success("Continuing with a demo account");
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
        <CardTitle>Sign in to Build2Learn</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Field id="email" label="Email" error={errors.email?.message}>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              {...register("email")}
            />
          </Field>
          <Field id="password" label="Password" error={errors.password?.message}>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              {...register("password")}
            />
          </Field>
          <div className="flex items-center justify-between gap-3">
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <Checkbox {...register("rememberMe")} />
              Remember me
            </label>
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-orange-600 hover:text-orange-700"
            >
              Forgot password?
            </Link>
          </div>
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Signing in..." : "Sign In"}
          </Button>
        </form>
        <div className="my-5 flex items-center gap-3 text-xs tracking-[0.2em] text-slate-400 uppercase">
          <span className="h-px flex-1 bg-slate-200" />
          OR
          <span className="h-px flex-1 bg-slate-200" />
        </div>
        <Button
          variant="dark"
          className="w-full"
          disabled={submitting}
          onClick={continueWithDemo}
        >
          Continue with Demo Account
        </Button>
        <p className="mt-5 text-center text-sm text-slate-600">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-semibold text-orange-600">
            Create account
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
