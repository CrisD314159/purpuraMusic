'use client'
import { Button, TextField } from "@mui/material";
import { startTransition, useActionState, useEffect, useState } from "react";
import { ChangePassword } from "../lib/actions/serverActions/auth";
import SuccessSnackBar from "../ui/Snackbars/SuccessSnackBar";
import Link from "next/link";

export default function ChangePasswordPage() {
  const [state, action, pending] = useActionState(ChangePassword, undefined)
  const [open, setOpen] = useState(false)

  useEffect(()=>{
    if(state?.success){
      setOpen(true)
    }
  }, [state?.success])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    startTransition(()=>{
      action(formData)
    })
  }
    return (
      <form onSubmit={handleSubmit} className="w-96 p-10 rounded-lg flex flex-col items-center justify-center bg-neutral-900" style={{ boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)" }}>
        <h1 className="text-2xl">Recover your account on Púrpura Music</h1>
        <div className="flex flex-col space-y-4 my-7 w-4/5">
          <TextField label="Email" disabled={pending} type="email" name="email" required variant="outlined" />
          <TextField label="Verification code" disabled={pending} name="code" required variant="outlined" />
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
 
          <SuccessSnackBar message="Email sent" open={open} setOpen={setOpen} />
          
        </div>
        {state?.success ? <Button LinkComponent={Link} href="/" variant="contained" color="success">Login</Button> :
        <Button variant="contained" color="primary" type="submit" disabled={pending} className="mt-7">Change Password</Button>
        }

        
      </form>    
    )
}