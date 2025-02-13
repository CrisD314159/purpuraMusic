import { IconButton } from "@mui/material"
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { usePLayerStore } from "@/app/store/usePlayerStore";
import { AddRemoveSong } from "@/app/lib/actions/serverActions/putActions";
import ErrorSnackBar from "../Snackbars/ErrorSnackBar";
import { useState } from "react";
import SuccessSnackBar from "../Snackbars/SuccessSnackBar";


export default function SongAddRemoveComponent() {

  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const {currentSong, UpdateIsOnLibrary} = usePLayerStore()

  const HandleAddRemoveSong = async ()=>{
    if(!currentSong || !currentSong.id) return
  try {
    setLoading(true)
    const response = await AddRemoveSong(currentSong.id)
    if(response.success){
      UpdateIsOnLibrary()
      setSuccess(true)

    }else{
      setError(true)
    }
    setLoading(false)
  } catch  {
    setError(true)  
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
        <ErrorSnackBar message="Error updating Song" open={error} setOpen={setError} />
        <SuccessSnackBar message="Done!" open={success} setOpen={setSuccess} />
      </>

    )
  
}