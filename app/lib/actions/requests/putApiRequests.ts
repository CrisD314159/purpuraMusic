'use server'
import { cookies } from "next/headers"
import { apiURL } from "../../definitions"
import { checkIsloggedIn } from "../../authChecks"

export async function EditAccountFetch(firstname:string, surname:string, country:number){
  await checkIsloggedIn()
  const token = (await cookies()).get('token')?.value
  try {
    const response = await fetch(`${apiURL}/user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({firstname, surname, country})
    })
  
    if(response.status === 200){
      return {
        success: true,
        message: 'Account edited successfully'
      }
    }
    if(response.status === 401) return null

  } catch  {
    return {
      success: false,
      message: "An error occurred while trying to edit your account"
    }
  }
}


export async function UpdatePlaylistRequest(imageUrl:string | undefined, id:string, name:string, description:string | undefined){
  try {
    await checkIsloggedIn()
    const token = (await cookies()).get('token')?.value
    const response = await fetch(`${apiURL}/playlist`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`  
      },
      body: JSON.stringify({imageUrl, name, id, description})
    })

    if(response.status === 200){
      return {
        success: true,
        message: 'Playlist updated successfully'
      }
    }

    throw new Error('An error occurred while trying to update the playlist')
    
  } catch (error) {
    throw error;
  }
}