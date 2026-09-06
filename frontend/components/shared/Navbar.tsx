"use client";

import Link from "next/link";
import { Kanban, LogOut, User } from "lucide-react";
import { logoutAction } from "@/app/(authGroup)/_actions/authActions";

export const Navbar = ({ userName }: { userName?: string }) => {
  const handleLogout = async () => {
    await logoutAction();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-500/20 transition-all group-hover:scale-105">
            <Kanban className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">Mini Kanban</span>
        </Link>

        {/* User Info & Logout Button */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 rounded-full bg-slate-800 px-3 py-1.5 border border-slate-700 text-xs font-medium text-slate-300">
            <User className="h-3.5 w-3.5 text-indigo-400" />
            <span>{userName || "Developer"}</span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg bg-slate-800 hover:bg-rose-600/20 hover:text-rose-400 border border-slate-700 px-3.5 py-2 text-sm font-medium text-slate-300 transition-all"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};