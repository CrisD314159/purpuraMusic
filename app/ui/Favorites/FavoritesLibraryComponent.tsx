'use client'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { TransitionProps } from '@mui/material/transitions';
import { Box, List, Slide, Typography } from '@mui/material';
import { forwardRef, useState } from 'react';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import '@/app/css/linearGradientAnimation.css'
import FavoritesContainer from './FavoritesContainer';

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
        sx={{ zIndex: 990 }}
        open={open}
        onClose={handleClose}
        slots={{ transition: Transition }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100vh",
            backgroundColor: "#010101",
            color: "#fff",
            fontFamily: "Montserrat",
          }}
        >
          <Toolbar
            style={{
              background: "#0e0e0e3b",
              position: "fixed",
              top: 0,
              width: "100%",
              zIndex: 999,
              boxShadow: "0 4px 30px rgba(25, 25, 25, 0.5)",
              backdropFilter: "blur(15px)",
            }}
          >
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <ArrowBackIosNewRoundedIcon />
            </IconButton>
          </Toolbar>

          {/* Contenedor flexible con scroll */}
          <Box sx={{ flex: 1, overflowY: "auto", pt: 8, pb: "150px"  }}>
            <List
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                alignItems: "center",
              }}
            >
              <div
                className="w-11/12 flex justify-center linearBox rounded-xl"
                style={{ boxShadow: "3px 3px 50px 15px #bd52ee" }}
              >
                <FavoriteRoundedIcon sx={{ height: 200, width: 200 }} color="info" />
              </div>
              <FavoritesContainer open={open} />
            </List>
          </Box>
        </Box>
      </Dialog>

    </>
  );
}
