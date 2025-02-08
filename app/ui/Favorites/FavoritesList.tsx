'use client'
import { GetUserFavorites } from '@/app/lib/actions/serverActions/getActions'
import { Song } from '@/app/lib/definitions'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import SongComponent from '../Song/SongComponent'
import { Button, List } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import { usePLayerStore } from '@/app/store/usePlayerStore'
import PauseIcon from '@mui/icons-material/Pause';

type SongsListProps = {
  initialSongs: Song[]
}

const NUMBER_OF_SONGS_TO_FETCH = 20

export default function FavoritesList({ initialSongs }: SongsListProps) {
  const [offset, setOffset] = useState(NUMBER_OF_SONGS_TO_FETCH)
  const [songs, setSongs] = useState<Song[]>(initialSongs)
  const { ref, inView } =  useInView()
  const {currentSong, isPlaying, playAlbum, togglePlay} = usePLayerStore()

  const loadMoreSongs = async () => {
    const apiUsers = await GetUserFavorites(offset, NUMBER_OF_SONGS_TO_FETCH)
    setSongs(songs => [...songs, ...apiUsers.songs])
    setOffset(offset => offset + NUMBER_OF_SONGS_TO_FETCH)
  }

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

  useEffect(() => {
    if (inView) {
      loadMoreSongs()
    }
  }, [inView])

  return (
    <div className='flex flex-col w-full items-center mt-6'>
      <div className='w-11/12 flex gap-6 justify-center'>
      {isPlaying ? 
        < Button color='info' variant='contained' sx={{borderRadius:4, width:'100px', height:50}}
        onClick={handlePlayLibrary}
        >
          <PauseIcon/>
        </Button>:
        < Button color='info' variant='contained' sx={{borderRadius:4, width:'100px', height:50}}
        onClick={handlePlayLibrary}
        >
          <PlayArrowIcon/>
        </Button>
    }
        < Button color='info' variant='contained' sx={{borderRadius:4, width:'100px', height:50}}>
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
        <div ref={ref}>
          Loading...
        </div>
        {/* <button onClick={loadMoreUsers}>Load more</button> */}
      </List>

    </div>
  )
}