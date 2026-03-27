"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: formData.get("username"),
        password: formData.get("password"),
      }),
    });
    if (!response.ok) {
      setError("Invalid credentials");
      setLoading(false);
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="grid min-h-screen place-items-center bg-background px-6">
      <form onSubmit={onSubmit} className="glass w-full max-w-md rounded-2xl p-6">
        <h1 className="mb-5 text-2xl font-bold">Admin Login</h1>
        <label className="mb-4 block text-sm text-text-secondary">
          Username
          <input name="username" defaultValue="admin" className="mt-2 w-full rounded-xl border border-border bg-surface p-3" />
        </label>
        <label className="mb-4 block text-sm text-text-secondary">
          Password
          <input type="password" name="password" required className="mt-2 w-full rounded-xl border border-border bg-surface p-3" />
        </label>
        <button className="w-full rounded-xl bg-accent px-4 py-3 font-semibold text-white">{loading ? "Signing in..." : "Sign In"}</button>
        {error ? <p className="mt-3 text-sm text-red-400">{error}</p> : null}
      </form>
    </main>
  );
}
