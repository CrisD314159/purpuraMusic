'use client'
import '@/css/bubbleEffectPlayer.css'
import { useEffect, useState } from 'react'
import { Vibrant } from 'node-vibrant/browser'
import { defaultSongImage } from '@/lib/definitions/definitions'

interface PlayerDinamicBackgroundProps{
  currentImage: string | undefined
}

export default function PlayerDinamicBackground({currentImage}:PlayerDinamicBackgroundProps) {
      const [mainColor, setMainColor] = useState('#010101');
      useEffect(()=>{
        if (!currentImage){
          Vibrant.from(defaultSongImage)
        .getPalette()
        .then((palette) =>{
          setMainColor(palette.DarkVibrant?.hex ?? '#010101')
    
        } );
        }else{
          Vibrant.from(currentImage)
          .getPalette()
          .then((palette) =>{
            setMainColor(palette.DarkVibrant?.hex ?? '#010101')
          } );       
        }
    
      }, [currentImage])
  return(
    <div className="player" style={{background: mainColor}}>
  </div>
  )
  
}