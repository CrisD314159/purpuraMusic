'use server'

import { cookies } from "next/headers"
import { apiURL, isNullOrEmpty } from "../../definitions"
import { checkIsloggedIn } from "../../authChecks"


export async function GetUserFavorites(offset:number, limit:number)
{
  try {
    await checkIsloggedIn()
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
  await checkIsloggedIn()
  if(isNullOrEmpty(search)) return
  try {
    const token = (await cookies()).get('token')?.value
    if(isNullOrEmpty(token)){
      const response = await fetch(`${apiURL}/search/input/public?search=${search}`)   
      if(response.status === 200){
        const songs = await response.json()
        return songs
      }
      throw new Error("An error occured while fetching your songs")
    }

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
  await checkIsloggedIn()
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

export async function GetArtistPage(id:string)
{
  await checkIsloggedIn()
  if(isNullOrEmpty(id)) return
  try {
    const token = (await cookies()).get('token')?.value
    const response = await fetch(`${apiURL}/artist/getArtistProfile/${id}`,
      {
        method:'GET',
        headers:{
          "Authorization": `Bearer ${token}`
        }
      }
    )
    
    if(response.status === 200){
      const artist = await response.json()
      return artist
    }

    throw new Error("An error occured while fetching the artist")
    
  } catch (error) {
    throw error
    
  }
}

export async function GetAlbumPage(id:string)
{
  await checkIsloggedIn()
  if(isNullOrEmpty(id)) return
  try {
    const token = (await cookies()).get('token')?.value

    const response = await fetch(`${apiURL}/album/getAlbum/${id}`,
      {
        method:'GET',
        headers:{
          "Authorization": `Bearer ${token}`
        }
      }
    )
    
    if(response.status === 200){
      const album = await response.json()
      return album
    }

    throw new Error("An error occured while fetching the album")
    
  } catch (error) {
    throw error
    
  }
}
export async function GetTopAlbums()
{
  await checkIsloggedIn()
  try {
    const response = await fetch(`${apiURL}/album/getTopAlbums`)
    
    if(response.status === 200){
      const albums = await response.json()
      return albums
    }

    throw new Error("An error occured while fetching the albums")
    
  } catch (error) {
    throw error
    
  }
}


export async function GetTopSongs()
{
  await checkIsloggedIn()
  try {
    const token = (await cookies()).get('token')?.value
    const response = await fetch(`${apiURL}/song/getTopSongs`,
      {
        method:'GET',
        headers:{
          "Authorization": `Bearer ${token}`
        }
      }
    )
    
    if(response.status === 200){
      const songs = await response.json()

      return songs
    }



    throw new Error("An error occured while fetching the songs")
    
  } catch (error) {
    throw error
    
  }
}
export async function GetPurpleDaylist()
{
  try {
    await checkIsloggedIn()
    const token = (await cookies()).get('token')?.value 
    const response = await fetch(`${apiURL}/purpleDaylist/gerPurpleDaylist`, {
      headers:{
        'Authorization': `Bearer ${token}`
      }
    })
    
    if(response.status === 200){
      const playlist = await response.json()
      return playlist
    }

    throw new Error("An error occured while fetching the purple daylist")
    
  } catch (error) {
    throw error
    
  }
}


