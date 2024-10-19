import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import Reservasi from "@/lib/models/Reservasi";
import Poliklinik from "@/lib/models/Poliklinik";
import Layanan from "@/lib/models/Layanan";


export const POST = async (req: NextRequest) => {
  console.log("Connect")
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 })
    }
    await connectToDB()
    const mongoose = require("mongoose");

    const {
      jenisKunjungan,
      typeRawat,
      triase,
      namaPasien,
      noRekamMedis,
      kategoriPasien,
      tanggalLahir,
      jenisKelamin,
      alamat,
      nomorTelepon,
      email,
      polikliniks,
      layanans,
      idnakes,
      tanggalKonsultasi,
      jamKonsultasi,
      jamSlot,
    } = await req.json()

    const newReservasi = new Reservasi({
      jenisKunjungan,
      typeRawat,
      triase,
      namaPasien,
      noRekamMedis,
      kategoriPasien,
      tanggalLahir,
      jenisKelamin,
      alamat,
      nomorTelepon,
      email,
      polikliniks: new mongoose.Types.ObjectId(polikliniks),
      layanans: new mongoose.Types.ObjectId(layanans),
      idnakes,
      tanggalKonsultasi,
      jamKonsultasi,
      jamSlot,
    })
    console.log(newReservasi)
    await newReservasi.save()

    return NextResponse.json(newReservasi, { status: 200 })
  } catch (err) {
    console.log("[reservasi_POST]", err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB()
    const data:any = [];
    const reservasi = await Reservasi.find().sort({ createdAt: "desc" }).populate({ path: "polikliniks", model: Poliklinik })
      .populate({ path: "layanans", model: Layanan });;

    return NextResponse.json(reservasi, { status: 200 })
  } catch (err) {
    console.log("[reservasi_GET]", err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export const dynamic = "force-dynamic";
