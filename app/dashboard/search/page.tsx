'use client'
import { GetUserSearchResults } from "@/app/lib/actions/serverActions/getActions";
import { Artist, Playlist, Song } from "@/app/lib/definitions";
import { usePLayerStore } from "@/app/store/usePlayerStore";
import MiniArtistComponent from "@/app/ui/Artist/MiniArtistComponent";
import SearchInput from "@/app/ui/Search/SearchInput";
import SongComponent from "@/app/ui/Song/SongComponent";
import { CircularProgress, List } from "@mui/material";
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
    <div className="w-full h-full flex flex-col items-center gap-3">
      <SearchInput debounce={debounce}/>
      {isLoading && <CircularProgress />}
      {error && <p>{error.message}</p>}
      {data ?(
        <List sx={{ width: '95%', height:'525px',  overflowY: 'auto' }}>
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
          <p className="text-xl mb-5">Top Artists</p>
          {data.artists.map((artist) => (
            <MiniArtistComponent key={artist.id} artist={artist}/>
          ))}
          <p className="text-xl mb-5">Top Playlists</p>
        </List>
      ):
      <Image src="/purpura-vanish.png" alt="search" width={250} height={250} style={{position:'absolute', top:'30%'}} />
    
    }
    </div>
  );
}