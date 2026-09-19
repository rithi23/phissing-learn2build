import { AuthShell } from "@/components/auth/AuthShell";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Reset access"
      description="This flow is simulated. No email is sent and no password is stored."
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
