'use client'
import React, { startTransition, useActionState, useEffect, useState } from "react";
import ImageUploadComponent from "../ImageUpload/ImageUploadComponent";
import { Button, TextField } from "@mui/material";
import { CreatePlaylist } from "@/app/lib/actions/serverActions/createActions";
import ErrorSnackBar from "../Snackbars/ErrorSnackBar";

interface CreatePlaylistProps {
  mutate : () => void
  setClose :() => void
}

export default function CreatePlaylistForm({props}:{props:CreatePlaylistProps}) {
    const [image, setImageUrl] = useState<string>('')
    const [state, action, pending] = useActionState(CreatePlaylist, undefined)
    const [open, setOpen] = useState(false)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        formData.append('imageUrl', image)

        startTransition(()=>{
          action(formData)
        })
    }

    useEffect(()=>{
      if(state?.success){
        props.mutate()
        props.setClose()
      } else if(state?.success === false){
        setOpen(true)
      }
    }, [state, props])


    return (
        <form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column", gap:10, width:'100%', marginTop:20, alignItems:"center"}}>
            <ImageUploadComponent props={{setImageUrl:setImageUrl, success:false}} />

            <TextField label="Playlist Name" required variant="filled"
            slotProps={{htmlInput: {maxLength: 30, minLength: 2}}}
            name="name" sx={{ marginTop:2, width:'50%'}}/>

            <TextField label="Playlist Description" multiline maxRows={4}
            slotProps={{htmlInput: {maxLength: 100}}}
            variant="filled" name="description" sx={{ marginTop:2,  width:'50%'}}/>


            <Button type="submit" disabled={pending} variant="contained" color="info" sx={{marginTop:4}}>Create Playlist</Button>

            <ErrorSnackBar message="There was an error while creating the playlist" open={open} setOpen={setOpen}/>


        </form>
    )
}