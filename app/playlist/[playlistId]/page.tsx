import getPlaylistById from "@/actions/getPlaylistById";
import PlaylistPageContent from "./components/PlaylistPageContent";
import getRecommendedSongs from "@/actions/getRecommendedSongs";
import getPlaylistSongs from "@/actions/getPlaylistSongs";

interface PlaylistPageProps {
  params: {
    playlistId: string;
  },
  searchParams: {
    title: string;
  }
}

const PlaylistPage = async ({ params, searchParams }: PlaylistPageProps) => {
  const playlist = await getPlaylistById(params.playlistId);
  const songs = await getPlaylistSongs(params.playlistId);
  const recommendedSongs = await getRecommendedSongs();

  return (
    <div className="rounded-lg h-full w-full">
      <PlaylistPageContent playlist={playlist} songs={songs} recommendedSongs={recommendedSongs}/>
    </div>
  )
}

export default PlaylistPage;