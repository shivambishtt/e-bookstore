import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User", required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    variant: {
        type: {
            type: String,
            required: true,
            enum: ["SQUARE", "WIDE PORTRAIT"]
        },
        price: {
            type: Number,
            required: true
        },
        license: {
            type: String,
            required: true,
            enum: ["personal", "commercial"]
        }
    },
    razorpayOrderId: {
        type: String,
        required: true
    },
    razorpayPaymentID: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["pending", "completed", "failed"],
        default: "pending"
    },
    downloadURL: {
        type: String,
    },
    previewURL: {
        type: String,
    }
}, { timestamps: true })

const Order = mongoose.models.? Order || mongoose.model("Order", orderSchema)