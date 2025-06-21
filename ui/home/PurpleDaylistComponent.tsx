import { GetPurpleDaylist } from "@/lib/serverActions/GetActions"
import { CircularProgress } from "@mui/material"
import useSWR from "swr"
import { Playlist } from "@/lib/definitions/definitions"
import "@/css/linearGradientAnimation.css"
import PurplePlayListDialog from "../PurplePlaylist/PurplePlayListDialog"

const fecher = async()=>{
  const response = await GetPurpleDaylist()
  return response
}

export default function PurpleDaylistComponent() {
  const {data, error, isLoading} = useSWR<Playlist>('purpleDaylist', fecher)

  return (
    <div className="w-full flex flex-col justify-center items-center mt-7 pt-4 rounded">
      <h1 className="text-2xl">Purple Daylist</h1>
      {error && <p>An error occurred while fetching the purple daylist</p>}
      {isLoading && <CircularProgress/>}
      {data && 
        <PurplePlayListDialog playlist={data}/>
      }
    </div>
  )
}