"use client"

import Loader from '@/components/custom ui/Loader'
import RekamMedisForm from "#rekamMedis/RekamMedisForm";
import React, { useEffect, useState } from 'react'
import {RekamMedisType} from "@/lib/types";

const RekamMedisDetails = ({ params }: { params: { rekamMedisId: string }}) => {
  const [loading, setLoading] = useState(true)
  const [rekamMedisDetails, setRekamMedisDetails] = useState<RekamMedisType | null>(null)

  const getRekamMedisDetails = async () => {
    try {
      const res = await fetch(`/api/rekamMedis/${params.rekamMedisId}`, {
        method: "GET"
      })
      const data = await res.json()
      setRekamMedisDetails(data)
      setLoading(false)
    } catch (err) {
      console.log("[rekamMedisId_GET]", err)
    }
  }

  useEffect(() => {
    getRekamMedisDetails()
  }, [])

  return loading ? <Loader /> : (
    <RekamMedisForm initialData={rekamMedisDetails} />
  )
}

export default RekamMedisDetails
