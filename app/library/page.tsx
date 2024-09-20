import getPlaylistsByUserId from "@/actions/getPlaylistsByUserId";
import getSongsByUserId from "@/actions/getSongsByUserId";
import DropdownMenu from "@/components/DropdownMenu";
import Header from "@/components/Header";
import Library from "@/components/Library";
import LibraryPageContent from "./components/LibraryPageContent";

const LibraryPage = async () => {
  const userSongs = await getSongsByUserId();
  const userPlaylists = await getPlaylistsByUserId();

  return (
    <div className="h-full w-full overflow-hidden overflow-y-auto ">
      <Header className="pb-2">
        <></>
      </Header>
      <div className="bg-black bg-opacity-65 backdrop-blur h-full">
        <LibraryPageContent songs={userSongs} playlists={userPlaylists}/>
      </div>
    </div>
  )
}

export default LibraryPage;
