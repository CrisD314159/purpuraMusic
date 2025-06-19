'use client'
import Dialog from '@mui/material/Dialog';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { TransitionProps } from '@mui/material/transitions';
import { Box, List, Slide } from '@mui/material';
import { forwardRef, useEffect, useState } from 'react';
import '@/css/linearGradientAnimation.css'
import { Playlist } from '@/lib/definitions/definitions';
import MiniPlayListComponent from './MiniPlayListComponent';
import Image from 'next/image';
import { Vibrant } from 'node-vibrant/browser';
import PlaylistSongsContainer from './PlaylistSongsContainer';
import PlaylistSongList from './PlaylistSongList';
import UpdatePlaylistDialog from '../UpdatePlaylistDialog';
import DeletePlaylistDialog from './DeletePlaylistDialog';


const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction='left' timeout={{appear:1000, enter:10000}}  ref={ref} {...props} />;
});


interface PlaylistComponent{
  playlist: Playlist
  mutate: ()=> void
}

export default function PlayListDialogComponent({playlist, mutate}:PlaylistComponent) {
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

  const handleMutate = () =>{
    mutate()
    handleClose()
  }

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
            <div className='flex gap-6'>
              <UpdatePlaylistDialog mutate={mutate} playlist={playlist} setClose={handleClose}/>
              <DeletePlaylistDialog mutate={handleMutate} playlistId={playlist.id} setClose={handleClose}/>
            </div>
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
                className="flex justify-center rounded-xl"
                style={{ boxShadow: `3px 3px 50px 15px ${color}` }}
              >
                <Image src={playlist.imageUrl ?? ""} width={200} height={200} alt='data Image' unoptimized/>
                
                
              </div>
              <p className='mt-5 text-xl font-bold '>{playlist.name}</p>
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
