"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

const AUTH_KEY = "dashboard-is-authenticated";

type AuthShellProps = {
  title: string;
  subtitle: string;
  footerText?: ReactNode;
  footerHref?: string;
  footerLinkLabel?: string;
  children: ReactNode;
};

function EyeIcon() {
  return (
    <svg className="h-4 w-4 text-white/75" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 12s3.5-6.5 9.5-6.5S21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function AuthShell({ title, subtitle, footerText, footerHref, footerLinkLabel, children }: AuthShellProps) {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
    if (window.localStorage.getItem(AUTH_KEY) === "true") {
      router.replace("/overview");
    }
  }, [router]);

  if (!isReady) {
    return null;
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0c1b3d] text-white">
      <Image src="/login.png" alt="Airplane background" fill priority className="object-cover" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),rgba(8,16,35,0.52)_72%)]" />

      <div className="relative flex min-h-screen items-center justify-center px-4 py-10">
        <section className="w-full max-w-[330px] rounded-[6px] border border-white/45 bg-white/20 px-5 py-4 shadow-[0_14px_38px_rgba(3,8,22,0.24)] backdrop-blur-md sm:px-6 sm:py-5">
          <div className="mx-auto flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-white/45 bg-white/85 shadow-[0_4px_12px_rgba(0,0,0,0.14)]">
            <Image src="/logo.png.png" alt="Logo" width={56} height={56} className="h-full w-full object-cover" />
          </div>

          <div className="mt-5 text-center">
            <h1 className="text-[18px] font-semibold tracking-[0.01em] text-white sm:text-[20px]">{title}</h1>
            <p className="mt-2 text-[10px] leading-tight text-white/80 sm:text-[11px]">{subtitle}</p>
          </div>

          <div className="mt-5">{children}</div>

          {(footerText || footerHref || footerLinkLabel) && (
            <p className="mt-4 text-center text-[10px] text-white/78">
              {footerText} {footerHref && footerLinkLabel ? <Link href={footerHref} className="text-[#6f66ff] transition hover:text-[#8b84ff]">{footerLinkLabel}</Link> : null}
            </p>
          )}
        </section>
      </div>
    </main>
  );
}

export function AuthPasswordField({
  label,
  defaultValue,
  placeholder,
  visible,
  onToggle,
}: {
  label: string;
  defaultValue: string;
  placeholder: string;
  visible: boolean;
  onToggle: () => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] text-white/90">{label}</span>
      <div className="flex h-9 items-center gap-2 rounded-[3px] border border-white/40 bg-white/12 px-2.5">
        <svg className="h-4 w-4 text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <rect x="5" y="10" width="14" height="10" rx="2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 10V7a4 4 0 0 1 8 0v3" />
        </svg>
        <input
          type={visible ? "text" : "password"}
          defaultValue={defaultValue}
          className="h-full w-full bg-transparent text-[10px] text-white outline-none placeholder:text-white/45"
          placeholder={placeholder}
        />
        <button type="button" onClick={onToggle} aria-label="Toggle password visibility" className="shrink-0">
          <EyeIcon />
        </button>
      </div>
    </label>
  );
}
