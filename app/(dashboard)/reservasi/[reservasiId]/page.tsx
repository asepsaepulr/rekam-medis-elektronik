"use client"

import Loader from '@/components/custom ui/Loader'
import ReservasiForm from "#reservasi/ReservasiForm";
import React, { useEffect, useState } from 'react'
import {ReservasiType} from "@/lib/types";

const ReservasiDetails = ({ params }: { params: { reservasiId: string }}) => {
  const [loading, setLoading] = useState(true)
  const [reservasiDetails, setReservasiDetails] = useState<ReservasiType | null>(null)

  const getReservasiDetails = async () => {
    try {
      const res = await fetch(`/api/reservasi/${params.reservasiId}`, {
        method: "GET"
      })
      const data = await res.json()
      setReservasiDetails(data)
      setLoading(false)
    } catch (err) {
      console.log("[reservasiId_GET]", err)
    }
  }

  useEffect(() => {
    getReservasiDetails()
  }, [])

  return loading ? <Loader /> : (
    <ReservasiForm initialData={reservasiDetails} />
  )
}

export default ReservasiDetails
