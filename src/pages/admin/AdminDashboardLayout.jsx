import { Outlet } from "react-router-dom";
import { LayoutDashboard, Users, CreditCard, KeyRound, Heart, Settings } from "lucide-react";
import DashboardShell from "../../layouts/DashboardShell";

const links = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/admin/users", label: "User Management", icon: Users },
  { to: "/admin/payments", label: "Payment Management", icon: CreditCard },
  { to: "/admin/access", label: "Access Requests", icon: KeyRound },
  { to: "/admin/success-stories", label: "Success Stories", icon: Heart },
  { to: "/admin/settings", label: "Website Settings", icon: Settings },
];

export default function AdminDashboardLayout() {
  return (
    <DashboardShell title="Admin Panel" badge="Nikah Manzil Admin" links={links}>
      <Outlet />
    </DashboardShell>
  );
}
