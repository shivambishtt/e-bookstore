import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI
if (!MONGODB_URI) {
    throw new Error("Check your database connection string")
}
let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

export async function connectDB(){
    u
}