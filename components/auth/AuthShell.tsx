import type { ReactNode } from "react";

export function AuthShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="grid min-h-[calc(100vh-8rem)] bg-slate-50 lg:grid-cols-2">
      <div className="hidden bg-slate-950 px-12 py-16 lg:flex lg:flex-col lg:justify-center">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange-400">
          Build2Learn
        </p>
        <h1 className="mt-6 max-w-md text-4xl font-semibold text-white">
          {title}
        </h1>
        <p className="mt-4 max-w-md text-lg leading-8 text-slate-300">
          {description}
        </p>
      </div>
      <div className="flex items-center justify-center px-4 py-12 sm:px-8">
        {children}
      </div>
    </div>
  );
}
