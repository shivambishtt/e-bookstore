import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto"
import { connectDB } from "@/db/db";
import Order from "@/models/order.model";
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
    try {
        const body = await request.text()
        const signature = request.headers.get("x-razorpay-signature")

        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
            .update(body)
            .digest("hex")

        if (generatedSignature !== signature) {
            return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
        }
        const event = JSON.parse(body)
        await connectDB()

        if (event.event === "payment.captured") {
            const payment = event.payload.payment.entity;

            const order = await Order.findOneAndUpdate({ razorpayOrderId: payment.order_id }, { razorpayPaymentId: payment.id, status: "completed" })
                .populate([
                    { path: "productId", select: "name" },
                    { path: "userId", select: "email" }
                ])
            if (order) {
                
            }
        }
    } catch (error) {

    }
}