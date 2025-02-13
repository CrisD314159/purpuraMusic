'use client'
import Dialog from '@mui/material/Dialog';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef, useState } from 'react';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { DialogContent, IconButton, List, ListItemButton, ListItemText, Slide } from '@mui/material';
import QueueIcon from '@mui/icons-material/Queue';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AlbumIcon from '@mui/icons-material/Album';
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode';
import { useAuthStore } from '@/app/store/useAuthStore';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction='up' timeout={{appear:1000, enter:10000}}  ref={ref} {...props} />;
});




export default function SongOptionsDialog() {
  const [open, setOpen] = useState(false);
  const {isAuthenticated} = useAuthStore();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
         {isAuthenticated && (
          <>
            <ListItemButton >
            <FavoriteIcon/>
            <ListItemText sx={{marginLeft:'10px'}}>Remove from favorites</ListItemText>
          </ListItemButton>
          <ListItemButton >
            <QueueIcon/>
            <ListItemText sx={{marginLeft:'10px'}}>Add Song to queue</ListItemText>
          </ListItemButton>
          <ListItemButton >
            <PlaylistAddIcon/>
            <ListItemText sx={{marginLeft:'10px'}}>Add to playlist</ListItemText>
          </ListItemButton>
          </>
         )}
          <ListItemButton >
            <InterpreterModeIcon/>
            <ListItemText sx={{marginLeft:'10px'}}>Go to artist profile</ListItemText>
          </ListItemButton>
          <ListItemButton >
            <AlbumIcon/>
            <ListItemText sx={{marginLeft:'10px'}}>Go to album page</ListItemText>
          </ListItemButton>
         </List>
        </DialogContent>
    
      </Dialog>
    </>
  );
}
