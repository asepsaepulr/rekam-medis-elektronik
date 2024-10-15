import React from 'react'
import {SignedOut} from "@clerk/nextjs";
import Link from "next/link";
import {Button} from "@/components/ui/button";

function Waitlist() {
  return (
    <div>
      <div className="lg:py-24">
        <h2 className="ml-36 text-4xl font-bold sm:text-4xl">
          Youre on the waitlist
          <span className='text-primary'>  </span>
          Youll be notified when youve been accepted to test out UTAMA Klinik.
          <span className='text-primary '> </span></h2>
      </div>
      <div className="flex gap-3">
          <SignedOut>
              <Button size="sm" className='rounded-full'>
                  <Link href="/sign-in">
                      Login
                  </Link>
              </Button>
              <Button size="sm" className="rounded-full">
                  <Link href="/sign-up">
                      Join the waitlist!
                  </Link>
              </Button>
          </SignedOut>
      </div>
  </div>
)
}

export default Waitlist
