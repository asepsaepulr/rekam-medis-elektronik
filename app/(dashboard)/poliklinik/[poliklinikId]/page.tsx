"use client"

import { useEffect, useState } from "react"

import Loader from "@/components/custom ui/Loader"
import PoliklinikForm from "@/features/poliklinik/PoliklinikForm"
import {PoliklinikType} from "@/lib/types";

const PoliklinikDetails = ({ params }: { params: { poliklinikId: string }}) => {
  const [loading, setLoading] = useState(true)
  const [poliklinikDetails, setPoliklinikDetails] = useState<PoliklinikType | null>(null)

  const getPoliklinikDetails = async () => {
    try {
      const res = await fetch(`/api/poliklinik/${params.poliklinikId}`, {
        method: "GET"
      })
      const data = await res.json()
      setPoliklinikDetails(data)
      setLoading(false)
    } catch (err) {
      console.log("[poliklinikId_GET]", err)
    }
  }

  useEffect(() => {
    getPoliklinikDetails()
  }, [])

  return loading ? <Loader /> : (
    <PoliklinikForm initialData={poliklinikDetails}/>
  )
}

export default PoliklinikDetails
