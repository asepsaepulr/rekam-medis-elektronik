import React from "react";
import Hero from "@/components/layout/ClientLayout/Hero"
import Header from "@/components/layout/ClientLayout/Header"
import { SignOutButton } from '@clerk/nextjs'

export default function Home() {
  return (
    <div>
      <Header/>

      <Hero/>
    </div>
  );
}
