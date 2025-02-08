'use client'
import { Song } from '@/app/lib/definitions'
import {useState } from 'react'

import { Button, List } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import { usePLayerStore } from '@/app/store/usePlayerStore'
import PauseIcon from '@mui/icons-material/Pause';
import SongComponent from '../../Song/SongComponent';

type SongsListProps = {
  initialSongs: Song[]
  color:string
}


export default function PlaylistSongList({ initialSongs, color }: SongsListProps) {
  const [songs] = useState<Song[]>(initialSongs)
  const {currentSong, isPlaying, playAlbum, togglePlay} = usePLayerStore()

  const handlePlayLibrary = () =>{
    const isCurrentLibraryPlaying = songs.some( song => song.id === currentSong?.id)
    if(isCurrentLibraryPlaying) togglePlay()
      else{
      playAlbum(songs, 0)
    }

  }

  const handlePlaySong = (index: number)=>{
  
    if(!songs) return
    playAlbum(songs, index)
  }

  return (
    <div className='flex flex-col w-full items-center mt-6'>
      <div className='w-11/12 flex gap-6 justify-center'>
      {isPlaying ? 
        < Button  variant='contained' sx={{borderRadius:4, background:color, width:'100px', height:50}}
        onClick={handlePlayLibrary}
        >
          <PauseIcon/>
        </Button>:
        < Button variant='contained' sx={{borderRadius:4, background:color, width:'100px', height:50}}
        onClick={handlePlayLibrary}
        >
          <PlayArrowIcon/>
        </Button>
    }
        < Button  variant='contained' sx={{borderRadius:4, background:color, width:'100px', height:50}}>
          <ShuffleIcon/>
        </Button>
      </div>
      <List sx={{width:'91%', height:'100%', display:'flex', flexDirection:'column', alignItems:'center', overflowY:'auto', paddingTop:3}}>
        {songs.map((song, index) => {
          const isCurrent = currentSong?.id === song.id
          return (
            <div key={song.id} className='w-full'>
              {isCurrent && isPlaying ? (
                <SongComponent  current song={song} handlePLaySong={handlePlaySong} index={index} />
              ) : (
                <SongComponent  current={false} song={song} handlePLaySong={handlePlaySong} index={index} />
              )}
            </div>
          )
        })}
      </List>

    </div>
  )
}