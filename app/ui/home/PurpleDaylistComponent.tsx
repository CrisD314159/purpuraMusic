import { GetPurpleDaylist } from "@/app/lib/actions/serverActions/getActions"
import { CircularProgress } from "@mui/material"
import useSWR from "swr"
import PlayListDialogComponent from "../Playlists/PlayListDialog/PlayListDialogComponent"
import { Playlist } from "@/app/lib/definitions"
import "@/app/css/linearGradientAnimation.css"

const fecher = async()=>{
  const response = await GetPurpleDaylist()
  return response
}

export default function PurpleDaylistComponent() {
  const {data, error, isLoading} = useSWR<Playlist>('purpleDaylist', fecher)

  return (
    <div className="w-full flex flex-col justify-center items-center mt-7 pt-4 rounded lineardark">
      <h1 className="text-2xl">Purple Daylist</h1>
      {error && <p>An error occurred while fetching the purple daylist</p>}
      {isLoading && <CircularProgress/>}
      {data && 
        <PlayListDialogComponent playlist={data}/>
      }
    </div>
  )
}