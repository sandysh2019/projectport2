import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

declare global {
  var _mongooseConn: Promise<typeof mongoose> | undefined;
}

export async function connectDb() {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not configured");
  }
  if (!global._mongooseConn) {
    global._mongooseConn = mongoose.connect(MONGODB_URI, {
      dbName: process.env.MONGODB_DB || "santhosh_portfolio",
    });
  }

  return global._mongooseConn;
}
