import { connectToDB } from "@/db/connect-to-db";
import Role from "@/models/Role";
import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';

interface Params {
    params: Promise<{id: string}>
}

await connectToDB()

const updateRoleSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    permissions: z.array(z.string()).optional(),
});

export const GET = async(req: NextRequest, {params}: Params )=>{
    const {id} = await params
    console.log(id)
    const role = await Role.findById(id)
    if(!role) return NextResponse.json({message: "Role not found"}, {status: 404})
    return NextResponse.json(role)
}

export const PUT = async(req: NextRequest, {params}: Params )=>{
    const {id} = await params
    console.log(id)
    const updateData = await req.json();
    const validationResult = updateRoleSchema.safeParse(updateData);
    if (!validationResult.success) {
        return NextResponse.json({message: "Invalid request body"}, {status: 400});
    }
    const role = await Role.findByIdAndUpdate(id, validationResult.data, {new: true})
    if(!role) return NextResponse.json({message: "Role not found"}, {status: 404})
    return NextResponse.json(role)
}

export const DELETE = async(req: NextRequest, {params}: Params )=>{
    const {id} = await params
    console.log(id)
    const role = await Role.findByIdAndDelete(id)
    if(!role) return NextResponse.json({message: "Role not found"}, {status: 404})
    return NextResponse.json({message: "Role deleted successfully"})
}