import ArtistMainComponent from "@/ui/Artist/ArtistMainComponent"

export default async function ArtistPage({params}: {params: Promise<{id:string}> }) {
  const id = (await params).id
  return (
    <ArtistMainComponent id={id}/>
  )
  
}