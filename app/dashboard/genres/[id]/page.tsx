import GenrePageComponent from "@/ui/Genre/GenrePageComponent"

export default async function GenresPage({params}: {params: Promise<{id:string}> }) {
  const id = (await params).id
  return (
    <GenrePageComponent id={id}/>
  )
}