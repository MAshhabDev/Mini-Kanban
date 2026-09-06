/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Kanban, Loader2, UserPlus } from "lucide-react";
import { registerAction } from "../_actions/authActions";

interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export const RegisterForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit } = useForm<RegisterFormInputs>();

  const onSubmit = async (data: RegisterFormInputs) => {
    setIsLoading(true);
    try {
      const res = await registerAction({ ...data, role: data.role || "USER" });
      if (res.success) {
        toast.success("Account created successfully! Please sign in.");
        router.push("/login");
      } else {
        toast.error(res.message || "Failed to register");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8 rounded-2xl bg-slate-800/80 p-8 shadow-xl backdrop-blur-md border border-slate-700/50">
      <div className="text-center space-y-2">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/30">
          <Kanban className="h-6 w-6" />
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight text-white">Create Account</h2>
        <p className="text-sm text-slate-400">Join Mini Kanban to collaborate with teams</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Full Name</label>
            <input
              {...register("name", { required: true })}
              type="text"
              required
              placeholder="John Doe"
              className="w-full rounded-lg bg-slate-900/90 border border-slate-700 px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
            <input
              {...register("email", { required: true })}
              type="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-lg bg-slate-900/90 border border-slate-700 px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
            <input
              {...register("password", { required: true })}
              type="password"
              required
              placeholder="••••••••"
              className="w-full rounded-lg bg-slate-900/90 border border-slate-700 px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all hover:bg-indigo-500 focus:outline-none disabled:opacity-50"
        >
          {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <><UserPlus className="h-5 w-5" /> Register Account</>}
        </button>
      </form>

      <p className="text-center text-sm text-slate-400">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-indigo-400 hover:text-indigo-300 underline">
          Sign in here
        </Link>
      </p>
    </div>
  );
};