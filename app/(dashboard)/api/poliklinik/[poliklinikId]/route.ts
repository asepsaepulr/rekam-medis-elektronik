import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { connectToDB } from "@/lib/mongoDB";
import Poliklinik from "@/lib/models/Poliklinik";

export const GET = async (
  req: NextRequest,
  { params }: { params: { poliklinikId: string } }
) => {
  try {
    await connectToDB();

    const poliklinik = await Poliklinik.findById(params.poliklinikId);

    if (!poliklinik) {
      return new NextResponse(
        JSON.stringify({ message: "Poliklinik not found" }),
        { status: 404 }
      );
    }

    return NextResponse.json(poliklinik, { status: 200 });
  } catch (err) {
    console.log("[poliklinikId_GET]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { poliklinikId: string } }
) => {
  try {
    const { userId } = auth();
    console.log("OYYYYYY")
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    let poliklinik = await Poliklinik.findById(params.poliklinikId);

    if (!poliklinik) {
      return new NextResponse("Poliklinik not found", { status: 404 });
    }

    const { name, desc } = await req.json();

    if (!name) {
      return new NextResponse("Name required", { status: 400 });
    }

    poliklinik = await Poliklinik.findByIdAndUpdate(
      params.poliklinikId,
      { name, desc },
      { new: true }
    );

    await poliklinik.save();

    return NextResponse.json(poliklinik, { status: 200 });
  } catch (err) {
    console.log("[poliklinikId_POST]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { poliklinikId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    await Poliklinik.findByIdAndDelete(params.poliklinikId);

    return new NextResponse("Poliklinik is deleted", { status: 200 });
  } catch (err) {
    console.log("[poliklinikId_DELETE]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
