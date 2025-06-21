'use server'
import { redirect } from "next/navigation";
import { apiURL, FormState, SignUpFormState } from "../definitions/definitions";
import { createSession, deleteSession } from "./session";
import { ChangePasswordSchema, LoginFormSchema, SignUpFormSchema } from "../zodSchemas/zodSchemas";
import { cookies } from "next/headers";


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

  let response : Response

  try {
    response = await fetch(`${apiURL}/account/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
  } catch {
    return {
      success: false,
      message: "An error occurred while connecting to server"
    }
    
  }

  if(response.status === 401){
    redirect('/verifyAccount')
  }

  if(response.status === 200){
    const {token, refreshToken} = await response.json()
    await createSession(token, refreshToken)
    redirect('/dashboard/home')
  }else{
    const {message} = await response.json()
    return {
      success: false,
      message
    }
  }
 
}

export  async function SignUp(state:SignUpFormState, formdata: FormData){

  const formValidation = SignUpFormSchema.safeParse({
    name: formdata.get('name'),
    email: formdata.get('email'),
    password: formdata.get('password')
  })

  if(!formValidation.success){
    return {
      errors: formValidation.error.flatten().fieldErrors
    }
  }

  const {email, password, name} = formValidation.data

  let response : Response

  try {
    response = await fetch(`${apiURL}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password, name})
    })
    
  } catch {
    return {
      success: false,
      message: "An error occurred while connecting to server"
    }
  }

  if(response.status === 201){
    return {
      success:true,
      message: "Thanks for signin up, check your email for more info"
    }

  }else{
    const {message} = await response.json()
    return {
      success:true,
      message
    }
  }
}

export async function VerifyAccount(state: FormState, formdata: FormData){
    const email = formdata.get('email')
    const code = formdata.get('code')
    if(!email || !code) throw new Error('Invalid form data')

    let response :Response

    try {
      response = await fetch(`${apiURL}/user/verifyAccount`, {
        method: 'PUT',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, code})
    })
      
    } catch {
      return {
        success: false,
        message: "An error occurred while connecting to server"
      }
    }
    if(response.status === 200)
    {
      return {
        success:true,
        message:"Thanks for verify your account" 
      } 
    }else{
      const {message} = await response.json()
      return {
        success: false,
        message
      }
    }
}
export async function SendRecoverEmail(state: FormState, formdata: FormData){
    const email = formdata.get('email')?.toString()

    let response : Response

    try {
      response = await fetch(`${apiURL}/user/sendRecoverEmail`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email})
    })
      
    } catch {
      return {
        success: false,
        message: "An error occurred while connecting to server"
      }
    }

    if(response.status === 200)
    {
      return {
        success:true,
        message : "Email sent"   
      }
      
    }else{
      const {message} = await response.json()
      throw new Error(message)
    }
}
export async function ChangePassword(state: FormState, formdata: FormData){
    const verification = ChangePasswordSchema.safeParse({
      email :formdata.get('email')?.toString(),
      code :formdata.get('code')?.toString(),
      password :formdata.get('password')?.toString()
    })

    if(!verification.success){
      return {
        errors: verification.error.flatten().fieldErrors
      }
    }

    const {email, password, code} = verification.data

    let response : Response

    try {
    response = await fetch(`${apiURL}/user/changePassword`, {
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, code, password})
    })
      
    } catch {
      return {
        success: false,
        message: "An error occurred while connecting to server"
      }
      
    }
    if(response.status === 200)
    {
      return {
        success:true,
        message: "Password changed successfully"  
      }
      
    }else{
      const {message} = await response.json()
      throw new Error(message)
    }
}

export async function Logout() {
  const refresh = (await cookies()).get('refreshToken')?.value
  try {
    await fetch(`${apiURL}/auth/logout`,
        {
          method: 'DELETE',
          headers:{
            'Authorization': `Bearer ${refresh}`
          }
        }
    )
  } catch {
    deleteSession()
    redirect('/')
  }
  deleteSession()
  redirect('/')
}





