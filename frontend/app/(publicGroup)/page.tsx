import Link from "next/link";
import { cookies } from "next/headers";
import { Kanban, Sparkles, Move, Users, ShieldCheck, ArrowRight } from "lucide-react";

const HomePage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      {/* Header / Top Navigation */}
      <header className="border-b border-slate-800/80 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-500/30">
              <Kanban className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Mini Kanban</span>
          </div>

          <div className="flex items-center gap-3">
            {token ? (
              <Link
                href="/dashboard"
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all"
              >
                Go to Dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-xl bg-slate-800 border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-700 transition-all"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center space-y-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-400">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Full-Stack Agile Task Management System</span>
        </div>

        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Manage Your Team Projects Effortlessly with{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Mini Kanban
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
            A production-ready, interactive Kanban board built with Next.js, Express, Prisma, and Drag-and-Drop task reordering.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 pt-4">
          <Link
            href={token ? "/dashboard" : "/register"}
            className="flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3.5 font-bold text-white shadow-xl shadow-indigo-600/40 hover:bg-indigo-500 hover:scale-105 transition-all"
          >
            {token ? "Open Dashboard" : "Start For Free"}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 text-left">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-3 backdrop-blur-sm">
            <div className="h-12 w-12 rounded-xl bg-indigo-600/10 text-indigo-400 flex items-center justify-center">
              <Move className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Drag & Drop Movement</h3>
            <p className="text-sm text-slate-400">
              Reorder tasks smoothly across columns with conflict-free fractional indexing algorithm.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-3 backdrop-blur-sm">
            <div className="h-12 w-12 rounded-xl bg-purple-600/10 text-purple-400 flex items-center justify-center">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Team Collaboration</h3>
            <p className="text-sm text-slate-400">
              Share boards with registered users and assign Collaborator or Viewer access roles.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-3 backdrop-blur-sm">
            <div className="h-12 w-12 rounded-xl bg-pink-600/10 text-pink-400 flex items-center justify-center">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Role-Based Security</h3>
            <p className="text-sm text-slate-400">
              Protected endpoints with JWT tokens and authorization guards to prevent cross-board data leakage.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-900/30 py-6 text-center text-xs text-slate-500">
        <p>© 2026 Mini Kanban Board. Built By Mahir</p>
      </footer>
    </div>
  );
};

export default HomePage;