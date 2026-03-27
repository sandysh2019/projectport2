import { NextResponse } from "next/server";
import { getWorks } from "@/lib/data";
import { Work } from "@/lib/models";
import { connectDb } from "@/lib/db";
import { requireAdmin } from "@/lib/require-admin";

export async function GET() {
  const works = await getWorks();
  return NextResponse.json({ data: works });
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
    await connectDb();
    const body = await request.json();
    const created = await Work.create({
      title: body.title,
      category: body.category,
      description: body.description,
      imageUrl: body.imageUrl,
      stack: body.stack || [],
      link: body.link || "",
      featured: !!body.featured,
    });
    return NextResponse.json({ data: { ...created.toObject(), _id: String(created._id) } }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
