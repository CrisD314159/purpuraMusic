'use server'
import { redirect } from "next/navigation";
import { LoginFetch, SignUpFetch } from "../requests/postApiRequests";
import { ApiGeneralResponse, ApiLoginResponse, apiURL, FormState, LoginFormSchema, SignUpFormSchema, SignUpFormState } from "../../definitions";
import { createSession, deleteSession } from "../../session";
import { LogoutRequest } from "../requests/deleteRequests";


export async function Login(state:FormState, formdata: FormData){
  const formValidation = LoginFormSchema.safeParse({
    email: formdata.get('email'),
    password: formdata.get('password')
  })

  if(!formValidation.success){
    return {
      errors: formValidation.error.flatten().fieldErrors
    }
  }

  const {email, password} = formValidation.data

  const response = await LoginFetch(email, password)

  const {success, message, token, refreshToken} : ApiLoginResponse = response

  if(message === '401'){
    redirect('/verifyAccount')
  }

  if(!success){
    return {
      message
    }
  }
  await createSession(token, refreshToken)

  redirect('/dashboard/home')
 


}

export  async function SignUp(state:SignUpFormState, formdata: FormData){
  const formValidation = SignUpFormSchema.safeParse({
    firstname: formdata.get('firstname'),
    country: parseInt(formdata.get('country')?.toString() || 'NaN'),
    surname: formdata.get('surname'),
    email: formdata.get('email'),
    password: formdata.get('password')
  })

  if(!formValidation.success){
    return {
      errors: formValidation.error.flatten().fieldErrors
    }
  }

  const {email, password, country, firstname, surname} = formValidation.data

  const response = await SignUpFetch(email, password, firstname, surname, country)

  const {success, message} : ApiGeneralResponse = response

  if(!success){
    return {
      message
    }
  }
  redirect('/')

}

export async function VerifyAccount(state: FormState, formdata: FormData){
  try {
    const email = formdata.get('email')
    const code = formdata.get('code')

    if(!email || !code) throw new Error('Invalid form data')

    const response = await fetch(`${apiURL}/user/verifyAccount`, {
      method: 'PUT',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, code})
    })
    if(response.ok)
    {
      return {
        success:true    
      }
      
    }else{
      const {message} = await response.json()
      return {
        message
      }
     
    }
  } catch {
    return {
      message:"An error occurred while trying to verify your account"
    }  
  }
}

export async function Logout() {
  const response = await LogoutRequest()
  if(response){
    deleteSession()
    redirect('/')
  }
}





