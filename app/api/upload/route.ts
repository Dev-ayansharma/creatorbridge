import { NextRequest, NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/uploadtocloudinary";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const folder = formData.get("folder") as string;

    if (!file) {
      return NextResponse.json({ success: false }, { status: 400 });
    }
    

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result: any = await uploadToCloudinary(buffer, folder);

    return NextResponse.json({
      success: true,
      url: result.secure_url,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}