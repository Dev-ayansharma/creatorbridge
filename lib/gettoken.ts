
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextRequest } from "next/server";

export  async function getUserFromToken(req: NextRequest) {
  await dbConnect();

  try {
    const token = req.cookies.get("token")?.value;

    if (!token) return null;

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) return null;

    return user;
  } catch (error) {
    return null;
  }
} 