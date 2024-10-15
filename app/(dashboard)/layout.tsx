import type { Metadata } from "next";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Layout from '@/components/layout/Layout';

import { ToasterProvider } from "@/lib/ToasterProvider";

export const metadata: Metadata = {
  title: "UTAMA Klinik - Admin",
  description: "Admin dashboard to manage Utama Klinik data",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider signInFallbackRedirectUrl="/dashboard" signUpFallbackRedirectUrl="/dashboard">
      <Layout>
          <ToasterProvider />
            {children}
      </Layout>
    </ClerkProvider>
  );
}
