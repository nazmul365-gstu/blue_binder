"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { AuthShell } from "@/components/auth/auth-shell";

function SpinnerIcon() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" />
    </svg>
  );
}

export default function VerifyPage() {
  const router = useRouter();
  const [codes, setCodes] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  function handleChange(index: number, value: string) {
    if (!/^\d*$/.test(value)) return;
    const newCodes = [...codes];
    newCodes[index] = value.slice(-1);
    setCodes(newCodes);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !codes[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (codes.join("").length === 6) {
      setIsLoading(true);
      setTimeout(() => {
        router.push("/forgot-password/reset");
      }, 1500);
    }
  }

  const isFilled = codes.join("").length === 6;

  return (
    <AuthShell
      title="Check your email"
      subtitle="We sent a code to your email address. Please check your email for the 6 digit code."
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="flex gap-2 justify-center">
          {codes.map((code, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={code}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="h-10 w-10 rounded-[3px] border border-white/40 bg-white/12 text-center text-[14px] font-medium text-white outline-none focus:border-white/60 focus:bg-white/20 transition"
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={!isFilled || isLoading}
          className="h-9 w-full rounded-[3px] bg-[#4a3fb8] text-[11px] font-medium text-white transition hover:bg-[#5649c7] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading && <SpinnerIcon />}
          {isLoading ? "Verifying..." : "Verify"}
        </button>

        <div className="text-center text-[10px] text-white/60">
          You have not received the email?{" "}
          <button type="button" className="text-[#6f66ff] transition hover:text-[#8b84ff]">
            Resend
          </button>
        </div>
      </form>
    </AuthShell>
  );
}
