import { connectDB } from "@/db/db";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json()
        if (!email || !password) {
            return NextResponse.json(
                { message: "Email and password are required" },
                { status: 400 })
        }
        await connectDB()
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return NextResponse.json(
                { message: "User with the email is already registered." },
                { status: 400 })
        }
        User.create({
            email,
            password,
            role: "user"
        })
        return NextResponse.json(
            { message: "User successfully registered." },
            { status: 201 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: "Error occured while registering the user.", error },
            { status: 501 }
        )
    }
}