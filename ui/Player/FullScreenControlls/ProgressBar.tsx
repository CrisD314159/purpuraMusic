import React from "react";
import { Slider } from "@mui/material";

interface ProgressBarProps{
  currentTime: number
  formatTime : (seconds:number) => string
  duration: number
  handleSeek: (value: number[]) => void
}

 function ProgressBar({
  currentTime, duration, formatTime, handleSeek
}:ProgressBarProps) {
  return (
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
  )
  
}

export default React.memo(ProgressBar)