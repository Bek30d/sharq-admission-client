'use server'

import { cookies } from 'next/headers'

export const setCookie = async(name: string, data: any) => {
  const response = await cookies().set(name, data, {maxAge: 30 * 24 * 60 * 60, path: '/'})
  return response
}