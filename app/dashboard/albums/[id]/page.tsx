import AlbumMainComponent from "@/ui/Album/AlbumMainComponent"

export default async function AlbumPage({params}:{params: Promise<{id:string}>}) {
  const id = (await params).id
  return(
    
      <AlbumMainComponent id={id}/>
   
  )
  
}