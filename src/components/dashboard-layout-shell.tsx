"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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

function UserAvatar() {
  return (
    <div className="relative h-9 w-9 overflow-hidden rounded-full bg-[linear-gradient(135deg,#c7d1df_0%,#9fb0c6_42%,#7186a3_100%)] ring-1 ring-white/70">
      <div className="absolute left-[10px] top-[6px] h-[8px] w-[8px] rounded-full bg-[#f4d2b0]" />
      <div className="absolute left-[7px] top-[11px] h-[11px] w-[14px] rounded-t-full bg-[#274766]" />
      <div className="absolute left-[11px] top-[15px] h-[8px] w-[8px] rounded-full bg-[#f4d2b0]" />
    </div>
  );
}

const navItems: NavItem[] = [
  { label: "Overview", href: "/overview" },
  { label: "Identity", href: "/identity" },
  { label: "Database", href: "/database" },
];

function MenuIcon({ type }: { type: "overview" | "identity" | "database" }) {
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

const relatedBySection: Record<string, RelatedItem[]> = {
  overview: [],
  identity: [],
  database: [],
};

const titleBySection: Record<string, string> = {
  overview: "Dashboard Overview",
  identity: "Identity",
  database: "Database",
};

function getSectionFromPath(pathname: string): string {
  const section = pathname.split("/").filter(Boolean)[0] ?? "overview";
  if (section in relatedBySection) return section;
  return "overview";
}

export default function DashboardLayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const currentSection = getSectionFromPath(pathname);
  const related = relatedBySection[currentSection];

  return (
    <div className="h-screen w-screen bg-[var(--page-bg)]">
      <main className="flex h-full w-full overflow-hidden bg-[var(--surface)]">
        <aside className="hidden w-[148px] shrink-0 flex-col border-r border-[#254071] bg-[var(--sidebar)] pt-2 text-white sm:flex">
          <div className="px-2.5">
            <div className="mb-6 ml-auto mr-auto grid h-12 w-12 place-items-center rounded-full bg-white ring-2 ring-[#2f4f96]">
              <span className="text-[10px] font-bold text-[#203e8d]">LOGO</span>
            </div>

            <p className="mb-2 text-[7px] uppercase tracking-[0.12em] text-white/65">MAIN MENU</p>
            <nav className="space-y-1 text-[9px] leading-tight">
              {navItems.map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                const iconType = item.label === "Overview" ? "overview" : item.label === "Identity" ? "identity" : "database";
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
            <button className="flex items-center gap-1.5 text-[10px] font-medium leading-none text-[#ff5b79] transition hover:text-[#ff8198]">
              <LogoutIcon />
              <span>Logout</span>
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

              <button
                type="button"
                className="flex shrink-0 items-center gap-2 rounded-full px-1.5 py-1 text-left text-[#1a2438] transition hover:bg-white/60"
                aria-label="User menu"
              >
                <div className="hidden text-right leading-tight sm:block">
                  <div className="text-[14px] font-medium text-[#28344b]">Dr. Jon Kabir</div>
                  <div className="text-[10px] text-[#707b8f]">Admin</div>
                </div>
                <UserAvatar />
                <ChevronDownIcon />
              </button>
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
