import { IconButton, Slider } from "@mui/material";
import ShuffleRoundedIcon from '@mui/icons-material/ShuffleRounded';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import React, { RefObject, SetStateAction } from "react";

interface VolumeShuffleControllsProps{
  setShuffle: ()=> void
  isShuffle: boolean
  volume: number
  setVolume : (value: SetStateAction<number>) => void
  audioRef: RefObject<HTMLAudioElement | null>
}
function VolumeShuffleControlls({
  audioRef, isShuffle, setShuffle, setVolume, volume
}:VolumeShuffleControllsProps) {
  return (
    <>
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
    </>
  )
}

export default React.memo(VolumeShuffleControlls)