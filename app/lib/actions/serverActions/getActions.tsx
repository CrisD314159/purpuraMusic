'use server'

import { cookies } from "next/headers"
import { apiURL, isNullOrEmpty } from "../../definitions"


export async function GetUserFavorites(offset:number, limit:number)
{
  try {
    const token = (await cookies()).get('token')?.value
    const response = await fetch(`${apiURL}/library/user/songs?offset=${offset}&limit=${limit}`, {
      headers:{
        'Authorization': `Bearer ${token}`
      }
    })

    if(response.status === 200){
      const songs = await response.json()
      return songs
    }


    throw new Error("An error occured while fetching your songs")
    
  } catch (error) {
    throw error
    
  }
}
export async function GetUserSearchResults(search:string)
{
  if(isNullOrEmpty(search)) return
  try {
    const token = (await cookies()).get('token')?.value
    const response = await fetch(`${apiURL}/search/input?search=${search}`, {
      headers:{
        'Authorization': `Bearer ${token}`
      }
    })
    
    if(response.status === 200){
      const songs = await response.json()
      return songs
    }

    throw new Error("An error occured while fetching your songs")
    
  } catch (error) {
    throw error
    
  }
}
export async function GetPlaylistSongs(id:string)
{
  if(isNullOrEmpty(id)) return
  try {
    const token = (await cookies()).get('token')?.value
    const response = await fetch(`${apiURL}/playlist/${id}`, {
      headers:{
        'Authorization': `Bearer ${token}`
      }
    })
    
    if(response.status === 200){
      const songs = await response.json()
      return songs
    }

    throw new Error("An error occured while fetching your songs")
    
  } catch (error) {
    throw error
    
  }
}


