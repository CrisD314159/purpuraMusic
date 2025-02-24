'use server'
import { cookies } from "next/headers"
import { checkIsloggedIn } from "../../authChecks"
import { apiURL } from "../../definitions"

export async function DeletePlaylist(id:string)
{
  try {
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
    }

    throw new Error("An error occured while deleting the playlist")
    
  } catch (error) {
    throw error
    
  }
}