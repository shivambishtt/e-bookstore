import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"

export interface IUser {
    email: string,
    password: string,
    username: string,
}

const userSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["USER", "ADMIN"], default: "user" },
}, { timestamps: true })

const user = mongoose.model?.User || mongoose.model<IUser>("User", userSchema)
export default user
