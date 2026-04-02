import DashboardLayoutShell from "@/components/dashboard-layout-shell";

export default function DashboardGroupLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayoutShell>{children}</DashboardLayoutShell>;
}
