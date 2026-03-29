import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { email, password } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 400 }
      );
    }

    if (user.provider !== "CREDENTIALS") {
      return NextResponse.json(
        { success: false, message: "Use Google login" },
        { status: 400 }
      );
    }

    if (!user.isVerified) {
      return NextResponse.json(
        { success: false, message: "Please verify your account" },
        { status: 400 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password!);

    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 400 }
      );
    }

    // ✅ Create JWT session
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Login error" ,err:error},
      { status: 500 }
    );
  }
}