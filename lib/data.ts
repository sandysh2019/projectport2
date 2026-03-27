import bcrypt from "bcryptjs";
import { connectDb } from "@/lib/db";
import { Admin, SiteSettings, Work } from "@/lib/models";

export async function bootstrapData() {
  if (!process.env.MONGODB_URI) return;
  await connectDb();

  const settings = await SiteSettings.findOne();
  if (!settings) {
    await SiteSettings.create({
      siteTitle: "Santhosh | BSc AI & DS",
      faviconUrl: "",
      testimonials: [
        { name: "Design Client", role: "Founder", quote: "Strong visual language and execution." },
        { name: "Engineering Client", role: "CTO", quote: "Built robust full-stack deliverables fast." },
      ],
    });
  }

  const admin = await Admin.findOne({ username: "admin" });
  if (!admin) {
    const initialPassword = process.env.ADMIN_PASSWORD || "change_me_now_please";
    const passwordHash = await bcrypt.hash(initialPassword, 10);
    await Admin.create({ username: "admin", passwordHash });
  }
}

export async function getSiteSettings() {
  if (!process.env.MONGODB_URI) {
    return {
      siteTitle: "Santhosh | BSc AI & DS",
      faviconUrl: "",
      testimonials: [
        { name: "Design Client", role: "Founder", quote: "Strong visual language and execution." },
        { name: "Engineering Client", role: "CTO", quote: "Built robust full-stack deliverables fast." },
      ],
    };
  }
  await bootstrapData();
  const settings = await SiteSettings.findOne().lean();
  return {
    siteTitle: settings?.siteTitle || "Santhosh | BSc AI & DS",
    faviconUrl: settings?.faviconUrl || "",
    testimonials: settings?.testimonials || [],
  };
}

export async function getWorks() {
  if (!process.env.MONGODB_URI) {
    return [
      {
        _id: "local-1",
        title: "Identity System Prototype",
        category: "Graphic Design",
        description: "Brand direction, logo variants, and campaign-ready templates.",
        imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
      },
      {
        _id: "local-2",
        title: "Analytics Dashboard",
        category: "Full-Stack Development",
        description: "High-performance dashboard with role-aware admin capabilities.",
        imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
      },
    ];
  }
  await bootstrapData();
  const works = await Work.find().sort({ createdAt: -1 }).lean();
  return works.map((work) => ({
    ...work,
    _id: String(work._id),
  }));
}
