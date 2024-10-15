'use client'

import React, { useState } from 'react'
import { TableCell, TableRow, } from "@/components/ui/table"
import {sendEmailActivation, setBetaStatus, setRole} from './actions'
import { Switch } from "@/components/base/Switch"
import clerkFormatDate from "../../../utils/clerkFormatDate";
import { CONFIG as MAIL_CONFIG, sendMail } from '@/lib/mail';



type Props = {
  name: string
  id: string
  emailAddress?: string
  metadata?: UserPublicMetadata
  lastActiveAt:number
  createdAt:number
  updatedAt: number
}

function UserRow({ name, id, metadata, emailAddress, lastActiveAt, createdAt, updatedAt }: Props) {
  const [isBetaUser, setIsBetaUser] = useState(metadata?.isBetaUser || false)

  async function onToggleBetaStatus() {
    try {
      await setBetaStatus(id, !isBetaUser)
      setIsBetaUser(!isBetaUser)
      sendEmailActivation(name, emailAddress || "");
    } catch(err) {
      console.error(err)
    }
  }

  return (
    <TableRow>
      <TableCell className='flex flex-col'>
        <span>{name}</span>
      </TableCell>
      <TableCell>{emailAddress}</TableCell>
      <TableCell>{metadata?.role != null? metadata?.role : ""}</TableCell>
      <TableCell>
        <form action={setRole}>
          <input type="hidden" value={id} name="id"/>
          <input type="hidden" value="dokter" name="role"/>
          <button type="submit">Make Doctor</button>
        </form>

        <form action={setRole}>
          <input type="hidden" value={id} name="id"/>
          <input type="hidden" value="pasien" name="role"/>
          <button type="submit">Make Pasien</button>
        </form>
      </TableCell>
      <TableCell className="text-right">
        <Switch
          onCheckedChange={onToggleBetaStatus}
          checked={isBetaUser}
          aria-readonly/>
      </TableCell>
      <TableCell>{clerkFormatDate(lastActiveAt)}</TableCell>
      <TableCell>{clerkFormatDate(createdAt)}</TableCell>
      <TableCell>{clerkFormatDate(updatedAt)}</TableCell>
    </TableRow>
  )
}

export default UserRow
