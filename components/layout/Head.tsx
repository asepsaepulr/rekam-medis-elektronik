"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '../ui/button'

function Head() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div className='flex justify-between items-center p-2'>
      {/* Nav left */}
      <div>
        {pathname !== "/" && (
          <Link href="/" className="flex items-center gap-3 font-bold text-2xl">
            Cooking with Clerk
          </Link>
        )}
      </div>
      <div className="flex gap-3">
          <Button size="sm" className='rounded-full' onClick={() => router.push('/sign-in')}>
            Sign in
          </Button>
          <Button size="sm" className="rounded-full" onClick={() => router.push('/sign-up')}>
            Sign up
          </Button>
      </div>
    </div>
  )
}

export default Head
