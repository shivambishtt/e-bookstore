import { connectDB } from "@/db/db";
import User from "@/models/user.model";
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "email"
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "password"
                }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    throw new Error("Invalid credentials");
                }
                try {
                    await connectDB()
                    const user = await User.findOne({ email: credentials.email })
                    if (!user) {
                        throw new Error("User not found with this email")
                    }
                    const isValid = bcrypt.compare(credentials.password, user.password)
                    if (!isValid) {
                        throw new Error("Invalid credentials")
                    }
                    return {
                        id: user._id.toString(),
                        email: user.email,
                        role: user.role
                    }
                } catch (error) {
                    console.error("Auth error", error)
                    throw error
                }
            }
        })
    ]
}