import { connectDB } from "@/db/db";
import Product, { IProduct } from "@/models/product.model";
import { authOptions } from "@/utils/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB()
        const products = await Product.find({}).lean()
        if (!products || products.length === 0) {
            return NextResponse.json({ message: "No products found" }, { status: 400 })
        }
        return NextResponse.json({ products }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error }, { status: 500 })
    }
}
export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session || session.user?.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        await connectDB()
        const body: IProduct = await request.json()
        if (!body.name || !body.description || !body.imageURL) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 })
        }
        const newProduct = await Product.create(body)
        return NextResponse.json({ newProduct }, { status: 201 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
    }
}