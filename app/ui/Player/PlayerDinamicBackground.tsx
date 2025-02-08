import '@/app/css/bubbleEffectPlayer.css'

interface PlayerDinamicBackgroundProps{
  mainColor : string
  bubble1: string
  bubble2: string
  bubble3: string
}

export default function PlayerDinamicBackground({bubble1, bubble2, bubble3, mainColor}:PlayerDinamicBackgroundProps) {
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