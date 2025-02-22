'use client'
import Dialog from '@mui/material/Dialog';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { TransitionProps } from '@mui/material/transitions';
import { Box, Slide, Typography } from '@mui/material';
import { forwardRef, useState } from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { Playlist } from '@/app/lib/definitions';
import UpdatePlaylistForm from './UpdatePlaylistForm';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction='up' timeout={{appear:1000, enter:10000}}  ref={ref} {...props} />;
});

interface UpdatePlaylistProps {
  mutate : () => void
  setClose :() => void
  playlist: Playlist
}


export default function UpdatePlaylistDialog({props}:{props:UpdatePlaylistProps}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
     <IconButton edge="end" color="inherit" onClick={handleClickOpen} aria-label="close">
        <EditRoundedIcon />
      </IconButton>
      <Dialog
        fullScreen
        sx={{zIndex:1300}}
        open={open}
        onClose={handleClose}
        slots={{transition: Transition}}
      >
        <Box sx={{width:'100%', height:'100%', backgroundColor:'#010101', color:'#fff', fontFamily:'Montserrat'}}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseRoundedIcon />

            </IconButton>
            <Typography variant="h5" sx={{fontFamily:'Montserrat', color:'#fff', fontSize:20, marginLeft:3}}>Update Playlist</Typography>
          </Toolbar>

        <UpdatePlaylistForm props={{mutate : props.mutate, setClose:handleClose, playlist:props.playlist}}/>

        </Box>
    
      </Dialog>
    </>
  );
}
