//// filepath: /Users/cristiandavidvargasloaiza/Desktop/dev/purpuramusic-app/app/ui/Player/PlayerDialog.tsx
'use client'
import '@/css/glassEffect.css'
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import { TransitionProps } from '@mui/material/transitions';
import { Box, Slide } from '@mui/material';
import '@/css/linearGradientAnimation.css'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { usePLayerStore } from '@/store/usePlayerStore'; 
import Image from "next/image";
import { useEffect, useState, forwardRef } from "react";
import { MiniPlayerControls } from './MiniPlayerControls';
import PlayerDinamicBackground from './PlayerDinamicBackground';
import { defaultSongImage } from '@/lib/definitions/definitions';
import SongAddRemoveComponent from '../Song/SongAddRemoveComponent';
import { useAuthStore } from '@/store/useAuthStore'; 
import PlayerLogic from './PlayerLogic';
import ProgressBar from './FullScreenControlls/ProgressBar';
import PlayPauseControlls from './FullScreenControlls/PlayPauseControlls';
import VolumeShuffleControlls from './FullScreenControlls/VolumeShuffleControlls';
import { useCallback } from 'react';
import DisclaimerDialog from './FullScreenControlls/DisclaimerDialog';

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction='up' timeout={{ appear: 1000, enter: 10000 }} ref={ref} {...props} />;
});

export default function PlayerComponent() {
  const { currentSong, isPlaying, togglePlay, playNext, playPrevious, isShuffle, setShuffle, audioRef } = usePLayerStore();
  const song = currentSong ?? { imageUrl: defaultSongImage, name: 'Not Playing', artists: [], disclaimer:'' };
  const [open, setOpen] = useState(false);
  const [volume, setVolume] = useState(100);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    audioRef.current = document.querySelector("audio");
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      usePLayerStore.setState({ isPlaying: false });
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSong, audioRef]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRepeat = () => {
    if (currentTime < 4) {
      playPrevious();
    } else {
      handleSeek([0]);
    }
  };

  const handleSeek = useCallback((value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
    }
  }, [audioRef]);

  return (
    <>
      <audio ref={audioRef} preload='auto'/>
      <MiniPlayerControls setOpen={handleClickOpen} />
      <PlayerLogic />
      <Dialog
        fullScreen
        sx={{ zIndex: 1300 }}
        open={open}
        onClose={handleClose}
        slots={{ transition: Transition }}
      >
        {/* Contenedor principal, flex column y altura completa */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            background: '#010101',
            alignItems: 'center',
          }}
        >
          {/* Fondo dinámico con la imagen de la canción */}
          <PlayerDinamicBackground currentImage={currentSong?.imageUrl} />

          {/* Zona de contenido que se expande y hace scroll si excede la pantalla */}
          <div className="flex flex-col items-center w-full h-full pt-4 z-[1400] glass overflow-y-auto">
            {/* Botón para cerrar el diálogo */}
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
              sx={{ marginBottom: 4 }}
            >
              <KeyboardArrowDownRoundedIcon />
            </IconButton>

            {/* Imagen y título de la canción */}
            <div className="flex flex-col items-center justify-center w-full">
                
                  <Image
                    width={320}
                    height={320}
                    src={song.imageUrl ?? ''}
                    alt={song.name}
                    className="w-72 h-72 object-cover rounded-md"
                    loading='lazy'
                  />
                  <div className="flex-1 flex items-center justify-between w-[75%] mt-2">
                    <div style={{ width: '65%' }}>
                      <div className="font-medium text-xl truncate">{song.name}</div>
                      <div className="w-52 text-base text-zinc-200 truncate">
                        {song.artists.map((artist) => artist.name).join(", ")}
                      </div>
                    </div>
                    <div>
                      {isAuthenticated && <SongAddRemoveComponent />}
                      <DisclaimerDialog message={song.disclaimer}/>
                    </div>
                  </div>
                
            </div>

            {/* Controles principales (barra de progreso y botones de reproducción) */}
            <div className="flex flex-col items-center gap-2 w-full">
              {/* Barra de progreso */}
              <ProgressBar 
              currentTime={currentTime} 
              duration={duration} 
              formatTime={formatTime} 
              handleSeek={handleSeek}/>

              {/* Botones: anterior, play/pause, siguiente */}
              <PlayPauseControlls 
              currentSong={currentSong} 
              handleRepeat={handleRepeat} 
              isPlaying={isPlaying} 
              playNext={playNext} 
              playPrevious={playPrevious} 
              togglePlay={togglePlay}/>
            </div>

            {/* Controles de volumen y shuffle */}
            <div className="w-full px-4 flex flex-col items-center gap-4">
              <VolumeShuffleControlls 
              audioRef={audioRef} 
              isShuffle={isShuffle} 
              setShuffle={setShuffle} 
              setVolume={setVolume} 
              volume={volume}/>
            </div>
          </div>
        </Box>
      </Dialog>
    </>
  );
}