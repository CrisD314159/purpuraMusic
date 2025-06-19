'use client'
import { GetUserFavorites } from '@/lib/serverActions/GetActions'
import { Song } from '@/lib/definitions/definitions'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import SongComponent from '../Song/SongComponent'
import { Button, CircularProgress, List } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import { usePLayerStore } from '@/store/usePlayerStore' 
import PauseIcon from '@mui/icons-material/Pause';
import { AddPlay } from '@/lib/serverActions/PostActions'

type SongsListProps = {
  initialSongs: Song[]
}

const NUMBER_OF_SONGS_TO_FETCH = 20

export default function FavoritesList({ initialSongs }: SongsListProps) {
  const [offset, setOffset] = useState(NUMBER_OF_SONGS_TO_FETCH)
  const [songs, setSongs] = useState<Song[]>(initialSongs)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false) // Evita llamadas dobles
  const { ref, inView } = useInView({
    // rootMargin: '100px', // Opcional: dispara "inView" antes de llegar al div
    threshold: 0.1,         // Opcional: porcentaje de visibilidad para considerarlo “en vista”
  })
  const {currentSong, isPlaying, playAlbum, togglePlay, playAlbumShuffle} = usePLayerStore()

  const loadMoreSongs = async () => {
    try {
      setIsLoadingMore(true)
      const apiUsers = await GetUserFavorites(offset, NUMBER_OF_SONGS_TO_FETCH)

      if (apiUsers.songs.length === 0) {
        setHasMore(false)
        return
      }

      setSongs(prev => [...prev, ...apiUsers.songs])
      setOffset(prev => prev + NUMBER_OF_SONGS_TO_FETCH)
    } finally {
      setIsLoadingMore(false)
    }
  }

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

  useEffect(() => {
    if (inView && !isLoadingMore) {
      console.log("hola");
      loadMoreSongs()
    }
  }, [inView, isLoadingMore])

  return (
    <div className='flex flex-col w-full items-center h-3/4 mt-6'>
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
        < Button color='info' variant='contained' sx={{borderRadius:4, width:'100px', height:50}}
        onClick={handlePlayLibraryShuffle}
        >
          <ShuffleIcon/>
        </Button>
      </div>
      <List sx={{width:'91%', display:'flex', height:'100%', flexDirection:'column', alignItems:'center', paddingTop:3}}>
        {songs.map((song, index) => {
          const isCurrent = currentSong?.id === song.id
          return (
            <div key={song.id} className='w-full'>
              {isCurrent && isPlaying ? (
                <SongComponent  current song={song} handlePLaySong={()=> handlePlaySong(index, song)} index={index} />
              ) : (
                <SongComponent  current={false} song={song} handlePLaySong={()=> handlePlaySong(index, song)} index={index} />
              )}
            </div>
          )
        })}
      
      {hasMore &&
      <div ref={ref} className="mt-4 mb-8">
          {isLoadingMore && <CircularProgress color='info' />}
        </div>
      }
        {/* <button onClick={loadMoreUsers}>Load more</button> */}
      </List>

    </div>
  )
}