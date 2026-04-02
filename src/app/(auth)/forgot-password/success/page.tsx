"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthShell } from "@/components/auth/auth-shell";

const AUTH_KEY = "dashboard-is-authenticated";

function SpinnerIcon() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" />
    </svg>
  );
}

export default function PasswordResetSuccessPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  function handleSignIn() {
    setIsLoading(true);
    setTimeout(() => {
      window.localStorage.setItem(AUTH_KEY, "true");
      router.push("/overview");
    }, 1500);
  }

  return (
    <AuthShell
      title="Password Updated Successfully!"
      subtitle="Your new password has been saved. You can now continue securely."
    >
      <button
        type="button"
        onClick={handleSignIn}
        disabled={isLoading}
        className="h-9 w-full rounded-[3px] bg-[#4a3fb8] text-[11px] font-medium text-white transition hover:bg-[#5649c7] disabled:opacity-80 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading && <SpinnerIcon />}
        {isLoading ? "Redirecting..." : "Sign in"}
      </button>
    </AuthShell>
  );
}
