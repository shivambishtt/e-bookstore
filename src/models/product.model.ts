import mongoose, { Schema } from "mongoose";

export interface IProduct {
    productType: string,
}
export type ImageVariantType = keyof typeof IMAGE_VARIANTS

export interface ImageVariant {
    type: ImageVariantType,
    price: number,
    license: "personal" | "commerical"
}

export interface IProduct {
    _id?: mongoose.Types.ObjectId;
    name: string,
    description: string,
    imageURL: string,
    variants: ImageVariant
}

export const IMAGE_VARIANTS = {
    SQUARE: {
        type: "SQUARE",
        dimensions: { widht: 1200, height: 1200 },
        label: "Square (1:1)",
        aspectRatio: "1:1",
    },
    PORTRAIT: {
        type: "SQUARE",
        dimensions: { widht: 1080, height: 1440 },
        label: "Portrait (3:4)",
        aspectRatio: "3:4",
    },
    WIDE: {
        type: "WIDE",
        dimensions: { widht: 1920, height: 1080 },
        label: "Widescreen (16:9)",
        aspectRatio: "16:9 ",
    },
} as const


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
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageurl: {
        type: String,
        required: true
    },
    variants: [imageVariationSchema]
}, { timestamps: true })



const Product = mongoose.models?.Product || mongoose.model<IProduct>("Product", ProductSchema)
export default Product