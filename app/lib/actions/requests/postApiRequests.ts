
import { apiURL } from "../../definitions"




export async function LoginFetch(email:string, password:string){
  try {
    const response = await fetch(`${apiURL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })

    console.log(response.status);
    if(response.status === 401) {
      return {
        success: false,
        message: '401'
      }
    }
    if(response.status === 404) {
      return {
        success: false,
        message: 'User not found'
      }
    }
    
    const data = await response.json()
    return {
      ...data,
      success: true,
      message: 'Login successful'
    }
  } catch {
    return {
      success: false,
      message: 'An error occured while trying to log in'
    }
  }


}


export async function SignUpFetch(email:string, password:string, firstname:string, surname:string, country:number){
  try {
    const response = await fetch(`${apiURL}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password, firstname, surname, country})
    })
  
    if(response.status === 201){
      return {
        success: true,
        message: 'Sign up successful'
      }
    }
    else {
      throw new Error('An error occured while trying to sign up')
    }
  } catch {
    return {
      success: false,
      message: 'An error occured while trying to sign up'
    }
  }
}