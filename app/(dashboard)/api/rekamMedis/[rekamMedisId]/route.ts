import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { connectToDB } from "@/lib/mongoDB";
import RekamMedis from "@/lib/models/RekamMedis";

export const GET = async (
  req: NextRequest,
  { params }: { params: { rekamMedisId: string } }
) => {
  try {
    await connectToDB();

    const rekamMedis = await RekamMedis.findById(params.rekamMedisId);

    if (!rekamMedis) {
      return new NextResponse(
        JSON.stringify({ message: "RekamMedis not found" }),
        { status: 404 }
      );
    }

    return NextResponse.json(rekamMedis, { status: 200 });
  } catch (err) {
    console.log("[rekamMedisId_GET]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { rekamMedisId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    let rekamMedis = await RekamMedis.findById(params.rekamMedisId);

    if (!rekamMedis) {
      return new NextResponse("RekamMedis not found", { status: 404 });
    }

    const { title, description, image } = await req.json();

    if (!title || !image) {
      return new NextResponse("Title and image are required", { status: 400 });
    }

    rekamMedis = await RekamMedis.findByIdAndUpdate(
      params.rekamMedisId,
      { title, description, image },
      { new: true }
    );

    await rekamMedis.save();

    return NextResponse.json(rekamMedis, { status: 200 });
  } catch (err) {
    console.log("[rekamMedisId_POST]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { rekamMedisId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    await RekamMedis.findByIdAndDelete(params.rekamMedisId);


    return new NextResponse("RekamMedis is deleted", { status: 200 });
  } catch (err) {
    console.log("[rekamMedisId_DELETE]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
