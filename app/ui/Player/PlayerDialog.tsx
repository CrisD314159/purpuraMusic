//// filepath: /Users/cristiandavidvargasloaiza/Desktop/dev/purpuramusic-app/app/ui/Player/PlayerDialog.tsx
'use client'
import '@/app/css/glassEffect.css'
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import { TransitionProps } from '@mui/material/transitions';
import { Box, Slide } from '@mui/material';
import '@/app/css/linearGradientAnimation.css'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { usePLayerStore } from "@/app/store/usePlayerStore";
import { Slider } from "@mui/material";
import Image from "next/image";
import { useEffect, useRef, useState, forwardRef } from "react";
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import ShuffleRoundedIcon from '@mui/icons-material/ShuffleRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import { MiniPlayerControls } from './MiniPlayerControls';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import PlayerDinamicBackground from './PlayerDinamicBackground';
import PlayerComponent from './PlayerComponent';
import { defaultSongImage } from '@/app/lib/definitions';
import SongAddRemoveComponent from '../Song/SongAddRemoveComponent';
import { useAuthStore } from '@/app/store/useAuthStore';

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

export default function PlayerDialog() {
  const { currentSong, isPlaying, togglePlay, playNext, playPrevious, isShuffle, setShuffle } = usePLayerStore();
  const [open, setOpen] = useState(false);
  const [volume, setVolume] = useState(100);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
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
  }, [currentSong]);

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

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
    }
  };

  return (
    <>
      <MiniPlayerControls setOpen={handleClickOpen} />
      <PlayerComponent />
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
              {currentSong ? (
                <>
                  <Image
                    width={320}
                    height={320}
                    src={currentSong.imageUrl ?? ''}
                    alt={currentSong.name}
                    className="w-72 h-72 object-cover rounded-md"
                  />
                  <div className="flex-1 flex items-center justify-between w-[75%] mt-2">
                    <div style={{ width: '50%' }}>
                      <div className="font-medium text-xl truncate">{currentSong.name}</div>
                      <div className="w-52 text-base text-zinc-200 truncate cursor-pointer">
                        {currentSong.artists.map((artist) => artist.name).join(", ")}
                      </div>
                    </div>
                    {isAuthenticated && <SongAddRemoveComponent />}
                  </div>
                </>
              ) : (
                <>
                  <Image
                    width={300}
                    height={300}
                    src={defaultSongImage}
                    alt="Not playing"
                    className="w-72 h-72 object-cover rounded-md"
                  />
                  <div className="flex-1 flex items-center justify-between w-[75%] mt-2">
                    <div>
                      <div className="font-medium text-xl truncate">Not Playing</div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Controles principales (barra de progreso y botones de reproducción) */}
            <div className="flex flex-col items-center gap-2 w-full">
              {/* Barra de progreso */}
              <div className="flex items-center mt-8 gap-2 w-[90%]">
                <div className="text-xs text-zinc-200">{formatTime(currentTime)}</div>
                <Slider
                  size="small"
                  color="secondary"
                  value={currentTime}
                  max={duration || 100}
                  step={1}
                  onChange={(event, value) => handleSeek([value as number])}
                />
                <div className="text-xs text-zinc-200">{formatTime(duration)}</div>
              </div>

              {/* Botones: anterior, play/pause, siguiente */}
              <div className="flex items-center justify-center gap-7 w-full h-32 pt-5">
                <IconButton
                  className="hover:text-white text-zinc-400"
                  style={{ width: 50, height: 50 }}
                  onDoubleClick={playPrevious}
                  onClick={handleRepeat}
                  disabled={!currentSong}
                >
                  <SkipPreviousRoundedIcon style={{ width: 50, height: 50 }} />
                </IconButton>
                <IconButton
                  style={{ width: 50, height: 50 }}
                  onClick={togglePlay}
                  disabled={!currentSong}
                >
                  {isPlaying ? (
                    <PauseRoundedIcon style={{ width: 50, height: 50 }} />
                  ) : (
                    <PlayArrowRoundedIcon style={{ width: 50, height: 50 }} />
                  )}
                </IconButton>
                <IconButton
                  className="hover:text-white text-zinc-400"
                  style={{ width: 50, height: 50 }}
                  onClick={playNext}
                  disabled={!currentSong}
                >
                  <SkipNextRoundedIcon style={{ width: 50, height: 50 }} />
                </IconButton>
              </div>
            </div>

            {/* Controles de volumen y shuffle */}
            <div className="w-full px-4 flex flex-col items-center gap-4">
              <div className="w-full flex items-center justify-between">
                <IconButton onClick={setShuffle}>
                  {isShuffle ? (
                    <ShuffleRoundedIcon className="h-4 w-4" color="info" />
                  ) : (
                    <ShuffleRoundedIcon className="h-4 w-4" />
                  )}
                </IconButton>

              </div>

              <div className="flex items-center gap-2 w-full">
                <IconButton className="hover:text-white text-zinc-400">
                  <VolumeDownIcon className="h-4 w-4" />
                </IconButton>
                <Slider
                  color="secondary"
                  value={[volume]}
                  max={100}
                  step={1}
                  className="w-[90%] hover:cursor-grab active:cursor-grabbing"
                  onChange={(event, value) => {
                    const volumeValue = Array.isArray(value) ? value[0] : value;
                    setVolume(volumeValue);
                    if (audioRef.current) {
                      audioRef.current.volume = volumeValue / 100;
                    }
                  }}
                />
                <IconButton className="hover:text-white text-zinc-400">
                  <VolumeUpRoundedIcon className="h-4 w-4" />
                </IconButton>
              </div>
            </div>
          </div>
        </Box>
      </Dialog>
    </>
  );
}