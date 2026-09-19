import { z } from "zod";

export const interactionActionSchema = z.enum([
  "LOGIN",
  "REGISTER",
  "PASSWORD_RESET",
]);

export const participantInteractionSchema = z
  .object({
    name: z.string().trim().min(2).max(80).optional(),
    email: z.string().trim().email().max(120),
    action: interactionActionSchema,
    passwordEntered: z.boolean(),
    passwordLength: z.number().int().min(0).max(256).optional(),
    sessionId: z.string().min(8).max(80),
  })
  .strict();

export const loginFormSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

export const registerFormSchema = z
  .object({
    name: z.string().trim().min(2, "Enter your full name"),
    email: z.string().trim().email("Enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm your password"),
    agreeToTerms: z.boolean().refine((value) => value === true, {
      message: "Please accept the terms to continue",
    }),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;
export type RegisterFormValues = z.infer<typeof registerFormSchema>;
export const eventRegistrationSchema = z
  .object({
    eventName: z.string().trim().min(2).max(120).optional(),
    fullName: z.string().trim().min(2, "Enter your full name").max(80),
    email: z.string().trim().email("Enter a valid email address").max(120),
    phone: z.string().trim().min(8, "Enter a valid phone number").max(20),
    organization: z.string().trim().min(2, "Enter your college or company").max(120),
    role: z.string().trim().min(2, "Select your role"),
    experience: z.string().trim().max(80).optional(),
    projectIdea: z.string().trim().max(500).optional(),
    skills: z.string().trim().max(240).optional(),
    heardFrom: z.string().trim().max(120).optional(),
    dietaryNeeds: z.string().trim().max(120).optional(),
    tshirtSize: z.string().trim().max(10).optional(),
    agreeToAttend: z.boolean().refine((value) => value === true, {
      message: "Please confirm you will attend",
    }),
  })
  .strict();

export const adminLoginSchema = z.object({
  username: z.string().trim().min(1, "Enter a username"),
  password: z.string().min(1, "Enter a password"),
});

export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;
export type ParticipantInteractionInput = z.infer<
  typeof participantInteractionSchema
>;
export type EventRegistrationValues = z.infer<typeof eventRegistrationSchema>;
export type AdminLoginValues = z.infer<typeof adminLoginSchema>;
