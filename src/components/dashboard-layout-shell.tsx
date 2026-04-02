"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { UserAvatar, useUserProfile } from "@/components/user-profile-provider";

type NavItem = {
  label: string;
  href: string;
};

type RelatedItem = {
  label: string;
  href: string;
};

function BellIcon() {
  return (
    <svg className="h-4 w-4 text-[#69758d]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.4-1.4a2 2 0 0 1-.6-1.4V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 19a2 2 0 0 0 4 0" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg className="h-3.5 w-3.5 text-[#7c8598]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="m5 7 5 5 5-5" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg className="h-4 w-4 text-[#7b8090]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="m7 5 5 5-5 5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="h-4 w-4 text-[#8d93a5]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 5l10 10M15 5 5 15" />
    </svg>
  );
}

const navItems: NavItem[] = [
  { label: "Overview", href: "/overview" },
  { label: "Identity", href: "/identity" },
  { label: "Database", href: "/database" },
  { label: "Settings", href: "/settings" },
];

function MenuIcon({ type }: { type: "overview" | "identity" | "database" | "settings" }) {
  if (type === "overview") {
    return (
      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <rect x="4" y="4" width="6" height="6" rx="1" />
        <rect x="14" y="4" width="6" height="6" rx="1" />
        <rect x="4" y="14" width="6" height="6" rx="1" />
        <rect x="14" y="14" width="6" height="6" rx="1" />
      </svg>
    );
  }

  if (type === "identity") {
    return (
      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V5m0 0l-4 4m4-4l4 4M4 15.5V18a2 2 0 002 2h12a2 2 0 002-2v-2.5" />
      </svg>
    );
  }

  if (type === "settings") {
    return (
      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <circle cx="12" cy="12" r="3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a1 1 0 0 1 0 1.4l-1 1a1 1 0 0 1-1.4 0l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V20a1 1 0 0 1-1 1h-1.4a1 1 0 0 1-1-1v-.2a1 1 0 0 0-.6-.9 1 1 0 0 0-1.1.2l-.1.1a1 1 0 0 1-1.4 0l-1-1a1 1 0 0 1 0-1.4l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H4a1 1 0 0 1-1-1v-1.4a1 1 0 0 1 1-1h.2a1 1 0 0 0 .9-.6 1 1 0 0 0-.2-1.1l-.1-.1a1 1 0 0 1 0-1.4l1-1a1 1 0 0 1 1.4 0l.1.1a1 1 0 0 0 1.1.2 1 1 0 0 0 .6-.9V4a1 1 0 0 1 1-1h1.4a1 1 0 0 1 1 1v.2a1 1 0 0 0 .6.9 1 1 0 0 0 1.1-.2l.1-.1a1 1 0 0 1 1.4 0l1 1a1 1 0 0 1 0 1.4l-.1.1a1 1 0 0 0-.2 1.1 1 1 0 0 0 .9.6H20a1 1 0 0 1 1 1v1.4a1 1 0 0 1-1 1h-.2a1 1 0 0 0-.9.6Z" />
      </svg>
    );
  }

  return (
    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
      <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg className="h-3.5 w-3.5 text-[#ff5b79]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16l4-4-4-4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 12H8" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5v10h3" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg className="h-3.5 w-3.5 animate-spin text-[#ff5b79]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" />
    </svg>
  );
}

const AUTH_KEY = "dashboard-is-authenticated";

const relatedBySection: Record<string, RelatedItem[]> = {
  overview: [],
  identity: [],
  database: [],
  settings: [],
};

const titleBySection: Record<string, string> = {
  overview: "Dashboard Overview",
  identity: "Identity",
  database: "Database",
  settings: "Settings",
};

function getSectionFromPath(pathname: string): string {
  const section = pathname.split("/").filter(Boolean)[0] ?? "overview";
  if (section in relatedBySection) return section;
  return "overview";
}

export default function DashboardLayoutShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const currentSection = getSectionFromPath(pathname);
  const related = relatedBySection[currentSection];
  const { profile } = useUserProfile();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.localStorage.getItem(AUTH_KEY) !== "true") {
      router.replace("/login");
    }
  }, [router]);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    setIsUserMenuOpen(false);
  }, [pathname]);

  function handleLogout() {
    setIsLoggingOut(true);
    setTimeout(() => {
      window.localStorage.removeItem(AUTH_KEY);
      router.replace("/login");
    }, 1500);
  }

  return (
    <div className="h-screen w-screen bg-[var(--page-bg)]">
      <main className="flex h-full w-full overflow-hidden bg-[var(--surface)]">
        <aside className="hidden w-[148px] shrink-0 flex-col border-r border-[#254071] bg-[var(--sidebar)] pt-2 text-white sm:flex">
          <div className="px-2.5">
            <div className="mb-6 ml-auto mr-auto grid h-14 w-14 place-items-center overflow-hidden rounded-full bg-white ring-2 ring-[#2f4f96]">
              <Image src="/logo.png.png" alt="Logo" width={56} height={56} className="h-full w-full object-cover" priority={false} />
            </div>

            <p className="mb-2 text-[7px] uppercase tracking-[0.12em] text-white/65">MAIN MENU</p>
            <nav className="space-y-1 text-[9px] leading-tight">
              {navItems.map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                const iconType =
                  item.label === "Overview"
                    ? "overview"
                    : item.label === "Identity"
                      ? "identity"
                      : item.label === "Database"
                        ? "database"
                        : "settings";
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 rounded-[3px] px-2 py-1.5 transition ${
                      active ? "bg-[#2a428d] text-white" : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span className="text-white/90"><MenuIcon type={iconType} /></span>
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="mt-auto flex h-[34px] items-center justify-center border-t border-[#385582] bg-[#0a234f] px-2.5">
            <button onClick={handleLogout} disabled={isLoggingOut} className="flex items-center gap-1.5 text-[10px] font-medium leading-none text-[#ff5b79] transition hover:text-[#ff8198] disabled:opacity-60 disabled:cursor-not-allowed">
              {isLoggingOut ? <SpinnerIcon /> : <LogoutIcon />}
              <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
            </button>
          </div>
        </aside>

        <section className="flex flex-1 flex-col bg-[var(--surface)]">
          <header className="border-b border-[#d6dce8] bg-[#eaedf2]">
            <div className="flex items-center justify-end gap-3 px-3 pb-1 pt-2 sm:px-5">
              <button
                type="button"
                aria-label="Notifications"
                className="relative grid h-8 w-8 shrink-0 place-items-center rounded-full bg-transparent text-[#6f7b91] transition hover:bg-white/65"
              >
                <BellIcon />
                <span className="absolute right-[6px] top-[6px] h-2 w-2 rounded-full border-2 border-[#eaedf2] bg-[#34c759]" />
              </button>

              <div className="relative" ref={userMenuRef}>
                <button
                  type="button"
                  className="flex shrink-0 items-center gap-2 rounded-full px-1.5 py-1 text-left text-[#1a2438] transition hover:bg-white/60"
                  aria-label="User menu"
                  onClick={() => setIsUserMenuOpen((prev) => !prev)}
                >
                  <div className="hidden text-right leading-tight sm:block">
                    <div className="text-[14px] font-medium text-[#28344b]">{profile.fullName}</div>
                    <div className="text-[10px] text-[#707b8f]">Admin</div>
                  </div>
                  <UserAvatar className="h-9 w-9" />
                  <ChevronDownIcon />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 top-[calc(100%-39px)] z-40 w-[230px] rounded-md border border-[rgba(199,207,224,0.82)] bg-[rgba(236,239,246,0.42)] p-2.5 shadow-[0_14px_34px_rgba(18,24,42,0.22)] backdrop-blur-sm">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="scale-[0.88]">
                          <UserAvatar className="h-9 w-9" />
                        </div>
                        <div className="leading-tight">
                          <p className="text-[11px] font-medium text-[#263049]">{profile.fullName}</p>
                          <span className="mt-1 inline-flex rounded-full bg-[#dbe3ef] px-2 py-[2px] text-[8px] font-medium text-[#5b667d]">Admin</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="rounded p-0.5 transition hover:bg-white/70"
                        aria-label="Close user menu"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <CloseIcon />
                      </button>
                    </div>

                    <div className="my-2.5 h-px bg-[#bcc3d2]" />

                    <Link href="/settings" className="flex w-full items-center justify-between py-1.5 text-left text-[12px] text-[#2f3342] transition hover:text-[#171c2d]">
                      <span>Profile</span>
                      <ChevronRightIcon />
                    </Link>
                    <Link href="/settings" className="flex w-full items-center justify-between py-1.5 text-left text-[12px] text-[#2f3342] transition hover:text-[#171c2d]">
                      <span>Settings</span>
                      <ChevronRightIcon />
                    </Link>

                    <button
                      type="button"
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="mt-1.5 h-[30px] w-full rounded-[3px] bg-[#4237b0] text-[12px] font-medium text-white transition hover:bg-[#4f44c0] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isLoggingOut && <SpinnerIcon />}
                      {isLoggingOut ? "Logging out..." : "Log out"}
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="px-3 pb-3 pt-1.5 sm:px-5 sm:pb-4">
              <h1 className="text-[18px] font-semibold leading-tight text-[#11172b] sm:text-[19px]">
                {titleBySection[currentSection]}
              </h1>
              <p className="mt-1 text-[10px] text-[#8c93a6]">
                {currentSection === "overview"
                  ? "Welcome back, here is your fleet overview."
                  : currentSection === "identity"
                    ? "Upload aircraft images for AI-powered analysis and registration detection."
                    : currentSection === "settings"
                      ? "Manage your account and application preferences."
                      : "Verified aircraft records from FAA database lookups."}
              </p>
            </div>
          </header>

          <div className="border-b border-[#d8deea] px-4 py-2 sm:px-6">
            <div className="flex flex-wrap gap-2">
              {related.length > 0 &&
                related.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`rounded-md border px-3 py-1 text-[11px] ${
                        active
                          ? "border-[#3e3bb8] bg-[#e9e9ff] text-[#2b2aa8]"
                          : "border-[#dde2ed] bg-[#eef1f8] text-[#4f5873]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-3 sm:px-5 sm:py-4">{children}</div>
        </section>
      </main>
    </div>
  );
}
