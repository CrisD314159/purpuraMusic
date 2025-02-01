'use client'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { TransitionProps } from '@mui/material/transitions';
import { Box, Slide, Typography } from '@mui/material';
import { forwardRef, useState } from 'react';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction='left' timeout={{appear:1000, enter:10000}}  ref={ref} {...props} />;
});

export default function FavoritesLibraryComponent() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="text"  sx={{width:'97%', height:150, display:'flex', justifyContent:'space-between'}} onClick={handleClickOpen}>
       <FavoriteRoundedIcon sx={{height:100, width:100}}/>
       <Typography variant="h5" sx={{fontFamily:'Montserrat', color:'#fff', fontSize:25}}>Liked Songs</Typography>
       <ArrowForwardIosRoundedIcon/>
      </Button>
      <Dialog
        fullScreen
        sx={{zIndex:990}}
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
              <ArrowBackIosNewRoundedIcon />
            </IconButton>
          </Toolbar>

        </Box>
    
      </Dialog>
    </>
  );
}
