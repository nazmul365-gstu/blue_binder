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

const relatedBySection: Record<string, RelatedItem[]> = {
  overview: [],
  identity: [],
  database: [],
};

const titleBySection: Record<string, string> = {
  overview: "Overview",
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
                      active
                        ? "bg-[#2a428d] text-white"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span className="text-white/90"><MenuIcon type={iconType} /></span>
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="mt-auto border-t border-[#2a4475] px-2 py-3">
            <button className="text-[9px] font-medium text-[#ff5378]">[&gt; Logout]</button>
          </div>
        </aside>

        <section className="flex flex-1 flex-col bg-[var(--surface)]">
          <header className="flex items-center justify-between gap-3 border-b border-[#d8deea] px-3 py-2 sm:px-5">
            <div>
              <h1 className="text-[18px] font-semibold text-[#11172b]">{titleBySection[currentSection]}</h1>
              <p className="text-[10px] text-[#8c93a6]">
                {currentSection === "overview"
                  ? "Welcome back, here is your fleet overview."
                  : currentSection === "identity"
                    ? "Upload aircraft images for AI-powered analysis and registration detection."
                    : "Verified aircraft records from FAA database lookups."}
              </p>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-[#30374b]">
              <span>Dr. Jon Kabir</span>
              <span className="grid h-5 w-5 place-items-center rounded-full bg-[#6a8ba7] text-[10px] text-white">J</span>
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
