import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import Poliklinik from "@/lib/models/Poliklinik";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 })
    }

    await connectToDB()

    const { name, desc } = await req.json()
    const existingPoliklinik = await Poliklinik.findOne({ name })
    if (existingPoliklinik) {
      return new NextResponse("Poliklinik already exists", { status: 400 })
    }
    if (!name) {
      return new NextResponse("Poliklinik", { status: 400 })
    }
    const newPoliklinik = new Poliklinik({
      name,
      desc,
    });

    await newPoliklinik.save()

    return NextResponse.json(newPoliklinik, { status: 200 })
  } catch (err) {
    console.log("[poliklinik_POST]", err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB()

    const polikliniks = await Poliklinik.find().sort({ createdAt: "desc" })

    return NextResponse.json(polikliniks, { status: 200 })
  } catch (err) {
    console.log("[polikliniks_GET]", err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export const dynamic = "force-dynamic";
