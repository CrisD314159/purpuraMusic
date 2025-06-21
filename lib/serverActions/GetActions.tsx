'use server'

import { cookies } from "next/headers"
import { apiURL, isNullOrEmpty } from "../definitions/definitions"
import { checkIsloggedIn } from "../auth/authChecks"


export async function GetUserFavorites(offset:number, limit:number)
{
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
    } else {
      const {message} = await response.json()
      throw new Error(message)
    }
}


export async function GetUserSearchResults(search:string)
{
  await checkIsloggedIn()
  if(isNullOrEmpty(search)) return

    const token = (await cookies()).get('token')?.value
    const response = await fetch(`${apiURL}/search/input?search=${search}`, {
      headers:{
        'Authorization': `Bearer ${token}`
      }
    })

    if(response.status === 200){
      const songs = await response.json()
      return songs
    }else{
      const {message} = await response.json()
      throw new Error(message)
    }
}


export async function GetPlaylistSongs(id:string)
{
  await checkIsloggedIn()
  const token = (await cookies()).get('token')?.value
  const response = await fetch(`${apiURL}/playlist/${id}`, {
    headers:{
      'Authorization': `Bearer ${token}`
    }
  })
  
  if(response.status === 200){
    const songs = await response.json()
    return songs
  }else{
    const {message} = await response.json()
    throw new Error(message)
  }

}

export async function GetArtistPage(id:string)
{
  await checkIsloggedIn()
  const token = (await cookies()).get('token')?.value
  const response = await fetch(`${apiURL}/artist/getArtistProfile/${id}`,
    {
      method:'GET',
      headers:{
        "Authorization": `Bearer ${token}`
      },
      cache: "no-store"
    }
  )
  
  if(response.status === 200){
    const artist = await response.json()
    return artist
  } else {
    const {message} = await response.json()
    throw new Error(message)
  }

    
}

export async function GetAlbumPage(id:string)
{
  await checkIsloggedIn()
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
  } else{
    const {message} = await response.json()
    throw new Error(message)
  }
}
export async function GetTopAlbums()
{
  const response = await fetch(`${apiURL}/album/getTopAlbums`)
  
  if(response.status === 200){
    const albums = await response.json()
    return albums
  }else{
    const {message} = await response.json()
    throw new Error(message)
  }
}

export async function GetTopArtists()
{
  const response = await fetch(`${apiURL}/artist/getMostListenArtists?offset=0&limit=10`)
  
  if(response.status === 200){
    const artists = await response.json()
    return artists
  }else{
    const {message} = await response.json()
    throw new Error(message)
  }
}


export async function GetTopSongs()
{
  await checkIsloggedIn()
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
  }else{
    const {message} = await response.json()
    throw new Error(message)
  }
}

export async function GetPurpleDaylist()
{
    await checkIsloggedIn()
    const token = (await cookies()).get('token')?.value 
    const response = await fetch(`${apiURL}/purpleDaylist`, {
      headers:{
        'Authorization': `Bearer ${token}`
      }
    })
    
    if(response.status === 200){
      const playlist = await response.json()
      return playlist
    }else{
      const {message} = await response.json()
      throw new Error(message)
    }  
}

export async function GetUserPlaylists()
{
  await checkIsloggedIn()
  const token = (await cookies()).get('token')?.value 
  const response = await fetch(`${apiURL}/playlist/getPlaylists/user`, {
    method:'GET',
    headers:{
      'Authorization': `Bearer ${token}`
    }
  })

  if(response.status === 200)
  {
    const playlists = await response.json()
    return playlists
  }else{
    const {message} = await response.json()
    throw new Error(message)
  }
}

export async function GetUserProfile() {

  await checkIsloggedIn()
  const token = (await cookies()).get('token')?.value
  const response = await fetch(`${apiURL}/user`,
    {
      method:'GET',
      headers:{
        'Authorization':`Bearer ${token}`
      }
    }
  )

  if(response.status === 200){
    const user = await response.json()
    return user
  }else {
    const {message} = await response.json()
    throw new Error (message)
  } 
}

export async function GetAllGenres() {

  await checkIsloggedIn()
  const token = (await cookies()).get('token')?.value
  const response = await fetch(`${apiURL}/genre`,
    {
      method:'GET',
      headers:{
        'Authorization':`Bearer ${token}`
      }
    }
  )

  if(response.status === 200){
    const genres = await response.json()
    return genres
  }else {
    const {message} = await response.json()
    throw new Error (message)
  } 
}

export async function GetTopSongsByGenre(id:string) {

  await checkIsloggedIn()
  const token = (await cookies()).get('token')?.value
  const response = await fetch(`${apiURL}/genre/getTopSongs/${id}`,
    {
      method:'GET',
      headers:{
        'Authorization':`Bearer ${token}`
      },
      cache:'no-store'
    }
  )

  if(response.status === 200){
    const genreSongs = await response.json()
    return genreSongs
  }else {
    const {message} = await response.json()
    throw new Error (message)
  } 
}


