import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { projectSchema } from "@/lib/validation/project";
import * as yup from "yup";

const imagesSchema = yup.array(yup.string().url()).default([]);

export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true, images: { orderBy: { sortOrder: "asc" } } },
  });
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  try {
    const data = await projectSchema.validate(body, { abortEarly: false });
    const images = await imagesSchema.validate(body?.images ?? []);

    const project = await prisma.project.create({
      data: {
        ...data,
        categoryId: data.categoryId || null,
        images: {
          create: images.map((url, i) => ({ url: url as string, sortOrder: i })),
        },
      },
      include: { images: true, category: true },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Invalid request" },
      { status: 400 }
    );
  }
}
