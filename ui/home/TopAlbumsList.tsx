import { GetTopArtists } from "@/lib/serverActions/GetActions";
import { Artist } from "@/lib/definitions/definitions";
import { CircularProgress, List } from "@mui/material";
import useSWR from "swr";
import MiniArtistComponent from "../Artist/MiniArtistComponent";

export default function TopAlbumsList() {

  const fetcher = async () => {
    const response = await GetTopArtists();
    return response;
  };

  const {data, error, isLoading} = useSWR<Artist[]>('topAlbums', fetcher)

  return (
    <div className="w-full flex flex-col mt-5 gap-3 px-3">
      <h1 className="text-2xl">Top Artists for you</h1>
      <List sx={{width:'100%', overflowX:'auto', display:'flex', gap:3}}>
        {error && (
          <div className="w-full flex justify-center items-center">
            <p>An error occurred while fetching the albums</p>
          </div>
        )}
        {isLoading && (
          <div className="w-full flex justify-center items-center">
            <CircularProgress />
          </div>
        )}
        {data && 
        data.map((artist)=>{
          return (
            <MiniArtistComponent artist={artist} key={artist.id}/>
          )
        })
        }

      </List>
    </div>
  )
}