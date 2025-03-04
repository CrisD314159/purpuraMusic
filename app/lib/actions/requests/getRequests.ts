'use server'
import { apiURL } from "@/app/lib/definitions";
import { cookies } from "next/headers";
import { checkIsloggedIn } from "../../authChecks";



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
    await checkIsloggedIn()
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


export async function GetUserPlaylists(){
  try {
    await checkIsloggedIn()
    const token = (await cookies()).get('token')?.value
    const response = await fetch(`${apiURL}/playlist/getPlaylists/user`, {
      method: 'GET',
      headers:{
        'Authorization': `Bearer ${token}`
      }
    })

    if (response.status === 401) {
      return null
    }

    const userPlaylists = await response.json()
    return userPlaylists;
    
  } catch (error) {
    throw error
  }
}