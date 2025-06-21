'use server'

import { cookies } from "next/headers"
import {apiURL, EditAccountFormState, FormState } from "../definitions/definitions"
import { checkIsloggedIn } from "../auth/authChecks"
import {  EditAccountFormSchema, UpdatePlayListFormSchema } from "@/lib/zodSchemas/zodSchemas"

export async function EditAccount(state: EditAccountFormState, formdata: FormData){

  await checkIsloggedIn()
  const token = (await cookies()).get('token')?.value

  const formVaildation = EditAccountFormSchema.safeParse({
    name: formdata.get('name') 
  })

  if(!formVaildation.success){
    return {
      success: false,
      errors: formVaildation.error.flatten().fieldErrors
    }
  }

  const {name} = formVaildation.data

  let response : Response

  try {
    response = await fetch(`${apiURL}/user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({name})
    })
    
  } catch {
    return {
      success: false,
      message: 'An error occurred while trying to connect to server'
    }
  }

  if(response.status === 200){
    return {
      success: true,
      message:"Account updated"
    }
  }else{
    const {message} = await response.json()
    return {
      success: false,
      message: message
    }
  }
}


export async function AddRemoveSong(songId:string){
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
  if(response.status === 200){
    return {
      success: true,
      message : "Done"
    }
  }else{
    const {message} = await response.json()
    throw new Error(message)
  }


}

export async function AddSongToPlaylist(songId:string, playlistId:string){

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
  if(response.status === 200){
    return {
      success: true,
      message : "Song added"
    }
  }else{
    const {message} = await response.json()
    throw new Error(message)
  }
}

export async function RemoveSongFromPlaylist(songId:string, playlistId:string){
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


  if(response.status === 200){
    return {
      success: true,
      message : "Song removed"
    }
  } else{
    const {message} = await response.json()
    throw new Error(message)
  }
}


export async function UpdatePlaylist(state:FormState, formdata: FormData  )
{
  await checkIsloggedIn()
  const token = (await cookies()).get('token')?.value
  const image = formdata.get('imageUrl') as string === '' ? undefined : formdata.get('imageUrl') as string

  const validation = UpdatePlayListFormSchema.safeParse({
    id: formdata.get('id'),
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

  const {id, imageUrl, name, description} = validation.data

  let response : Response

  try {

    response = await fetch(`${apiURL}/playlist`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`  
      },
      body: JSON.stringify({imageUrl, name, id, description})
    })
    
  } catch {
    return {
      success: false,
      message: 'An error occurred while trying to connect to server'
    }
  }

  if(response.status === 200){
    return {
      success: true,
      message: "Playlist updated successfully"
    }
  }else{
    const {message} = await response.json()
    return {
      success: true,
      message
    }

  }

}