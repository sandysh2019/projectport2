"use client";

import { FormEvent, useEffect, useState } from "react";

type Work = {
  _id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  featured?: boolean;
};

export default function AdminPage() {
  const [works, setWorks] = useState<Work[]>([]);
  const [siteTitle, setSiteTitle] = useState("");
  const [faviconUrl, setFaviconUrl] = useState("");
  const [testimonials, setTestimonials] = useState('[{"name":"Client","role":"Role","quote":"Feedback"}]');
  const [newPassword, setNewPassword] = useState("");

  async function loadAll() {
    const [worksRes, settingsRes] = await Promise.all([fetch("/api/works"), fetch("/api/settings")]);
    const worksData = await worksRes.json();
    const settingsData = await settingsRes.json();
    setWorks(worksData.data || []);
    setSiteTitle(settingsData.data?.siteTitle || "");
    setFaviconUrl(settingsData.data?.faviconUrl || "");
    setTestimonials(JSON.stringify(settingsData.data?.testimonials || [], null, 2));
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadAll();
  }, []);

  async function createWork(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    await fetch("/api/works", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.get("title"),
        category: form.get("category"),
        description: form.get("description"),
        imageUrl: form.get("imageUrl"),
      }),
    });
    event.currentTarget.reset();
    loadAll();
  }

  async function deleteWork(id: string) {
    await fetch(`/api/works/${id}`, { method: "DELETE" });
    loadAll();
  }

  async function saveSettings() {
    await fetch("/api/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ siteTitle, faviconUrl, testimonials: JSON.parse(testimonials) }),
    });
    loadAll();
  }

  async function changePassword() {
    await fetch("/api/auth/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newPassword }),
    });
    setNewPassword("");
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl space-y-8 px-6 py-10">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <section className="glass rounded-2xl p-6">
        <h2 className="mb-4 text-xl font-bold">Recent Works CRUD</h2>
        <form onSubmit={createWork} className="grid gap-3 md:grid-cols-2">
          <input name="title" placeholder="Title" required className="rounded-xl border border-border bg-surface p-3" />
          <input name="category" placeholder="Category" required className="rounded-xl border border-border bg-surface p-3" />
          <input name="imageUrl" placeholder="Image URL" required className="rounded-xl border border-border bg-surface p-3 md:col-span-2" />
          <textarea name="description" placeholder="Description" required className="rounded-xl border border-border bg-surface p-3 md:col-span-2" />
          <button className="rounded-xl bg-accent px-4 py-3 font-semibold">Add Work</button>
        </form>
        <div className="mt-6 grid gap-3">
          {works.map((work) => (
            <div key={work._id} className="flex items-center justify-between rounded-xl border border-border p-3">
              <div>
                <p className="font-semibold">{work.title}</p>
                <p className="text-sm text-text-secondary">{work.category}</p>
              </div>
              <button onClick={() => deleteWork(work._id)} className="rounded-lg border border-red-500 px-3 py-2 text-sm text-red-400">
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="glass rounded-2xl p-6">
        <h2 className="mb-4 text-xl font-bold">Site Settings</h2>
        <div className="space-y-3">
          <input value={siteTitle} onChange={(e) => setSiteTitle(e.target.value)} placeholder="Site title" className="w-full rounded-xl border border-border bg-surface p-3" />
          <input value={faviconUrl} onChange={(e) => setFaviconUrl(e.target.value)} placeholder="Favicon URL" className="w-full rounded-xl border border-border bg-surface p-3" />
          <textarea rows={8} value={testimonials} onChange={(e) => setTestimonials(e.target.value)} className="w-full rounded-xl border border-border bg-surface p-3 font-mono text-sm" />
          <button onClick={saveSettings} className="rounded-xl bg-accent px-4 py-3 font-semibold">
            Save Settings
          </button>
        </div>
      </section>

      <section className="glass rounded-2xl p-6">
        <h2 className="mb-4 text-xl font-bold">Change Admin Password</h2>
        <div className="flex gap-3">
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New password" className="w-full rounded-xl border border-border bg-surface p-3" />
          <button onClick={changePassword} className="rounded-xl bg-accent px-4 py-3 font-semibold">
            Update
          </button>
        </div>
      </section>
    </main>
  );
}
