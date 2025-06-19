'use client'
import { Button, TextField } from "@mui/material";
import { startTransition, useActionState, useEffect, useState } from "react";
import { EditAccount } from "@/lib/serverActions/PutActions";
import AppSnackBar from "../Snackbars/AppSnackBar";


interface EditAccountProps{
  name:string,
  setReload: (value:boolean) => void
}

export default function EditAccountForm({name, setReload}:EditAccountProps) {
  const [state, action, pending] = useActionState(EditAccount, undefined)
  const [snackbar, setSnackBar] = useState(false)
  const [snackbarMessage, setSnackBarMessage] = useState('')
  const [snackbarType, setSnackBarType] = useState<'error' | 'success'>('error')

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
      setReload(true)
      setSnackBar(true)
      setSnackBarMessage(state.message)
      setSnackBarType('success')
    }else if (state?.success === false){
      setSnackBar(true)
      setSnackBarMessage(state.message)
      setSnackBarType('error')
    }
  }, [state, setReload])
 
  return (
    
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-full gap-5">
      <AppSnackBar message={snackbarMessage} open={snackbar} setOpen={setSnackBar} type={snackbarType}/>
      <div>
        <h1 className="text-xl mb-7 text-center font-light">Change your data</h1>
      </div>
      <div className="flex flex-col  items-center justify-center space-y-4">
        <TextField required defaultValue={name} label="Username" type="text" color="secondary" 
        slotProps={{htmlInput:{maxLength:20, minLength:2}}} name="name" variant="outlined"
        onKeyDown={(e)=> {
          if(e.key === ' ') e.preventDefault()
        }}
        />
      </div>
          
      <div>
        <Button disabled={pending} type="submit" variant="contained" color="info">Submit</Button>
      </div>

     
     
    </form>
    

  )
}

