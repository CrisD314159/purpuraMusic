import 'server-only'
import { cookies } from 'next/headers'
import SessionError from './exceptions/SessionError'

export async function createSession(token: string, refreshToken: string) {
 try {
  const cookieStore = await cookies()
 
  cookieStore.set('token', token, {
    httpOnly: true,
    secure: false,
    expires:  new Date(Date.now() + 1 * 60 * 60 * 1000),// Outputs the date and time exactly 1 hour from now,
    sameSite: 'lax',
    path: '/',
  })
  cookieStore.set('refresh', refreshToken, {
    httpOnly: true,
    secure: false,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    sameSite: 'lax',
    path: '/',
  })
 } catch (error) {
  if (error instanceof Error) {
    throw new SessionError("An error occurred while trying to login you in. Please try again later.")
  }
 }
}
 
export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete('token')
  cookieStore.delete('refresh')
}