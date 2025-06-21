'use client'
import { GetUserSearchResults } from "@/lib/serverActions/GetActions";
import { Artist, Playlist, Song } from "@/lib/definitions/definitions";
import { usePLayerStore } from "@/store/usePlayerStore";
import MiniArtistComponent from "@/ui/Artist/MiniArtistComponent";
import SearchInput from "@/ui/Search/SearchInput";
import SongComponent from "@/ui/Song/SongComponent";
import { Box, CircularProgress, List } from "@mui/material";
import { useState } from "react";
import useSWR from "swr";
import { useDebouncedCallback } from 'use-debounce';
import GenresViewComponent from "@/ui/Genre/GenresViewComponent";

interface DataType {
  songs: Song[];
  artists: Artist[];
  playlists: Playlist[];
}

export default function SearchPage() {
  const [input, setInput] = useState('');

  const fetcher = async ([, searchQuery]: [string, string]) => {
    if (!searchQuery) return null;
    return await GetUserSearchResults(searchQuery);
  };

  const { data, error, isLoading } = useSWR<DataType>(['results', input], fetcher);

  const debounce = useDebouncedCallback((searchQuery: string) => {
    setInput(searchQuery);
  }, 500);

  const { currentSong, isPlaying, playAlbum } = usePLayerStore();

  const handlePlaySong = (index: number) => {
    if (!data?.songs) return;
    playAlbum(data.songs, index);
  };


return (
  
  <div className="w-full flex flex-col h-screen items-center gap-3">
    <SearchInput debounce={debounce}/>
    {isLoading &&(
      <div className="w-full flex flex-col h-screen items-center pt-40">
        <CircularProgress />

      </div>)}
    {error && <p className="mt-10">{error.message}</p>}
    {data ? (
       <Box
       sx={{
         display: "flex",
         flexDirection: "column",
         width: "100%",
         height: "100vh",
         backgroundColor: "#010101",
         color: "#fff",
         fontFamily: "Montserrat",
       }}
     >
        <Box sx={{ flex: 1, overflowY: "auto", pb: "150px", px: 2, pt: 15, width: "100%" }}>
          <List sx={{ width: '100%' }}>
            <p className="text-xl mb-5">Top Songs</p>
            {data.songs.map((song, index) => {
              const isCurrent = currentSong?.id === song.id;
              return (
                <div key={song.id} className="w-full">
                  {isCurrent && isPlaying ? (
                    <SongComponent current song={song} handlePLaySong={handlePlaySong} index={index} />
                  ) : (
                    <SongComponent current={false} song={song} handlePLaySong={handlePlaySong} index={index} />
                  )}
                </div>
              );
            })}
              <p className="text-xl mb-5 ">Top Artists</p>
            <div className="flex items-center overflow-x-auto w-[90vw] ">
              {data.artists.map((artist) => (
                <MiniArtistComponent key={artist.id} artist={artist}/>
              ))}
            </div>
          </List>
        </Box>

     </Box>
    ) : (
      <GenresViewComponent/>
    )}
  </div>
);


}