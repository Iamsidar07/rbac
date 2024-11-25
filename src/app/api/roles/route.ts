import { connectToDB } from "@/db/connect-to-db";
import Role from "@/models/Role";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

await connectToDB();

const createRoleSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  permissions: z.array(z.string()).optional(),
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const GET = async (req: NextRequest) => {
  const roles = await Role.find().populate("permissions");
  return NextResponse.json(roles);
};

export const POST = async (req: NextRequest) => {
  const roleData = await req.json();
  const validationResult = createRoleSchema.safeParse(roleData);
  if (!validationResult.success) {
    return NextResponse.json(
      { message: "Invalid request body" },
      { status: 400 },
    );
  }
  const role = new Role(validationResult.data);
  await role.save();
  return NextResponse.json(role);
};
