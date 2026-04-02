"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthPasswordField, AuthShell } from "@/components/auth/auth-shell";

function SpinnerIcon() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" />
    </svg>
  );
}

export default function ResetPage() {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      router.push("/forgot-password/success");
    }, 1500);
  }

  return (
    <AuthShell
      title="Set a new password"
      subtitle="Create a new password. Ensure it differs from previous ones for security"
    >
      <form className="space-y-3" onSubmit={handleSubmit}>
        <AuthPasswordField
          label="New Password"
          defaultValue=""
          placeholder="Enter new password"
          visible={isPasswordVisible}
          onToggle={() => setIsPasswordVisible((prev) => !prev)}
        />

        <AuthPasswordField
          label="Confirm Password"
          defaultValue=""
          placeholder="Confirm your password"
          visible={isConfirmVisible}
          onToggle={() => setIsConfirmVisible((prev) => !prev)}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="mt-4 h-9 w-full rounded-[3px] bg-[#4a3fb8] text-[11px] font-medium text-white transition hover:bg-[#5649c7] disabled:opacity-80 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading && <SpinnerIcon />}
          {isLoading ? "Updating..." : "Confirm"}
        </button>
      </form>
    </AuthShell>
  );
}
