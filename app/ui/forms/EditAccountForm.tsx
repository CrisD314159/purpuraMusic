'use client'
import { Alert, Button, TextField } from "@mui/material";
import { startTransition, useActionState, useEffect, useState } from "react";
import CountrySelect from "../Selects/CountrySelect";
import { EditAccount } from "@/app/lib/actions/serverActions/putActions";

export default function EditAccountForm({initialCountry, initialFirstName, initialSurName, setReload} :
   {initialCountry: number, initialFirstName: string, initialSurName: string, setReload: React.Dispatch<React.SetStateAction<boolean>>}) {
  const [state, action, pending] = useActionState(EditAccount, undefined)
  const [country, setCountry] = useState(initialCountry ?? 0)

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

  useEffect(()=>{
    if(state?.success){
      setReload(true)
    }
  }, [state?.success, setReload])
 
  return (
    
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-full mt-16">
      <TextField sx={{display:'none'}} required value={country} name="country"/>
       <div className="flex flex-col items-center justify-center">
        {state?.success === false &&  <Alert severity="warning">{state?.message}</Alert>}
        {state?.success &&  <Alert severity="success">{state?.message}</Alert>}
      </div>
      <div>
        <h1 className="text-2xl mb-7 text-center font-light">Change your data</h1>
      </div>
      <div className="flex flex-col  items-center justify-center space-y-4">
        <TextField required defaultValue={initialFirstName ?? ""} label="First Name" type="text" color="secondary" slotProps={{htmlInput:{maxLength:20, minLength:2}}} name="firstname" variant="outlined" error={!!state?.errors?.firstname} helperText={state?.errors?.firstname && <p>{state.errors.firstname}</p>}/>

        <TextField required defaultValue={initialSurName} label="Sur Name" type="text" color="secondary" name="surname" variant="outlined" slotProps={{htmlInput:{maxLength:20, minLength:2}}}  error={!!state?.errors?.surname} helperText={state?.errors?.surname && <p>{state.errors.surname}</p>}/>
      </div>

      <div className="flex flex-col items-center justify-center mt-7">
        <CountrySelect setCountry={setCountry} defaultValue={country}/>
      </div>
          
      <div>
        <Button disabled={pending} type="submit" variant="contained" color="info">Submit</Button>
      </div>

     
     
    </form>
    

  )
}

