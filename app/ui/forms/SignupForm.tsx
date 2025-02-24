'use client'
import { Alert, Button, TextField } from "@mui/material";
import {SignUp} from "@/app/lib/actions/serverActions/auth";
import Image from "next/image";
import { startTransition, useActionState, useState } from "react";
import CountrySelect from "../Selects/CountrySelect";

export default function SignupForm(){
  const [state, action, pending] = useActionState(SignUp, undefined)
  const [country, setCountry] = useState(1)
  console.log(country);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Previene el comportamiento predeterminado del formulario
    const formData = new FormData(event.currentTarget); // Captura los datos del formulario
    
    // Añadir el país seleccionado manualmente (opcional si no está ya conectado)
    formData.set("country", String(country));

    // Envía los datos al servidor dentro de `startTransition`
    startTransition(() => {
      action(formData);
    });
  };
 
  return (
    
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-full py-4 loginform">
      <TextField sx={{display:'none'}} required value={country} name="country"/>
       <div className="flex flex-col items-center justify-center">
        {state?.message &&  <Alert severity="warning">{state.message}</Alert>}
      </div>
      <div>
        <Image src="/purpura-entire-logo.png" alt="logo" width={250} height={250} />
      </div>

      <div>
        <h1 className="text-2xl mb-7 text-center font-light">Sign Up to Púrpura Music</h1>
      </div>


     
      <div className="flex  items-center justify-center space-x-4 w-4/5">
        <TextField required label="First Name" type="text" color="secondary" slotProps={{htmlInput:{maxLength:20, minLength:2}}} name="firstname" variant="outlined" error={!!state?.errors?.firstname} helperText={state?.errors?.email && <p>{state.errors.email}</p>}/>

        <TextField required label="Sur Name" type="text" color="secondary" name="surname" variant="outlined" slotProps={{htmlInput:{maxLength:20, minLength:2}}}  error={!!state?.errors?.surname} helperText={state?.errors?.email && <p>{state.errors.email}</p>}/>
       
        
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
           
        
        <CountrySelect setCountry={setCountry} defaultValue={country}/>



      
      <div>
        <Button disabled={pending} type="submit" variant="outlined" color="info">Sign Up</Button>
      </div>

     
     
    </form>
    

  )
}