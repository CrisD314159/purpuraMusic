'use client'
import Dialog from '@mui/material/Dialog';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef, useState } from 'react';
import { CircularProgress, DialogContent, DialogTitle, IconButton, List, ListItemButton, ListItemText, Slide } from '@mui/material';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { usePLayerStore } from '@/app/store/usePlayerStore';
import { Playlist, Song } from '@/app/lib/definitions';
import useSWR from 'swr';
import { GetUserPlaylists } from '@/app/lib/actions/requests/getRequests';
import MiniPlayListComponent from '../Playlists/PlayListDialog/MiniPlayListComponent';
import { AddSongToPlaylist } from '@/app/lib/actions/serverActions/putActions';
import SuccessSnackBar from '../Snackbars/SuccessSnackBar';
import ErrorSnackBar from '../Snackbars/ErrorSnackBar';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction='up' timeout={{appear:1000, enter:10000}}  ref={ref} {...props} />;
});


interface SongOptionsDialogProps {
  song: Song
}



export default function AddToPlaylist({song}:SongOptionsDialogProps) {
  const [open, setOpen] = useState(false);
  const {addToQueue} = usePLayerStore()
  const [success, setSuccess] = useState(false)
  const [errorS, setErrorS] = useState(false)

  const {data, error, isLoading} = useSWR<Playlist[]>('playlists', GetUserPlaylists)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAddToPlayList = async (playlistId:string)=>{
    try {
      const response = await AddSongToPlaylist(song.id, playlistId)
    if(response.success) setSuccess(true)
    addToQueue(song)
    setOpen(false)
    } catch {
      setErrorS(true)
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
     <ListItemButton onClick={handleClickOpen} >
            <PlaylistAddIcon/>
            <ListItemText sx={{marginLeft:'10px'}}>Add to playlist</ListItemText>
      </ListItemButton>
      <Dialog
        fullWidth
        maxWidth={'xl'}
        open={open}
        onClose={handleClose}
        slots={{transition: Transition}}
        sx={{zIndex:1500}}
      >
        <DialogTitle sx={{background:'#010101'}}>Select a Playlist</DialogTitle>
        <DialogContent sx={{background:'#010101'}}>
         <List sx={{background:'#010101', display:'flex', alignItems:'center', overflowX:'auto'}}>
         {isLoading && (
          <>
            <CircularProgress sx={{mt:5}}/>
          </>
         )}
          {data && (
            <>
              {data.map((playlist)=>(
                <IconButton disableRipple={true}  key={playlist.id} size='small'  onClick={()=> handleAddToPlayList(playlist.id)} >
                  <MiniPlayListComponent playlist={playlist} />
                </IconButton>
              ))}
            </>
          ) }
          {
            error && (
              <p className='mt-4'>{error.message}</p>
            )
          }
         </List>
        </DialogContent>
    
      </Dialog>

      <SuccessSnackBar message='Song added to playlist' open={success} setOpen={setSuccess}/>
      <ErrorSnackBar message='An error ocurred' open={errorS} setOpen={setErrorS}/>
    </>
  );
}
