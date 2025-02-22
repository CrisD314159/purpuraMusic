'use server'

import { cookies } from "next/headers"
import { ApiGeneralResponse, apiURL, CreatePlayListFormSchema, FormState, isNullOrEmpty } from "../../definitions"
import { CreatePlaylistRequest } from "../requests/postApiRequests"
import { checkIsloggedIn } from "../../authChecks"


export async function CreatePlaylist(state:FormState, formdata: FormData  )
{
 try {
  const image = formdata.get('imageUrl') as string === '' ? undefined : formdata.get('imageUrl') as string
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

  const response = await CreatePlaylistRequest(imageUrl, name, description)

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


export async function AddPlay(songId:string){
  try {
    await checkIsloggedIn()
    const token = (await cookies()).get('token')?.value
    if(isNullOrEmpty(token)) return false
    const response = await fetch(`${apiURL}/song/addPlay`, {
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body:JSON.stringify({songId})
    })

    if(response.status === 200){
      return true
    }

    throw new Error("Error")
    
  } catch  {
    return true
  }

}