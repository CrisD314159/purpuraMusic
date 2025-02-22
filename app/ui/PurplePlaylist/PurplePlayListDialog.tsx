'use client'
import Dialog from '@mui/material/Dialog';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { TransitionProps } from '@mui/material/transitions';
import { Box, keyframes, List, Slide } from '@mui/material';
import { forwardRef, useEffect, useState } from 'react';
import '@/app/css/linearGradientAnimation.css'
import { Playlist } from '@/app/lib/definitions';
import Image from 'next/image';
import { Vibrant } from 'node-vibrant/browser';
import MiniPlayListComponent from '../Playlists/PlayListDialog/MiniPlayListComponent';
import PlaylistSongList from '../Playlists/PlayListDialog/PlaylistSongList';
import PlaylistSongsContainer from '../Playlists/PlayListDialog/PlaylistSongsContainer';




const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction='left' timeout={{appear:1000, enter:10000}}  ref={ref} {...props} />;
});


interface PurplePlayListDialogProps{
  playlist: Playlist
}

export default function PurplePlayListDialog({playlist}:PurplePlayListDialogProps) {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState('#010101');

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(()=>{
    if(!playlist || !playlist.imageUrl) return

    Vibrant.from(playlist.imageUrl)
    .getPalette()
    .then((palette)=> setColor(palette.Vibrant?.hex ?? '#010101'))



})

  const handleClose = () => {
    setOpen(false);
  };

  const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;


  return (
    <>
      <MiniPlayListComponent  playlist={playlist} setOpen={handleClickOpen}/>
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
              display: "flex",
              justifyContent: "space-between",
              boxShadow: "0 4px 30px rgba(25, 25, 25, 0.5)",
              backdropFilter: "blur(15px)",
            }}
          >
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <ArrowBackIosNewRoundedIcon />
            </IconButton>
          </Toolbar>

          {/* Contenedor flexible con scroll */}
          <Box sx={{ 
             flex: 1,
             overflowY: "auto",
             pt: 8,
             pb: "150px",
             background: "linear-gradient(270deg, #2c0440, #510875, #79097d, #062f52)",
             backgroundSize: "400% 400%",
             animation: `${gradientAnimation} 6s ease infinite`
           }}>
            <List
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                alignItems: "center",
              }}
            >
              <div
                className="flex justify-center rounded-xl"
                style={{ boxShadow: `3px 3px 50px 15px ${color}` }}
              >
                <Image src={playlist.imageUrl ?? ""} width={300} height={300} alt='data Image' unoptimized/>
                
                
              </div>
              <p className='mt-5 text-xl font-bold '>{playlist.name}</p>
              <p className='mt-5 font-light'>Daily recomendations just for you</p>
              {
                playlist && (playlist.songs?.length ?? 0) > 0 ?
                <PlaylistSongList initialSongs={playlist.songs ?? []}  color={color}/>
                :
                <PlaylistSongsContainer color={color} id={playlist.id}  open={open}/>
              }
            </List>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
