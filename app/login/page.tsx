import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back"
      description="Continue learning, building and connecting with the community."
    >
      <LoginForm />
    </AuthShell>
  );
}
