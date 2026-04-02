"use client";

import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthPasswordField, AuthShell } from "@/components/auth/auth-shell";

const AUTH_KEY = "dashboard-is-authenticated";

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

export default function LoginPage() {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem(AUTH_KEY) === "true") {
      router.replace("/overview");
    }
  }, [router]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      window.localStorage.setItem(AUTH_KEY, "true");
      router.push("/overview");
    }, 1500);
  }

  return (
    <AuthShell
      title="Login to Account"
      subtitle="Please enter your email and password to continue"
      footerText={<>Don&apos;t have any account?</>}
      footerHref="/signup"
      footerLinkLabel="Create an Account"
    >
      <form className="space-y-3" onSubmit={handleSubmit}>
        <label className="block">
          <span className="mb-1.5 block text-[10px] text-white/90">Email address</span>
          <div className="flex h-9 items-center gap-2 rounded-[3px] border border-white/40 bg-white/12 px-2.5">
            <MailIcon />
            <input
              type="email"
              defaultValue="esteban.schiller@gmail.com"
              className="h-full w-full bg-transparent text-[10px] text-white outline-none placeholder:text-white/45"
              placeholder="Enter your email"
            />
          </div>
        </label>

        <AuthPasswordField
          label="Password"
          defaultValue="password"
          placeholder="Enter your password"
          visible={isPasswordVisible}
          onToggle={() => setIsPasswordVisible((prev) => !prev)}
        />

        <div className="flex items-center justify-between gap-3 text-[10px] text-white/75">
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="h-3.5 w-3.5 accent-[#4e44c7]" />
            <span>Remember Password</span>
          </label>
          <button type="button" onClick={() => router.push("/forgot-password")} className="text-[#6f66ff] transition hover:text-[#8b84ff]">Forget Password?</button>
        </div>

        <button type="submit" disabled={isLoading} className="mt-2 h-9 w-full rounded-[3px] bg-[#4a3fb8] text-[11px] font-medium text-white transition hover:bg-[#5649c7] disabled:opacity-80 disabled:cursor-not-allowed flex items-center justify-center gap-2">
          {isLoading && <SpinnerIcon />}
          {isLoading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </AuthShell>
  );
}
