import { GetTopSongs } from "@/lib/serverActions/GetActions";
import { Song } from "@/lib/definitions/definitions";
import { CircularProgress, List } from "@mui/material";
import useSWR from "swr";

import SongComponent from "../Song/SongComponent";
import { usePLayerStore } from "@/store/usePlayerStore"; 
import { AddPlay } from "@/lib/serverActions/PostActions";

export default function TopSongsList() {

  const {playAlbum, currentSong, isPlaying} = usePLayerStore()

  const fetcher = async () => {
    const response = await GetTopSongs();
    return response;
  };

 
  const {data, error, isLoading} = useSWR<Song[]>('topSongs', fetcher)

  const handlePlaySong = async (index: number, song:Song)=>{
    if(!data) return
    playAlbum(data, index)
    await AddPlay(song.id)
  }


  return (
    <div className="w-full flex flex-col mt-10 gap-3 px-3">
      <h1 className="text-2xl">Top 10 Songs for you</h1>
      <List sx={{width:'100%', overflowY:'auto', display:'flex', gap:1, flexDirection:'column', alignItems:'center'}}>
        {error && (
          <div className="w-full flex justify-center items-center">
            <p>An error occurred while fetching the songs</p>
          </div>
        )}
        {isLoading && (
          <div className="w-full flex justify-center items-center">
          <CircularProgress />
        </div>
        )}
        {data && 
        data.map((song, index)=>{
           const isCurrent = currentSong?.id === song.id
           return (
            <div key={song.id} className="w-full">
              {isCurrent && isPlaying ? (
                <div className="w-full flex items-center  gap-3">
                  <SongComponent notShowArtist={true} current song={song} handlePLaySong={()=> handlePlaySong(index, song)} index={index} />
                </div>
              ) : (
                <div className="w-full flex items-center gap-3">
                  <SongComponent notShowArtist={true}  current={false} song={song} handlePLaySong={()=> handlePlaySong(index, song)} index={index} />

                </div>
              )}
            </div>
          )
        })
        }

      </List>
    </div>
  )
}