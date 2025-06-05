import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"

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
        type: String
    }

})
export const ProductSchema = new Schema({

})



const User = mongoose.models?.Product || mongoose.model<IProduct>("Product", ProductSchema)