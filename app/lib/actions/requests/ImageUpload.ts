'use server'
import { cookies } from "next/headers";
import { apiURL } from "../../definitions";
import { checkIsloggedIn } from "../../authChecks";


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
  try {
  const formData = new FormData();
  formData.append("image", image);
  const response = await fetch(`${apiURL}/image/upload`, {
    method: "POST",
    body: formData,
    headers:{
      'Authorization': `Bearer ${token}`
    }
  });

  const {success, message, url} : UploadResponse = await response.json()


  return {success, message, url}
  } catch {
    return{
      success: false,
      message: 'An error occured while trying to upload the image',
      url:''
    }
  }
}