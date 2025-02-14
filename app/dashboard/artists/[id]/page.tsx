import ArtistMainComponent from "@/app/ui/Artist/ArtistMainComponent"
import { List } from "@mui/material"

export default async function ArtistPage({params}: {params: Promise<{id:string}> }) {
  const id = (await params).id
  return (
    <List className="w-full" style={{padding:0, overflowY:'auto', height:'80%'}}>
      <ArtistMainComponent id={id}/>
    </List>
  )
  
}