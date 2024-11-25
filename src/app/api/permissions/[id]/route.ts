import { connectToDB } from "@/db/connect-to-db";
import Permission from "@/models/Permission";
import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';

interface Params {
    params: Promise<{id: string}>
}

await connectToDB()

const updatePermissionSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
});

export const GET = async(req: NextRequest, {params}: Params )=>{
    const {id} = await params
    console.log(id)
    const permission = await Permission.findById(id)
    if(!permission) return NextResponse.json({message: "Permission not found"}, {status: 404})
    return NextResponse.json(permission)
}

export const PUT = async(req: NextRequest, {params}: Params )=>{
    const {id} = await params
    console.log(id)
    const updateData = await req.json(); // Corrected to await req.json()
    const validationResult = updatePermissionSchema.safeParse(updateData);
    if (!validationResult.success) {
        return NextResponse.json({message: "Invalid request body"}, {status: 400});
    }
    const permission = await Permission.findByIdAndUpdate(id, validationResult.data, {new: true})
    if(!permission) return NextResponse.json({message: "Permission not found"}, {status: 404})
    return NextResponse.json(permission)
}

export const DELETE = async(req: NextRequest, {params}: Params )=>{
    const {id} = await params
    console.log(id)
    const permission = await Permission.findByIdAndDelete(id)
    if(!permission) return NextResponse.json({message: "Permission not found"}, {status: 404})
    return NextResponse.json({message: "Permission deleted successfully"})
}