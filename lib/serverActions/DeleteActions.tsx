'use server'
import { cookies } from "next/headers"
import { checkIsloggedIn } from "../auth/authChecks"
import { apiURL } from "../definitions/definitions"

export async function DeletePlaylist(id:string)
{
    await checkIsloggedIn()
    const token = (await cookies()).get('token')?.value 
    const response = await fetch(`${apiURL}/playlist`, {
      method:'DELETE',
      headers:{
        'Authorization': `Bearer ${token}`,
        'Content-Type':'application/json'
      },
      body:JSON.stringify({id})
    })


    if(response.status === 200){
      return {
        success:true,
        message:'Playlist deleted successfully'
      }
    } else{
      const {message} = await response.json()
      throw new Error(message)
    }

}