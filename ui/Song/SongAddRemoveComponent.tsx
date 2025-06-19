import { IconButton } from "@mui/material"
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { usePLayerStore } from "@/store/usePlayerStore"; 
import { AddRemoveSong } from "@/lib/serverActions/PutActions";
import { useState } from "react";
import AppSnackBar from "../Snackbars/AppSnackBar";


export default function SongAddRemoveComponent() {

  const [snackBar, setSnackBar] = useState(false)
  const [snackBarMessage, setSnackBarMessage] = useState('')
  const [snackBarType, setSnackBarType] = useState<'error' | 'success'>('error')
  const [loading, setLoading] = useState(false)
  const {currentSong, UpdateIsOnLibrary} = usePLayerStore()

  const HandleAddRemoveSong = async ()=>{
    if(!currentSong || !currentSong.id) return
  try {
    setLoading(true)
    const response = await AddRemoveSong(currentSong.id)
    if(response.success){
      UpdateIsOnLibrary()
      setSnackBar(true)
      setSnackBarMessage(response.message)
      setSnackBarType('success')
    }else{
      throw new Error(response.message)
    }
  } catch (error) {
    if(error instanceof Error){
      setSnackBar(true)
      setSnackBarMessage(error.message)
      setSnackBarType('error')
    }
  }finally{
    setLoading(false)
  }

  }

    return (
      <>
        <IconButton  size='large' onClick={HandleAddRemoveSong} disabled={loading}>
                    {currentSong?.isOnLibrary ?
                    <FavoriteRoundedIcon style={{width:30, height:30}}/>
                    :
                    <FavoriteBorderRoundedIcon style={{width:30, height:30}}/>
                    
                  }
        </IconButton>
        <AppSnackBar message={snackBarMessage} open={snackBar} setOpen={setSnackBar} type={snackBarType}/>
      </>

    )
  
}