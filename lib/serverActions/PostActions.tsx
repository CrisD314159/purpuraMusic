'use server'

import { cookies } from "next/headers"
import { apiURL, FormState } from "../definitions/definitions"
import { checkIsloggedIn } from "../auth/authChecks"
import { CreatePlayListFormSchema } from "@/lib/zodSchemas/zodSchemas"


export async function CreatePlaylist(state:FormState, formdata: FormData  )
{
  await checkIsloggedIn()
  const token = (await cookies()).get('token')?.value
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

  let response : Response

  try {

    response = await fetch(`${apiURL}/playlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`  
      },
      body: JSON.stringify({imageUrl, name, description})
    })
    
  } catch  {
    return {
      success:false,
      message: "An error occurred while trying to connect server"
    }
    
  }

  if(response.status == 201){
    return {
      success: true,
      message: "Playlist Created"
    }
  }else{
    const {message} = await response.json()
    return {
      success: false,
      message: message
    }

  }

}


export async function AddPlay(songId:string){
    await checkIsloggedIn()
    const token = (await cookies()).get('token')?.value
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
    } else{
      return false
    }
}