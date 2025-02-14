import AlbumMainComponent from "@/app/ui/Album/AlbumMainComponent"

export default async function AlbumPage({params}:{params: Promise<{id:string}>}) {
  const id = (await params).id
  return(
    <div className="w-full" style={{padding:0, height:'76%'}}>
      <AlbumMainComponent id={id}/>
    </div>
  )
  
}