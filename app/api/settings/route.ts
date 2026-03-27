import { NextResponse } from "next/server";
import { getSiteSettings } from "@/lib/data";
import { connectDb } from "@/lib/db";
import { SiteSettings } from "@/lib/models";
import { requireAdmin } from "@/lib/require-admin";

export async function GET() {
  const data = await getSiteSettings();
  return NextResponse.json({ data });
}

export async function PATCH(request: Request) {
  try {
    await requireAdmin();
    await connectDb();
    const body = await request.json();
    const settings = await SiteSettings.findOne();
    if (!settings) {
      const created = await SiteSettings.create(body);
      return NextResponse.json({ data: created });
    }
    settings.siteTitle = body.siteTitle ?? settings.siteTitle;
    settings.faviconUrl = body.faviconUrl ?? settings.faviconUrl;
    settings.testimonials = body.testimonials ?? settings.testimonials;
    await settings.save();
    return NextResponse.json({ data: settings });
  } catch {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
