import { connectToDB } from "@/db/connect-to-db";
import User from "@/models/User";
import Permission from "@/models/Permission";
import Role from "@/models/Role";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

await connectToDB();

const createUserSchema = z.object({
  name: z.string(),
  email: z.string(),
  avatar: z.string().optional(),
  status: z.string(),
  roles: z.array(z.string()).optional(),
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const GET = async (req: NextRequest) => {
  Role.find();
  Permission.find();
  const users = await User.find().populate({
    path: "roles",
    populate: {
      path: "permissions",
      model: "Permission",
    },
  });
  console.log(users);
  return NextResponse.json(users);
};

export const POST = async (req: NextRequest) => {
  const userData = await req.json();
  const validationResult = createUserSchema.safeParse(userData);
  if (!validationResult.success) {
    return NextResponse.json(
      { message: "Invalid request body" },
      { status: 400 },
    );
  }
  const user = new User(validationResult.data);
  await user.save();
  return NextResponse.json(user);
};
