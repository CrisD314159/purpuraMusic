'use client'
import '@/app/css/bubbleEffectPlayer.css'
import { useEffect, useState } from 'react'
import { Vibrant } from 'node-vibrant/browser'
import { defaultSongImage } from '@/app/lib/definitions'

interface PlayerDinamicBackgroundProps{
  currentImage: string | undefined
}

export default function PlayerDinamicBackground({currentImage}:PlayerDinamicBackgroundProps) {
      const [mainColor, setMainColor] = useState('#010101');
      const [bubble1, setBubble1] = useState('#010101');
      const [bubble2, setBubble2] = useState('#010101');
      const [bubble3, setBubble3] = useState('#010101');
      


      useEffect(()=>{
        if (!currentImage){
          Vibrant.from(defaultSongImage)
        .getPalette()
        .then((palette) =>{
          setMainColor(palette.DarkVibrant?.hex ?? '#010101')
          setBubble1(palette.Vibrant?.hex ?? '#010101')
          setBubble2(palette.LightVibrant?.hex ?? '#010101')
          setBubble3(palette.LightMuted?.hex ?? '#010101')
    
        } );
        }else{
          Vibrant.from(currentImage)
          .getPalette()
          .then((palette) =>{
            setMainColor(palette.DarkVibrant?.hex ?? '#010101')
            setBubble1(palette.Vibrant?.hex ?? '#010101')
            setBubble2(palette.LightVibrant?.hex ?? '#010101')
            setBubble3(palette.LightMuted?.hex ?? '#010101')
      
          } );
                  
        }
    
      }, [currentImage])
  return(
    <div className="player" style={{background: mainColor}}>
    <span style={{background:bubble1}}></span>
    <span style={{background:bubble2}}></span>
    <span style={{background:bubble2}}></span>
    <span style={{background:bubble3}}></span>
    <span style={{background:bubble1}}></span>
    <span style={{background:bubble2}}></span>
    <span style={{background:bubble3}}></span>
  
  </div>
  )
  
}