import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"

export interface IUser {
    _id?: mongoose.Types.ObjectId,
    email: string,
    username: string,
    password: string,
    role: "user" | "admin",
    createdAt?: Date,
    updatedAt?: Date
}

const userSchema = new Schema<IUser>({
    email: {
        type: String, required: true, unique: true
    },
    password: {
        type: String, required: true
    },
    role: {
        type: String, enum: ["USER", "ADMIN"], default: "user"
    },
}, { timestamps: true })


userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next();
})

const User = mongoose.model?.User || mongoose.model<IUser>("User", userSchema)
export default User
