'use client'
import Dialog from '@mui/material/Dialog';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef, useState } from 'react';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { DialogContent, IconButton, List, ListItemButton, ListItemText, Slide } from '@mui/material';
import QueueIcon from '@mui/icons-material/Queue';
import AlbumIcon from '@mui/icons-material/Album';
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode';
import { useAuthStore } from '@/store/useAuthStore'; 
import Link from 'next/link';
import { usePLayerStore } from '@/store/usePlayerStore';
import { Song } from '@/lib/definitions/definitions';
import AddToPlaylist from './AddToPlaylist';
import { RemoveSongFromPlaylist } from '@/lib/serverActions/PutActions';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

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
  removePlaylist?: boolean
  playlistId?: string
  mutate?: ()=> void
}



export default function SongOptionsDialog({song, removePlaylist, playlistId, mutate}:SongOptionsDialogProps) {
  const [open, setOpen] = useState(false);
  const {isAuthenticated} = useAuthStore();
  const {addToQueue} = usePLayerStore()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAddToQueue = ()=>{
    addToQueue(song)
    setOpen(false)
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteFromPlaylist = async () => {
    try {
      if(!playlistId || !mutate) return
      const response = await RemoveSongFromPlaylist(song.id, playlistId)
      if(response.success) {
        mutate()
        handleClose()
      }
      
    } catch  {
      handleClose()
      
    }

  }

  return (
    <>
      <IconButton sx={{ position:'absolute', right:0, marginRight:2, zIndex:0}} size='small' color='info' onClick={handleClickOpen} >
          <MoreHorizIcon/>
      </IconButton>
      <Dialog
        fullWidth
        maxWidth={'xl'}
        open={open}
        onClose={handleClose}
        slots={{transition: Transition}}
      >
        <DialogContent sx={{background:'#010101'}}>
         <List sx={{background:'#010101'}}>
         <ListItemButton onClick={handleAddToQueue} >
            <QueueIcon/>
            <ListItemText sx={{marginLeft:'10px'}}>Play Next</ListItemText>
          </ListItemButton>
         {isAuthenticated && (
          <>
          <AddToPlaylist song={song}/>
          </>
         )}
          <ListItemButton LinkComponent={Link} href={`/dashboard/artists/${song.artists[0].id}`} >
            <InterpreterModeIcon/>
            <ListItemText sx={{marginLeft:'10px'}}>Go to artist profile</ListItemText>
          </ListItemButton>

          <ListItemButton LinkComponent={Link} href={`/dashboard/albums/${song.albumId}`} >
            <AlbumIcon/>
            <ListItemText sx={{marginLeft:'10px'}}>Go to album page</ListItemText>
          </ListItemButton>

          {removePlaylist &&(
          <ListItemButton onClick={handleDeleteFromPlaylist} >
            <ClearRoundedIcon/>
            <ListItemText sx={{marginLeft:'10px'}}>Remove from playlist</ListItemText>
          </ListItemButton>
          )}
         </List>
        </DialogContent>
    
      </Dialog>
    </>
  );
}
