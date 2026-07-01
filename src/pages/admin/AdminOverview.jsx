import { Users, UserCheck, Clock, Heart, Wallet } from "lucide-react";
import { dashboardStats, adminUsers, adminPayments } from "../../data/adminData";
import Button from "../../components/Button";

const statCards = [
  { icon: Users, label: "Total Registered", value: dashboardStats.totalUsers.toLocaleString(), tone: "maroon" },
  { icon: UserCheck, label: "Active Profiles", value: dashboardStats.activeProfiles.toLocaleString(), tone: "green" },
  { icon: Clock, label: "Pending Payments", value: dashboardStats.pendingPayments, tone: "gold" },
  { icon: Heart, label: "Success Stories", value: dashboardStats.successStories, tone: "rose" },
  { icon: Wallet, label: "Revenue This Month", value: `PKR ${dashboardStats.revenueThisMonth.toLocaleString()}`, tone: "maroon" },
];

const toneCls = {
  maroon: "bg-maroon-500/10 text-maroon-500",
  green: "bg-green-500/10 text-green-600",
  gold: "bg-gold-500/10 text-gold-600",
  rose: "bg-rose-500/10 text-rose-600",
};

export default function AdminOverview() {
  const recentUsers = adminUsers.slice(0, 5);
  const recentPayments = adminPayments.slice(0, 5);

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-ink-900 mb-1">Admin Overview</h1>
      <p className="text-ink-600 text-sm mb-8">A snapshot of platform activity today.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
        {statCards.map(({ icon: Icon, label, value, tone }) => (
          <div key={label} className="bg-white rounded-2xl border border-ink-900/5 shadow-sm p-5">
            <span className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${toneCls[tone]}`}>
              <Icon size={19} />
            </span>
            <p className="font-display text-xl font-bold text-ink-900">{value}</p>
            <p className="text-xs text-ink-600 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-ink-900/5 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-ink-900/5 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold text-ink-900">Recent Users</h3>
            <Button to="/admin/users" variant="ghost" size="sm">View All</Button>
          </div>
          <ul className="divide-y divide-ink-900/5">
            {recentUsers.map((u) => (
              <li key={u.id} className="px-5 py-3 flex items-center justify-between text-sm">
                <div>
                  <p className="font-semibold text-ink-900">{u.name}</p>
                  <p className="text-xs text-ink-400">{u.id} • {u.city}</p>
                </div>
                <StatusPill status={u.status} />
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl border border-ink-900/5 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-ink-900/5 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold text-ink-900">Recent Payments</h3>
            <Button to="/admin/payments" variant="ghost" size="sm">View All</Button>
          </div>
          <ul className="divide-y divide-ink-900/5">
            {recentPayments.map((p) => (
              <li key={p.id} className="px-5 py-3 flex items-center justify-between text-sm">
                <div>
                  <p className="font-semibold text-ink-900">{p.name}</p>
                  <p className="text-xs text-ink-400">{p.id} • {p.method}</p>
                </div>
                <StatusPill status={p.status} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function StatusPill({ status }) {
  const cls = {
    Active: "bg-green-500/10 text-green-600",
    Pending: "bg-gold-500/10 text-gold-600",
    Suspended: "bg-rose-500/10 text-rose-600",
    Approved: "bg-green-500/10 text-green-600",
    Rejected: "bg-rose-500/10 text-rose-600",
  }[status] || "bg-ink-900/5 text-ink-600";
  return <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${cls}`}>{status}</span>;
}
