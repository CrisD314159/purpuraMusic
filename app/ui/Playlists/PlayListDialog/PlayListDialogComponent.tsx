'use client'
import Dialog from '@mui/material/Dialog';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { TransitionProps } from '@mui/material/transitions';
import { Box, Slide } from '@mui/material';
import { forwardRef, useEffect, useState } from 'react';
import '@/app/css/linearGradientAnimation.css'
import { Playlist } from '@/app/lib/definitions';
import MiniPlayListComponent from './MiniPlayListComponent';
import Image from 'next/image';
import { Vibrant } from 'node-vibrant/browser';
import PlaylistSongsContainer from './PlaylistSongsContainer';


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
}

export default function PlayListDialogComponent({playlist}:PlaylistComponent) {
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

  return (
    <>
      <MiniPlayListComponent  playlist={playlist} setOpen={handleClickOpen}/>
      <Dialog
        fullScreen
        sx={{zIndex:990}}
        open={open}
        onClose={handleClose}
        slots={{transition: Transition}}
      >
        <Box sx={{width:'100%', backgroundColor:'#010101', color:'#fff', fontFamily:'Montserrat'}}>
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

        <Box sx={{display:'flex', flexDirection:'column', width:'100%', height:'100%', background:'#010101', alignItems:'center'}}>
          <div className='flex justify-center rounded-xl' style={{boxShadow:`3px 3px 60px 25px ${color}`}}>
            <Image src={playlist.imageUrl} width={220} height={220} alt='Playlist Image' unoptimized/>
          </div>
          <p className='mt-5 text-xl font-medium'>{playlist.name}</p>

          <PlaylistSongsContainer id={playlist.id} color={color}/>

        </Box>
    
      </Dialog>
    </>
  );
}
