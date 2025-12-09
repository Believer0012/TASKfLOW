/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../store/authStore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(email, password);
      if (res?.accessToken) {
        localStorage.setItem("accessToken", res.accessToken);
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      return;
    }
  };

  useEffect(() => {
    console.log("in login pag");
  }, []);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 px-4">
      {/* Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
      </div>

      <div className="relative z-10 flex w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 shadow-2xl shadow-black/50 md:flex-row">
        {/* Brand Side */}
        <div className="hidden w-full flex-1 flex-col justify-between border-b border-white/10 bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-blue-500/10 p-8 md:flex md:border-b-0 md:border-r">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-emerald-300 ring-1 ring-emerald-500/40">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              TaskFlow • Stay on top of your day
            </div>
            <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-50">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-slate-300">
              Log in to see your tasks, track progress, and keep your day
              organised in one clean dashboard.
            </p>
          </div>

          <div className="mt-8 space-y-3 text-xs text-slate-300/90">
            <p className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-xl bg-black/50 text-[11px]">
                ✓
              </span>
              Fast overview of what’s due today
            </p>
            <p className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-xl bg-black/50 text-[11px]">
                ⧉
              </span>
              Group tasks by status and due date
            </p>
            <p className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-xl bg-black/50 text-[11px]">
                ⏱
              </span>
              Lightweight, distraction-free interface
            </p>
          </div>
        </div>

        {/* Form Side */}
        <form
          onSubmit={handleLogin}
          className="flex w-full flex-1 flex-col justify-center px-6 py-8 sm:px-10"
        >
          <div className="mb-6 flex items-center gap-2 md:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 text-lg">
              ✓
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-50">
                TaskFlow
              </h2>
              <p className="text-xs text-slate-400">Modern task manager</p>
            </div>
          </div>

          <h2 className="text-xl font-semibold tracking-tight text-slate-50">
            Log in
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Enter your email and password to continue.
          </p>

          <div className="mt-5 space-y-4 text-sm">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-300">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2.5 text-sm text-slate-100 outline-none ring-0 transition-all placeholder:text-slate-500 focus:border-emerald-400/70 focus:ring-2 focus:ring-emerald-500/40"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-300">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2.5 text-sm text-slate-100 outline-none ring-0 transition-all placeholder:text-slate-500 focus:border-emerald-400/70 focus:ring-2 focus:ring-emerald-500/40"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              className="mt-2 flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/40 transition-all hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {error && (
              <p className="mt-2 text-center text-xs text-red-300">{error}</p>
            )}
          </div>

          <p className="mt-6 text-center text-xs text-slate-400">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-emerald-300 hover:text-emerald-200"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
