'use server'

import { cookies } from "next/headers"
import { ApiGeneralResponse, apiURL, CreatePlayListFormSchema, EditAccountFormSchema, EditAccountFormState, FormState } from "../../definitions"
import { EditAccountFetch, UpdatePlaylistRequest } from "../requests/putApiRequests"
import { checkIsloggedIn } from "../../authChecks"

export async function EditAccount(state: EditAccountFormState, formdata: FormData){
  const formVaildation = EditAccountFormSchema.safeParse({
    firstname: formdata.get('firstname'),
    surname: formdata.get('surname'),
    country: parseInt(formdata.get('country')?.toString() || 'NaN')
  })

  if(!formVaildation.success){
    return {
      success: false,
      errors: formVaildation.error.flatten().fieldErrors
    }
  }

  const {firstname, surname, country} = formVaildation.data

  const response = await EditAccountFetch(firstname, surname, country)

  if (!response) {
    return {
      success: false,
      message: 'No response from server'
    }
  }

  const {success, message} : ApiGeneralResponse = response

  if(!success){
    return {
      success:false,
      message
    }
  }else{
    return {
      success: true,
      message
    }
  }
}


export async function AddRemoveSong(songId:string){

try {
  await checkIsloggedIn()
  const token = (await cookies()).get('token')?.value
  const response = await fetch(`${apiURL}/library/addSong`, {
    method:'PUT',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body:JSON.stringify({songId})
  })

if(response.ok){
  return {
    success: true,
    message : "Song added/removed"
  }
}

throw new Error("Error updating the song")
  
} catch (error) {
  throw error;
}

}

export async function AddSongToPlaylist(songId:string, playlistId:string){

  try {
    await checkIsloggedIn()
    const token = (await cookies()).get('token')?.value
    const response = await fetch(`${apiURL}/playlist/addSong`, {
      method:'PUT',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body:JSON.stringify({songId, playlistId})
    })

  if(response.ok){
    return {
      success: true,
      message : "Song added/removed"
    }
  }

  throw new Error("Error updating the song")
    
  } catch (error) {
    throw error;
  }

}

export async function RemoveSongFromPlaylist(songId:string, playlistId:string){

  try {
    await checkIsloggedIn()
    const token = (await cookies()).get('token')?.value
    const response = await fetch(`${apiURL}/playlist/removeSong`, {
      method:'PUT',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body:JSON.stringify({songId, playlistId})
    })

    console.log(response.status);

    if(response.ok){
      return {
        success: true,
        message : "Song removed"
      }
    }

  throw new Error("Error updating the song")
    
  } catch (error) {
    throw error;
  }

}


export async function UpdatePlaylist(state:FormState, formdata: FormData  )
{
 try {
  const image = formdata.get('imageUrl') as string === '' ? undefined : formdata.get('imageUrl') as string

  const id = formdata.get('id')?.toString()
  if(!id) return

  const validation = CreatePlayListFormSchema.safeParse({
    imageUrl : image,
    name : formdata.get('name'),
    description: formdata.get('description')
  })

  if(!validation.success){
    return{
      success:false,
      errors: validation.error.flatten().fieldErrors
    }
  }

  const {imageUrl, name, description} = validation.data

  const response = await UpdatePlaylistRequest(imageUrl, id, name, description)

  const {success, message} : ApiGeneralResponse = response

  return {
    success,
    message
  }

 } catch {
  return {
    success:false,
    message: 'An error occured while trying to create the playlist'
  } 
 }

}