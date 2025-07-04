'use client'
import { Song } from '@/lib/definitions/definitions'
import {useState } from 'react'

import { Button, List } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import { usePLayerStore } from '@/store/usePlayerStore'; 
import PauseIcon from '@mui/icons-material/Pause';
import SongComponent from '../../Song/SongComponent';
import { AddPlay } from '@/lib/serverActions/PostActions';

type SongsListProps = {
  initialSongs: Song[]
  playlistId?: string
  color:string
  removePlaylist?: boolean
  mutate?: ()=> void
}


export default function PlaylistSongList({ initialSongs, color, playlistId, removePlaylist, mutate}: SongsListProps) {
  const [songs] = useState<Song[]>(initialSongs)
  const {currentSong, isPlaying, playAlbum, togglePlay, playAlbumShuffle} = usePLayerStore()

  const handlePlayLibrary = () =>{
    const isCurrentLibraryPlaying = songs.some( song => song.id === currentSong?.id)
    if(isCurrentLibraryPlaying) togglePlay()
      else{
      playAlbum(songs, 0)
    }

  }

  const handlePlayLibraryShuffle = () =>{
    playAlbumShuffle(songs, 0)

}

  const handlePlaySong = async (index: number, song:Song)=>{
    if(!songs) return
    playAlbum(songs, index)
    await AddPlay(song.id)
  }

  return (
    <div className='flex flex-col w-full h-full items-center mt-6'>
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
        < Button  variant='contained' sx={{borderRadius:4, background:color, width:'100px', height:50}}
        onClick={handlePlayLibraryShuffle}
        >
          <ShuffleIcon/>
        </Button>
      </div>
      <List sx={{width:'91%', height:'100%', display:'flex', flexDirection:'column', alignItems:'center', overflowY:'auto', paddingTop:3}}>
        {songs.map((song, index) => {
          const isCurrent = currentSong?.id === song.id
          return (
            <div key={song.id} className='w-full'>
             <SongComponent mutate={mutate} removePlaylist={removePlaylist}  playlistId={playlistId}  current={isCurrent && isPlaying} song={song} handlePLaySong={()=> handlePlaySong(index, song)} index={index} />
            </div>
          )
        })}
      </List>

    </div>
  )
}