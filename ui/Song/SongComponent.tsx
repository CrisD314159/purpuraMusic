'use client'
import { Song } from "@/lib/definitions/definitions"
import Image from "next/image";
import SongOptionsDialog from "../Dialog/SongOptionsDialog";
import { Button } from "@mui/material";


type SongProps = {
  song: Song
  current: boolean
  handlePLaySong: (index:number)=> void
  index:number
  notShowArtist?: boolean
  removePlaylist?: boolean
  playlistId?: string
  mutate?: ()=> void
}

export default function SongComponent({ song, current, handlePLaySong, index, notShowArtist, removePlaylist, playlistId, mutate}: SongProps) {

  return (
    <div  className='rounded-xl bg-neutral-900 w-full flex gap-1 items-center mb-5 relative'>
      <Button 
      onClick={()=> handlePLaySong(index)}
       variant="contained" sx={{width:'100%', display:'flex', justifyContent:'left', padding:'15px', background:current ? '#9607f5':'#141414', borderRadius:'12px'}}>
        <div className="flex gap-3 w-full">
          <Image src={song?.imageUrl ?? ""} alt="Song Image" width={50} height={50}/>
          <div className=" w-[60%] sm:w-11/12 truncate flex flex-col items-start">
            <div className="text-zinc-100 w-full text-left">{song.name}</div>
            <div className="text-zinc-400 text-sm w-full text-left">{song.albumName}</div>
          </div>
        </div>
        {
          !notShowArtist && (
            <div className=" absolute sm:left-1/2 left-[73%] flex-col hidden sm:block">
            {song.artists.map((artist)=>{
                  return (
                    <p className="text-xs text-zinc-100" key={artist.id}>{artist.name} </p>
                  )
                })}
            </div>
          )
        }
      </Button>
      <SongOptionsDialog mutate={mutate} removePlaylist={removePlaylist} playlistId={playlistId} song={song}/>
      
    </div>
  )
}