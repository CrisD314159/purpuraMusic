'use server'
import { cookies } from "next/headers";
import { apiURL } from "../definitions/definitions";
import { checkIsloggedIn } from "../auth/authChecks";


export interface UploadResponse {
  success: boolean;
  message: string;
  url: string;
}

export async function ImageUpload(image:File | null){
  await checkIsloggedIn()
  const token = (await cookies()).get('token')?.value

  if(!image){
    return
  }

  const formData = new FormData();
  formData.append("file", image);

  let response : Response

  try {
    response = await fetch(`${apiURL}/mediaUpload/image`, {
      method: "POST",
      body: formData,
      headers:{
        'Authorization': `Bearer ${token}`
      }
    });
  } catch {
    throw new Error("An error occurred while connecting to server")    
  }

  console.log(response.status);
  if(response.status === 200){
    const {url} = await response.json()
    return url
  }else{
    const {message} = await response.json()
    throw new Error(message)
  }
}