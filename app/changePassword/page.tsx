'use client'
import { Button, CircularProgress, TextField } from "@mui/material";
import { startTransition, Suspense, useActionState, useEffect, useState } from "react";
import { ChangePassword } from "../../lib/auth/Auth";
import Link from "next/link";
import AppSnackBar from "../../ui/Snackbars/AppSnackBar";
import { useSearchParams } from "next/navigation";

function ChangePasswordPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const [state, action, pending] = useActionState(ChangePassword, undefined)
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
    formData.append('code', token ?? "No token provided")

    startTransition(()=>{
      action(formData)
    })
  }
    return (
      <form onSubmit={handleSubmit} className="w-96 p-10 rounded-lg flex flex-col items-center justify-center bg-neutral-900" style={{ boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)" }}>
        <h1 className="text-2xl">Recover your account on Púrpura Music</h1>
        <div className="flex flex-col space-y-4 my-7 w-4/5">
          <TextField label="Email" disabled={pending} type="email" name="email" required variant="outlined" />
          <TextField
            label="New Password"
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
          {state?.message && <p className="text-red-500">{state.message}</p>}
 
          <AppSnackBar message={snackbarMessage} open={snackbar} setOpen={setSnackbar} type={snackbarType} />
          
        </div>
        {state?.success ? <Button LinkComponent={Link} href="/" variant="contained" color="success">Login</Button> :
        <Button variant="contained" color="primary" type="submit" disabled={pending} className="mt-7">Change Password</Button>
        }

        
      </form>    
    )
}


export default function Wrapper() {
  return (
    <Suspense fallback={<CircularProgress color="primary"/>}>
      <ChangePasswordPage />
    </Suspense>
  )
}