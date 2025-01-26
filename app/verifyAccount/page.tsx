'use client'
import { Button, TextField } from "@mui/material";
import { startTransition, useActionState, useEffect, useState } from "react";
import { VerifyAccount } from "../lib/actions/serverActions/auth";
import SuccessSnackBar from "../ui/Snackbars/SuccessSnackBar";
import Link from "next/link";

export default function VerifyAccountPage() {
  const [state, action, pending] = useActionState(VerifyAccount, undefined)
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
        <h1 className="text-2xl">Verify your account on Púrpura Music</h1>
        <div className="flex flex-col space-y-4 my-7 w-4/5">
          <TextField label="Email" disabled={pending} type="email" name="email" required variant="outlined" />
          <TextField label="Verification code" disabled={pending} name="code" required variant="outlined" />
          {state?.message && <p className="text-red-500">{state.message}</p>}
 
          <SuccessSnackBar message="Account verified successfully" open={open} setOpen={setOpen} />
          
        </div>
        {state?.success ? <Link href={'/'}><Button variant="contained" color="success">Login</Button></Link> :
        <Button variant="contained" color="primary" type="submit" disabled={pending} className="mt-7">Verify Account</Button>
        }

        
      </form>    
    )
}