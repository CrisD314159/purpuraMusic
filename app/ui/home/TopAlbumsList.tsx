import { GetTopAlbums } from "@/app/lib/actions/serverActions/getActions";
import { Album } from "@/app/lib/definitions";
import { CircularProgress, List } from "@mui/material";
import useSWR from "swr";
import MiniAlbumComponent from "../Album/MiniAlbumComponent";

export default function TopAlbumsList() {

  const fetcher = async () => {
    const response = await GetTopAlbums();
    return response;
  };

  const {data, error, isLoading} = useSWR<Album[]>('topAlbums', fetcher)

  return (
    <div className="w-full flex flex-col mt-5 gap-3 px-3">
      <h1 className="text-2xl">Top Albums for you</h1>
      <List sx={{width:'100%', overflowX:'auto', display:'flex', gap:3}}>
        {error && <p>An error occurred while fetching the albums</p>}
        {isLoading && <CircularProgress />}
        {data && 
        data.map((album)=>{
          return (
            <MiniAlbumComponent key={album.id} album={album}/>
          )
        })
        }

      </List>
    </div>
  )
}