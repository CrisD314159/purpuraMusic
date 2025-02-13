'use client'
import { Song } from "@/app/lib/definitions"
import Image from "next/image";
import SongOptionsDialog from "../Dialog/SongOptionsDialog";
import { Button } from "@mui/material";


type SongProps = {
  song: Song
  current: boolean
  handlePLaySong: (index:number)=> void
  index:number
}

export default function SongComponent({ song, current, handlePLaySong, index}: SongProps) {

  return (
    <div  className='rounded-xl bg-neutral-900 w-full flex gap-4 items-center mb-5 relative'>
      <Button 
      onClick={()=> handlePLaySong(index)}
       variant="contained" sx={{width:'100%', display:'flex', justifyContent:'left', padding:'15px', background:current ? '#9607f5':'#141414', borderRadius:'12px'}}>
        <div className="flex gap-3 w-full">
          <Image src={song?.imageUrl ?? ""} alt="Song Image" width={50} height={50}/>
          <div className=" w-[65%] sm:w-11/12 truncate flex flex-col items-start">
            <div className="w-full text-left">{song.name}</div>
            <p className="text-zinc-400 text-sm " style={{color: current ? 'rgb(161 161 170 / var(--tw-text-opacity, 1))' : 'rgb(113 113 122 / var(--tw-text-opacity, 1))'}}>{song.albumName}</p>
           
          </div>
        </div>
        <div className="flex absolute sm:left-1/2 left-[73%] flex-col hidden sm:block">
        {song.artists.map((artist)=>{
              return (
                <p className="text-xs" key={artist.id}>{artist.name} </p>
              )
            })}
        </div>
      </Button>
      <SongOptionsDialog/>
      
    </div>
  )
}