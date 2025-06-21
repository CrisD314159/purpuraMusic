'use client'
import { Button, TextField } from "@mui/material";
import { startTransition, useActionState, useEffect, useState } from "react";
import { VerifyAccount } from "../../lib/auth/Auth";
import Link from "next/link";
import AppSnackBar from "../../ui/Snackbars/AppSnackBar";

export default function VerifyAccountPage() {
  const [state, action, pending] = useActionState(VerifyAccount, undefined)
  const [snackbar, setSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarType, setSnackbarType] = useState<'error' | 'success'>('error')

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    startTransition(()=>{
      action(formData)
    })
  }
    return (
      <form onSubmit={handleSubmit} className="w-96 p-10 rounded-lg flex flex-col items-center justify-center bg-neutral-900" style={{ boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)" }}>
        <AppSnackBar message={snackbarMessage} open={snackbar} setOpen={setSnackbar} type={snackbarType} />
        <h1 className="text-2xl">Verify your account on Púrpura Music</h1>
        <div className="flex flex-col space-y-4 my-7 w-4/5">
          <TextField label="Email" disabled={pending} type="email" name="email" required variant="outlined" />
          <TextField label="Verification code" disabled={pending} name="code" required variant="outlined" />
          {state?.message && <p className="text-red-500">{state.message}</p>}
 
          
        </div>
        {state?.success ? <Link href={'/'}><Button variant="contained" color="success">Login</Button></Link> :
        <Button variant="contained" color="primary" type="submit" disabled={pending} className="mt-7">Verify Account</Button>
        }

        
      </form>    
    )
}