import { cookies } from "next/headers";
import { apiURL } from "../../definitions";

export async function LogoutRequest(){
  try {
    const refresh = (await cookies()).get('refreshToken')?.value
    const response = await fetch(`${apiURL}/auth/logout`,
      {
        method: 'DELETE',
        headers:{
          'Authorization': `Bearer ${refresh}`
        }
      }
    )

    if(response.status === 400){
      return false
    }
    return true
  } catch {
    return false
    
  }
}