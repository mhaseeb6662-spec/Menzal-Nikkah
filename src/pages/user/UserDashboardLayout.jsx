import { Outlet } from "react-router-dom";
import { LayoutDashboard, UserCog, Images, CreditCard, KeyRound } from "lucide-react";
import DashboardShell from "../../layouts/DashboardShell";

const links = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/dashboard/edit-profile", label: "Edit Profile", icon: UserCog },
  { to: "/dashboard/photos", label: "Manage Photos", icon: Images },
  { to: "/dashboard/payment-status", label: "Payment Status", icon: CreditCard },
  { to: "/dashboard/security", label: "Change Password", icon: KeyRound },
];

export default function UserDashboardLayout() {
  return (
    <DashboardShell title="My Dashboard" badge="Nikah Manzil" links={links}>
      <Outlet />
    </DashboardShell>
  );
}
