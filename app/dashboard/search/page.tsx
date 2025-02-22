'use client'
import { GetUserSearchResults } from "@/app/lib/actions/serverActions/getActions";
import { Artist, Playlist, Song } from "@/app/lib/definitions";
import { usePLayerStore } from "@/app/store/usePlayerStore";
import MiniArtistComponent from "@/app/ui/Artist/MiniArtistComponent";
import SearchInput from "@/app/ui/Search/SearchInput";
import SongComponent from "@/app/ui/Song/SongComponent";
import { Box, CircularProgress, List } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import useSWR from "swr";
import { useDebouncedCallback } from 'use-debounce';

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
      <Image
        src="/purpura-vanish.png"
        alt="search"
        width={250}
        height={250}
        style={{ position: "absolute", top: "30%" }}
      />
    )}
  </div>
);


}