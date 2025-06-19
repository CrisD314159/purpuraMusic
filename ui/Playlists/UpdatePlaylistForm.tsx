'use client'
import React, { startTransition, useActionState, useEffect, useState } from "react";
import ImageUploadComponent from "../ImageUpload/ImageUploadComponent";
import { Button, TextField } from "@mui/material";
import { Playlist } from "@/lib/definitions/definitions";
import { UpdatePlaylist } from "@/lib/serverActions/PutActions";
import AppSnackBar from "../Snackbars/AppSnackBar";

interface CreatePlaylistProps {
  mutate : () => void
  setClose :() => void
  playlist:Playlist
}

export default function UpdatePlaylistForm({mutate, playlist, setClose}:CreatePlaylistProps) {
    const [image, setImageUrl] = useState<string>(playlist.imageUrl)
    const [state, action, pending] = useActionState(UpdatePlaylist, undefined)
    const [snackbar, setSnackbar] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState('')
    const [snackbarType, setSnackbarType] = useState<'error' | 'success'>('error')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        if(!playlist.id) return
        const formData = new FormData(e.currentTarget);

        formData.append('imageUrl', image)
        formData.append('id', playlist.id)

        startTransition(()=>{
          action(formData)
        })
    }

    useEffect(()=>{
      if(state?.success){
        mutate()
        setClose()
      } else if(state?.success === false){
        setSnackbar(true)
        setSnackbarMessage(state.message)
        setSnackbarType('error')
      }
    }, [state, setClose, mutate])


    return (
        <form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column", gap:10, width:'100%', marginTop:20, alignItems:"center"}}>
            <ImageUploadComponent props={{setImageUrl:setImageUrl, success:false, initialUrl:playlist.imageUrl}} />

            <TextField label="Playlist Name" required variant="filled"
            defaultValue={playlist.name}
            slotProps={{htmlInput: {maxLength: 30, minLength: 2}}}
            name="name" sx={{ marginTop:2, width:'50%'}}/>

            <TextField label="Playlist Description" multiline maxRows={4}
            defaultValue={playlist.description}
            slotProps={{htmlInput: {maxLength: 100}}}
            variant="filled" name="description" sx={{ marginTop:2,  width:'50%'}}/>


            <Button type="submit" disabled={pending} variant="contained" color="info" sx={{marginTop:4}}>Update Playlist</Button>

            <AppSnackBar message={snackbarMessage} open={snackbar} setOpen={setSnackbar} type={snackbarType}/>


        </form>
    )
}