'use server'
import { apiURL } from "@/app/lib/definitions";
import { cookies } from "next/headers";



export async function GetCountries(){
  try {
    const response = await fetch(`${apiURL}/country/getAll`)
    const data = await response.json()
    return data
  } catch (error) {
    throw  error 
  }

}

export async function GetUserAccount(){
  try {
    const token = (await cookies()).get('token')?.value
    const response = await fetch(`${apiURL}/user/getProfile`, {
      method: 'GET',
      headers:{
        'Authorization': `Bearer ${token}`
      }
    })

    if (response.status === 401) {
      return null
    }
    const userData = await response.json()
    return userData

  } catch (error) {
    throw error 
  }
}