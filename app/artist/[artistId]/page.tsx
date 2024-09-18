import getAlbumsByArtistId from "@/actions/getAlbumsByArtistId";
import getSongsByArtistId from "@/actions/getSongsByArtistId";
import ArtistPageContent from "./components/ArtistPageContent";

const ArtistPage = async ({ params }: { params: {artistId: string} }) => {
  const songs = await getSongsByArtistId(params.artistId);
  const albums = await getAlbumsByArtistId(params.artistId);


  return (
    <div className="bg-neutral-900 h-full w-full overflow-hidden overflow-y-auto">
      <ArtistPageContent artistId={params.artistId} songs={songs} albums={albums}/>
    </div>
  )
}

export default ArtistPage;