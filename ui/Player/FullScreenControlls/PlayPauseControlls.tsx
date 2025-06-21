import { IconButton } from "@mui/material";
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import { Song } from "@/lib/definitions/definitions";
import React from "react";

interface PlayPauseControllsProps{
  playPrevious : () => void
  handleRepeat: () => void
  currentSong : Song | null
  togglePlay : () => void
  isPlaying : boolean
  playNext : () => void
}

function PlayPauseControlls({currentSong, handleRepeat, isPlaying, 
playNext, playPrevious, togglePlay

}: PlayPauseControllsProps) {
  return (
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
  )
}


export default React.memo(PlayPauseControlls)