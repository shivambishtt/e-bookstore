import mongoose, { Schema } from "mongoose";

export interface IProduct {
    productType: string,
}

export const imageVariationSchema = new Schema({
    type: {
        type: String,
        required: true,
        enum: ["SQUARE", "WIDE", "PORTRAIT"]
    },
    price: {
        type: Number,
        required: false,
        min: 0
    },
    license: {
        type: String,
        required: true,
        enum: ["personal", "commercial"]
    }
})
export const ProductSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageurl: { type: String, required: true },
    variants: [imageVariationSchema]
}, { timestamps: true })



const Product = mongoose.models?.Product || mongoose.model<IProduct>("Product", ProductSchema)