import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import { Work } from "@/lib/models";
import { requireAdmin } from "@/lib/require-admin";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    await connectDb();
    const body = await request.json();
    const { id } = await params;
    const updated = await Work.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json({ data: updated });
  } catch {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    await connectDb();
    const { id } = await params;
    await Work.findByIdAndDelete(id);
    return NextResponse.json({ message: "Deleted" });
  } catch {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
