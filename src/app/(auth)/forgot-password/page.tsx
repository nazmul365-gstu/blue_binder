"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthShell } from "@/components/auth/auth-shell";

function MailIcon() {
  return (
    <svg className="h-4 w-4 text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16v12H4z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m4 7 8 6 8-6" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" />
    </svg>
  );
}

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      router.push("/forgot-password/verify");
    }, 1500);
  }

  return (
    <AuthShell
      title="Forget Password?"
      subtitle="Please enter your email to get verification code"
      footerText={<>Back to</>}
      footerHref="/login"
      footerLinkLabel="Sign in"
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <label className="block">
          <span className="mb-1.5 block text-[10px] text-white/90">Email address</span>
          <div className="flex h-9 items-center gap-2 rounded-[3px] border border-white/40 bg-white/12 px-2.5">
            <MailIcon />
            <input
              type="email"
              defaultValue="esteban.schiller@gmail.com"
              required
              className="h-full w-full bg-transparent text-[10px] text-white outline-none placeholder:text-white/45"
              placeholder="Enter your email"
            />
          </div>
        </label>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-4 h-9 w-full rounded-[3px] bg-[#4a3fb8] text-[11px] font-medium text-white transition hover:bg-[#5649c7] disabled:opacity-80 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading && <SpinnerIcon />}
          {isLoading ? "Verifying..." : "Continue"}
        </button>
      </form>
    </AuthShell>
  );
}
