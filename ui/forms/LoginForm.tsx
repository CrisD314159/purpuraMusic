'use client'
import { Alert, Button, TextField } from "@mui/material";
import {Login} from "@/lib/auth/Auth";
import Image from "next/image";
import { startTransition, useActionState } from "react";
import Link from "next/link";

export default function LoginForm(){
  const [state, action, pending] = useActionState(Login, undefined)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => { 
     event.preventDefault(); // Previene el comportamiento predeterminado del formulario
        const formData = new FormData(event.currentTarget); // Captura los datos del formulario
        // Envía los datos al servidor dentro de `startTransition`
        startTransition(() => {
          action(formData);
        });
  }
 
  return (
    
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-full py-4 loginform">
       <div className="flex flex-col items-center justify-center">
        {state?.message &&  <Alert severity="warning">{state.message}</Alert>}
      </div>
      <div>
        <Image src="/purpura-entire-logo.png" alt="logo" width={250} height={250} />
        
      </div>

      <div className="flex flex-col items-center justify-center space-y-2">
        <TextField required label="Email" type="email" color="secondary" name="email" variant="outlined" error={!!state?.errors?.email} helperText={state?.errors?.email && <p>{state.errors.email}</p>}/>
       
      </div>

      <div className="flex flex-col items-center justify-center mt-5 mb-12">
      <TextField
          label="Password"
          required
          type="password"
          name="password"
          autoComplete="current-password"
          variant="outlined"
          color="secondary"
          helperText={state?.errors?.password && <p>{state.errors.password}</p>}
          error={!!state?.errors?.password}
        />
          <Link href="/recoverAccount" className="text-violet-600 text-sm hover:text-pink-400" color="primary">Forgot your password?</Link>
      </div>
      
      <div className="flex flex-col items-center justify-center space-y-7 w-[80%]">

          <Button disabled={pending} sx={{width:'10%'}} type="submit" variant="outlined" color="primary">Login</Button>
          <Button LinkComponent={Link} sx={{width:'10%'}} href="/signup" variant="outlined" color="info">Signup</Button>
          <Button LinkComponent={Link} href="/dashboard" variant="text" color="warning">Continue without an account</Button>
   
      </div>

     
     
    </form>
    

  )
}