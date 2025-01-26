'use server'
import { apiURL } from "@/app/lib/definitions";



export async function GetCountries(){
  try {
    const response = await fetch(`${apiURL}/country/getAll`)
    const data = await response.json()
    return data
  } catch (error) {
    throw  error 
  }

}