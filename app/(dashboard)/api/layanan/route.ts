import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import Layanan from "@/lib/models/Layanan";
import mongoose from "mongoose";

export const POST = async (req: NextRequest) => {
  console.log("Connect")
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 })
    }

    await connectToDB()
    const mongoose = require("mongoose");

    const { name, description, price, idPoliklinik, typeRawat  } = await req.json()

    const existingLayanan = await Layanan.findOne({ name })

    if (existingLayanan) {
      return new NextResponse("Layanan already exists", { status: 400 })
    }

    if (!name) {
      return new NextResponse("Title and image are required", { status: 400 })
    }

    const newLayanan = new Layanan({
      name,
      description,
      price,
      idPoliklinik: new mongoose.Types.ObjectId(idPoliklinik),
      typeRawat,
    })
    console.log(newLayanan)
    await newLayanan.save()

    return NextResponse.json(newLayanan, { status: 200 })
  } catch (err) {
    console.log("[layanans_POST]", err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB()

    const layanans = await Layanan.find().sort({ createdAt: "desc" })

    return NextResponse.json(layanans, { status: 200 })
  } catch (err) {
    console.log("[layanans_GET]", err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export const dynamic = "force-dynamic";
