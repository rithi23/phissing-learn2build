"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  eventRegistrationSchema,
  type EventRegistrationValues,
} from "@/lib/validations";

const selectClass =
  "h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-950 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400";

export function EventRegisterForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventRegistrationValues>({
    resolver: zodResolver(eventRegistrationSchema),
    defaultValues: {
      eventName: "Build2Learn #38 Meetup",
      fullName: "",
      email: "",
      phone: "",
      organization: "",
      role: "",
      experience: "",
      projectIdea: "",
      skills: "",
      heardFrom: "",
      dietaryNeeds: "",
      tshirtSize: "",
      agreeToAttend: false,
    },
  });

  async function onSubmit(values: EventRegistrationValues) {
    setSubmitting(true);
    try {
      const response = await fetch("/api/event-registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventName: values.eventName,
          fullName: values.fullName,
          email: values.email,
          phone: values.phone,
          organization: values.organization,
          role: values.role,
          experience: values.experience,
          projectIdea: values.projectIdea,
          skills: values.skills,
          heardFrom: values.heardFrom,
          dietaryNeeds: values.dietaryNeeds,
          tshirtSize: values.tshirtSize,
          agreeToAttend: values.agreeToAttend,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to save registration");
      }

      toast.success("You're registered for Build2Learn #38");
      setSubmitted(true);
    } catch {
      toast.error("Unable to save your registration right now");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-950">
          Registration confirmed
        </h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Your details were saved for Build2Learn #38. Join the WhatsApp group
          above so you get venue and schedule updates.
        </p>
      </div>
    );
  }

  return (
    <form
      className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div>
        <h2 className="text-2xl font-semibold text-slate-950">
          Register for the meetup
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Tell us a bit about you so we can set up tables and pairing.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field id="fullName" label="Full name" error={errors.fullName?.message}>
          <Input id="fullName" autoComplete="name" {...register("fullName")} />
        </Field>
        <Field id="email" label="Email" error={errors.email?.message}>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            {...register("email")}
          />
        </Field>
        <Field id="phone" label="Phone" error={errors.phone?.message}>
          <Input id="phone" type="tel" autoComplete="tel" {...register("phone")} />
        </Field>
        <Field
          id="organization"
          label="College / Company"
          error={errors.organization?.message}
        >
          <Input id="organization" {...register("organization")} />
        </Field>
        <Field id="role" label="Role" error={errors.role?.message}>
          <select id="role" className={selectClass} {...register("role")}>
            <option value="">Select your role</option>
            <option value="Student">Student</option>
            <option value="Working professional">Working professional</option>
            <option value="Mentor">Mentor</option>
            <option value="Other">Other</option>
          </select>
        </Field>
        <Field id="experience" label="Experience" error={errors.experience?.message}>
          <select
            id="experience"
            className={selectClass}
            {...register("experience")}
          >
            <option value="">Select experience</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </Field>
        <Field id="heardFrom" label="How did you hear about us?">
          <select id="heardFrom" className={selectClass} {...register("heardFrom")}>
            <option value="">Select an option</option>
            <option value="Community">Community</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Friend">Friend</option>
            <option value="College">College</option>
          </select>
        </Field>
        <Field id="tshirtSize" label="T-shirt size">
          <select
            id="tshirtSize"
            className={selectClass}
            {...register("tshirtSize")}
          >
            <option value="">Select size</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </Field>
      </div>

      <Field id="skills" label="Skills">
        <Input
          id="skills"
          placeholder="React, Python, Figma..."
          {...register("skills")}
        />
      </Field>
      <Field id="projectIdea" label="What do you want to build?">
        <Textarea
          id="projectIdea"
          placeholder="Share an idea or write join a team"
          {...register("projectIdea")}
        />
      </Field>
      <Field id="dietaryNeeds" label="Dietary needs">
        <Input
          id="dietaryNeeds"
          placeholder="None, vegetarian, vegan..."
          {...register("dietaryNeeds")}
        />
      </Field>

      <label className="flex items-start gap-2 text-sm text-slate-600">
        <Checkbox className="mt-0.5" {...register("agreeToAttend")} />
        I will attend Build2Learn #38 on September 19, 2026
      </label>
      {errors.agreeToAttend ? (
        <p role="alert" className="text-sm text-red-600">
          {errors.agreeToAttend.message}
        </p>
      ) : null}

      <Button type="submit" className="w-full sm:w-auto" disabled={submitting}>
        {submitting ? "Saving..." : "Complete registration"}
      </Button>
    </form>
  );
}
