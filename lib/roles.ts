import { Roles } from '@/lib/types'
import { auth } from '@clerk/nextjs/server'

export const checkRole = (role: Roles) => {
  const { sessionClaims } = auth()
  return sessionClaims?.metadata.role === role
}
