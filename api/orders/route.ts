import { connectDB } from "@/db/db";
import Order from "@/models/order.model";
import { authOptions } from "@/utils/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const { productId, variant } = await request.json();
        await connectDB()

        const order = await razorpay.orders.create({
            amount: variant.price * 100,
            currency: "USD",
            receipt: `receipt-${Date.now()}`,
            notes: {
                productId: productId.toString()
            }
        })
        const newOrder = await Order.create({
            userId: session.user.id,
            productId,
            variant,
            razorpayOrderId: order.id,
            amount: variant.price * 100,
            status: "pending"
        })
        return NextResponse.json({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            dbOrderID: newOrder._id
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })

    }
}