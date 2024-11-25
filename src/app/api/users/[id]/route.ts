import { connectToDB } from "@/db/connect-to-db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

interface Params {
  params: Promise<{ id: string }>;
}

await connectToDB();

const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  avatar: z.string().optional(),
  status: z.string().optional(),
  roles: z.array(z.string()).optional(),
});

export const GET = async (req: NextRequest, { params }: Params) => {
  const { id } = await params;
  console.log(id);
  const user = await User.findById(id);
  if (!user)
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  return NextResponse.json(user);
};

export const PUT = async (req: NextRequest, { params }: Params) => {
  const { id } = await params;
  console.log(id);
  const updateData = await req.json();
  const validationResult = updateUserSchema.safeParse(updateData);
  if (!validationResult.success) {
    return NextResponse.json(
      { message: "Invalid request body" },
      { status: 400 },
    );
  }
  const user = await User.findByIdAndUpdate(id, validationResult.data, {
    new: true,
  });
  if (!user)
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  return NextResponse.json(user);
};

export const DELETE = async (req: NextRequest, { params }: Params) => {
  const { id } = await params;
  console.log(id);
  const user = await User.findByIdAndDelete(id);
  if (!user)
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  return NextResponse.json({ message: "User deleted successfully" });
};
