import {
  ShieldCheck,
  Users,
  LayoutGrid,
  Activity,
  Database,
  CheckCircle,
} from "lucide-react";

const AdminDashboardPage = async () => {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-400 mb-2">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Admin System Portal</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            System Analytics & Overview
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Monitor global user activity, boards, and security status
          </p>
        </div>
      </div>

      {/* Analytics Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stat Card 1 */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">
              Total Users
            </span>
            <div className="h-10 w-10 rounded-xl bg-indigo-600/10 text-indigo-400 flex items-center justify-center">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white">Active</div>
          <p className="text-xs text-emerald-400 flex items-center gap-1">
            <CheckCircle className="h-3.5 w-3.5" /> System User Monitoring
          </p>
        </div>

        {/* Stat Card 2 */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">
              Active Boards
            </span>
            <div className="h-10 w-10 rounded-xl bg-purple-600/10 text-purple-400 flex items-center justify-center">
              <LayoutGrid className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white">Global</div>
          <p className="text-xs text-purple-400 flex items-center gap-1">
            <Activity className="h-3.5 w-3.5" /> Multi-tenant Kanban
          </p>
        </div>

        {/* Stat Card 3 */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">
              Database Status
            </span>
            <div className="h-10 w-10 rounded-xl bg-emerald-600/10 text-emerald-400 flex items-center justify-center">
              <Database className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-emerald-400">
            Healthy
          </div>
          <p className="text-xs text-slate-400">Prisma 7 + Neon Postgres</p>
        </div>

        {/* Stat Card 4 */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">
              Security Guard
            </span>
            <div className="h-10 w-10 rounded-xl bg-rose-600/10 text-rose-400 flex items-center justify-center">
              <ShieldCheck className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white">RBAC</div>
          <p className="text-xs text-slate-400">Token & Role Guard Active</p>
        </div>
      </div>

      {/* Admin Panel Details */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 text-center space-y-4">
        <h3 className="text-lg font-bold text-white">
          System Monitoring Active
        </h3>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          As an Admin, you have elevated privilege monitoring over system
          boards, database health, and user authentication tokens.
        </p>
      </div>
    </main>
  );
};

export default AdminDashboardPage;
