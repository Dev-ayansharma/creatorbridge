import dbConnect from "@/lib/dbConnect";
import { getUserFromToken } from "@/lib/gettoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const user = await getUserFromToken(req);
    const { profilePic } = await req.json();

    if (!user) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    user.profilePic = profilePic;
    await user.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}