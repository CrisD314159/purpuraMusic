'use server'

import { ApiGeneralResponse, CreatePlayListFormSchema, FormState } from "../../definitions"
import { CreatePlaylistRequest } from "../requests/postApiRequests"


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