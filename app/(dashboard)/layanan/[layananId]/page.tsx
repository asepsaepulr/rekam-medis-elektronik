"use client"

import { useEffect, useState } from "react"

import Loader from "@/components/custom ui/Loader"
import LayananForm from "@/features/layanan/LayananForm"
import {LayananType} from "@/lib/types";

const LayananDetails = ({ params }: { params: { layananId: string }}) => {
  const [loading, setLoading] = useState(true)
  const [layananDetails, setLayananDetails] = useState<LayananType | null>(null)

  const getLayananDetails = async () => {
    try {
      const res = await fetch(`/api/layanans/${params.layananId}`, {
        method: "GET"
      })
      const data = await res.json()
      setLayananDetails(data)
      setLoading(false)
    } catch (err) {
      console.log("[layananId_GET]", err)
    }
  }

  useEffect(() => {
    getLayananDetails()
  }, [])

  return loading ? <Loader /> : (
    <LayananForm initialData={layananDetails}/>
  )
}

export default LayananDetails
