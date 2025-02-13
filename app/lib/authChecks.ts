'use server'
import { cookies } from "next/headers";
import { apiURL } from "./definitions";
import { createSession} from "./session";


export async function checkIsloggedIn() {
  try {
    const token = (await cookies()).get('token')?.value
    const refresh = (await cookies()).get('refresh')?.value
    if(!token && refresh){
      return await refreshToken()
    }
  const response = await fetch(`${apiURL}/api/auth/checkToken`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  if(response.status === 401){
    return await refreshToken()
  }

  return true
  } catch {
    return false
  }

}

async function refreshToken(){
  try {
    const currentRefreshToken = (await cookies()).get('refresh')?.value
    if(!currentRefreshToken) return false

    const response = await fetch(`${apiURL}/api/auth/refresh/token`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${currentRefreshToken}`
      }
    })

    const {success, token, refreshToken} = await response.json()

    
    if(!success){
      return false
    }
    if(refreshToken){
      await createSession(token, refreshToken)
    }

    await createSession(token, currentRefreshToken)

    return true
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error(String(error));
    }  
  }
  
}