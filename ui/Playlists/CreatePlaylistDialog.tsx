'use client'
import Dialog from '@mui/material/Dialog';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { TransitionProps } from '@mui/material/transitions';
import { Box, Fab, Slide, Typography } from '@mui/material';
import { forwardRef, useState } from 'react';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CreatePlaylistForm from './CreatePlaylistForm';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction='up' timeout={{appear:1000, enter:10000}}  ref={ref} {...props} />;
});

interface CreatePlaylistProps {
  mutate : () => void
}


export default function CreatePlaylistDialog({mutate}:CreatePlaylistProps) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Fab sx={{marginRight:2, position:'absolute', right:0, top:180, zIndex:50}} size='small' color='info' onClick={handleClickOpen} >
          <AddRoundedIcon/>
        </Fab>
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
            <Typography variant="h5" sx={{fontFamily:'Montserrat', color:'#fff', fontSize:20, marginLeft:3}}>Create Playlist</Typography>
          </Toolbar>

        <CreatePlaylistForm mutate={mutate} setClose={handleClose}/>

        </Box>
    
      </Dialog>
    </>
  );
}
