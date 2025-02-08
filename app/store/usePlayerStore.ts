import {create} from 'zustand'
import { Song } from '../lib/definitions'

interface PlayerStore{
  currentSong : Song |null
  isPlaying: boolean
  queue: Song[]
  currentIndex:number


  initializeQueue : (songs: Song[]) => void
  playAlbum :  (songs : Song[], startIndex?:number) => void
  setCurrentSong : (song:Song | null) => void
  togglePlay: ()=> void
  playNext : ()=>void
  playPrevious: ()=> void
}


export const usePLayerStore = create<PlayerStore>((set, get)=> ({
  currentSong : null,
  isPlaying : false,
  queue : [],
  currentIndex : -1,

  initializeQueue:(songs : Song[]) => {
    set({
      queue:songs,
      currentSong: get().currentSong || songs[0],
      currentIndex : get().currentIndex === -1 ? 0 : get().currentIndex 
    })
  },
  playAlbum : (songs: Song[], startIndex = 0)=> {
    if(songs.length === 0) return

    const song = songs[startIndex]
    set({
      queue:songs,
      currentSong: song,
      currentIndex : startIndex,
      isPlaying : true
    })

  },
  setCurrentSong : (song: Song | null)=> {
    if(!song) return
    const songIndex = get().queue.findIndex((s)=> s.id === song.id)
    set({
      currentSong: song,
      currentIndex : songIndex !== -1 ? songIndex : get().currentIndex
    })
  },
  togglePlay : ()=> {
    const startStopPlaying = !get().isPlaying
    set({
      isPlaying: startStopPlaying
    })
  },

  playNext : ()=> {
    const {currentIndex, queue} = get()
    const nextIndex = currentIndex + 1

    // Si hay una canción despues de la actual, se reproduce
    if(nextIndex < queue.length){
      const nextSong = queue[nextIndex]
      set({
        currentSong: nextSong,
        currentIndex : nextIndex,
        isPlaying : true
      })
    }else{
      // Si no hay una canción después de la actual, se para la reproducción
      set({isPlaying: false })
    }

  },
  playPrevious : ()=> {
    const {currentIndex, queue} = get()
    const previousIndex = currentIndex - 1

    // Si hay una canción antes de la actual, se reproduce
    if(previousIndex >= 0){
      const previousSong = queue[previousIndex]
      set({
        currentSong: previousSong,
        currentIndex : previousIndex,
        isPlaying : true
      })
    }else{
      // Si no hay una canción después de la actual, se para la reproducción
      set({isPlaying: false })
    }
  },
}))