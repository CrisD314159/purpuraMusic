'use server'

import { cookies } from "next/headers"
import { ApiGeneralResponse, apiURL, EditAccountFormSchema, EditAccountFormState } from "../../definitions"
import { EditAccountFetch } from "../requests/putApiRequests"

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
  const token = (await cookies()).get('token')?.value
  const response = await fetch(`${apiURL}/library/addSong`, {
    method:'PUT',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body:JSON.stringify({songId})
  })

  console.log(response.status);
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