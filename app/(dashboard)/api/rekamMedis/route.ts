import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import RekamMedis from "@/lib/models/RekamMedis";
import Collection from "@/lib/models/Collection";
import {getUserById} from "@/app/(dashboard)/admin/actions";
import {sendEmailRekamMedis} from "@/app/(dashboard)/rekamMedis/action";

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
      idPasien,
      namaPasien,
      suhu,
      nadi,
      sistole,
      diastole,
      frekuensiPernapasan,
      obatDiKonsumsi,
      diagnosis,
      resepObat,
      keluhan,
      riwayatPenyakit,
      riwayatAlergi,
      idNakes,
      nakes,
      noRekamMedis,
    } = await req.json()

    const dataPasien = await getUserById(idPasien);
    const namaPasiens = `${dataPasien.firstName || '-'} ${dataPasien.lastName || '-'}`.trim();
    sendEmailRekamMedis(namaPasiens, dataPasien.emailAddresses[0]?.emailAddress, noRekamMedis);
    const newRekamMedis = new RekamMedis({
      idPasien,
      namaPasien : namaPasiens,
      suhu,
      nadi,
      sistole,
      diastole,
      frekuensiPernapasan,
      obatDiKonsumsi,
      diagnosis,
      resepObat,
      keluhan,
      riwayatPenyakit,
      riwayatAlergi,
      idNakes,
      nakes,
      noRekamMedis,
    })
    console.log(dataPasien)
    await newRekamMedis.save()

    return NextResponse.json(newRekamMedis, { status: 200 })
  } catch (err) {
    console.log("[rekamMedis_POST]", err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB()

    const rekamMedis = await RekamMedis.find().sort({ createdAt: "desc" })

    return NextResponse.json(rekamMedis, { status: 200 })
  } catch (err) {
    console.log("[rekamMedis_GET]", err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export const dynamic = "force-dynamic";
