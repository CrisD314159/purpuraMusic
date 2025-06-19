'use client'
import { Button, TextField } from "@mui/material";
import {SignUp} from "@/lib/auth/Auth";
import Image from "next/image";
import { startTransition, useActionState, useEffect, useState } from "react";
import AppSnackBar from "../Snackbars/AppSnackBar";

export default function SignupForm(){
  const [state, action, pending] = useActionState(SignUp, undefined)
  const [snackbar, setSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarType, setSnackbarType] = useState<'error' | 'success'>('error')
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Previene el comportamiento predeterminado del formulario
    const formData = new FormData(event.currentTarget); // Captura los datos del formulario
    

    // Envía los datos al servidor dentro de `startTransition`
    startTransition(() => {
      action(formData);
    });
  };

  useEffect(()=>{
    if(state?.success){
      setSnackbar(true)
      setSnackbarMessage(state.message)
      setSnackbarType('success')
    } else if(state?.success === false){
      setSnackbar(true)
      setSnackbarMessage(state.message)
      setSnackbarType('error')
    }
  }, [state])

 
  return (
    
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-full py-4 loginform">
       <div className="flex flex-col items-center justify-center">
      <AppSnackBar message={snackbarMessage} open={snackbar} setOpen={setSnackbar} type={snackbarType} />
      </div>
      <div>
        <Image src="/purpura-entire-logo.png" alt="logo" width={250} height={250} />
      </div>

      <div>
        <h1 className="text-2xl mb-7 text-center font-light">Sign Up to Púrpura Music</h1>
      </div>


     
      <div className="flex  items-center justify-center space-x-4 w-4/5">
        <TextField required label="Username" type="text" color="secondary" slotProps={{htmlInput:{maxLength:20, minLength:2}}} name="firstname" 
        variant="outlined" error={!!state?.errors?.name}
         helperText={state?.errors?.email && <p>{state.errors.email}</p>}
        onKeyDown={(e)=> {
          if(e.key === ' ') e.preventDefault()
        }}
         /> 
      </div>

      <div className="flex  items-center justify-center mt-10 mb-12 space-x-4 w-4/5">
          <TextField required label="Email" type="email" color="secondary" name="email" variant="outlined" error={!!state?.errors?.email} helperText={state?.errors?.email && <p>{state.errors.email}</p>}/>
        
        
        <TextField
            label="Password"
            required
            type="password"
            name="password"
            slotProps={{htmlInput:{minLength:8}}} 
            autoComplete="current-password"
            variant="outlined"
            color="secondary"
            helperText={state?.errors?.password && <strong>At least un Upper case <br></br> At least un special char an one number</strong>}
            error={!!state?.errors?.password}
          />
      </div>
          

      
      <div>
        <Button disabled={pending} type="submit" variant="outlined" color="info">Sign Up</Button>
      </div>

     
     
    </form>
    

  )
}