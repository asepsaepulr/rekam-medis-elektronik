"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'

function Header() {
    const Menu=[
        {
            id:1,
            name:'Home',
            path:'/'
        },
        {
            id:2,
            name:'Explore',
            path:'/explore'
        },
        {
            id:3,
            name:'Contact Us',
            path:'/'
        },
    ]

    const { user } = "";

    useEffect(()=>{
        console.log(user);
    },[user])
  return (
      <div className='flex items-center
    justify-between shadow-sm'>
          <div className='flex pl-3 pt-1 items-center'>
              <Image src='/image/logo.png' alt='logo'
                     width={210} height={80}
              />
              <ul className='md:flex gap-8 hidden'>
                  {Menu.map((item, index) => (
                      <Link href={item.path} key={index}>
                          <li className='hover:text-primary
                    cursor-pointer hover:scale-105
                    transition-all ease-in-out'>{item.name}</li>
                      </Link>
                  ))}
              </ul>
          </div>

          <div className='flex pl-3 pt-1 items-center'>
              <ul className='md:flex gap-8 hidden'>
                  <Link size="sm" className='rounded-full' href="/sign-in">
                      Sign in
                  </Link>
                  <Link size="sm" className="rounded-full" href="/sign-up">
                      Sign up
                  </Link>
              </ul>
          </div>
      </div>
)
}

export default Header
