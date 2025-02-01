'use server'
import { cookies } from "next/headers"
import { apiURL } from "../../definitions"

export async function EditAccountFetch(firstname:string, surname:string, country:number){
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