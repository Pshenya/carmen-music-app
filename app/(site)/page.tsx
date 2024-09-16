import getSongs from "@/actions/getSongs";
import getArtists from "@/actions/getArtists";
import getPlaylists from "@/actions/getPlaylists";
import getAlbums from "@/actions/getAlbums";
import Header from "@/components/Header";
import PageContent from "./components/PageContent";
import Banner from "@/components/Banner";
import TopArtistItem from "@/components/TopArtistItem";
import NewReleaseItem from "@/components/NewReleaseItem";

export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs();
  const artists = await getArtists();
  const albums = await getAlbums();
  const playlists = await getPlaylists();

  return (
    <div className="w-full h-full overflow-hidden overflow-y-auto bg-black">
      <Header>
        <div className="flex mb-2 gap-4">
          <Banner artists={artists}/>
          <Banner className="max-w-[350px]"/>
          <div className='hidden md:flex flex-col gap-3 min-w-[300px] '>
            <h1 className="text-white font-semibold pb-2 pl-7">
              New releases
            </h1>
            {albums.slice(0,4).map((album, index) => (
              <NewReleaseItem key={album.id} album={album}/>
            ))}
          </div>
        </div>
      </Header>
      <div className="pt-2 mb-7 bg-black bg-opacity-65 backdrop-blur-md">
        <div>
          <PageContent songs={songs} artists={artists} albums={albums} playlists={playlists} />
        </div>
      </div>
    </div>
  );
}
