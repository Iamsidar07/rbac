import { connectToDB } from "@/db/connect-to-db";
import Permission from "@/models/Permission";
import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';

await connectToDB();

const createPermissionSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const GET = async (_req: NextRequest) => {
  const permissions = await Permission.find();
  return NextResponse.json(permissions);
};

export const POST = async (req: NextRequest) => {
  const permissionData = await req.json();
  const validationResult = createPermissionSchema.safeParse(permissionData);
  if (!validationResult.success) {
      return NextResponse.json({message: "Invalid request body"}, {status: 400});
  }
  const permission = new Permission(validationResult.data);
  await permission.save();
  return NextResponse.json(permission);
};
