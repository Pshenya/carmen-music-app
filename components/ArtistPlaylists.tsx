import { useGetPlaylistsByArtistId } from "@/hooks";
import AlbumItem from "./AlbumItem";
import { twMerge } from "tailwind-merge";

interface ArtistPlaylistsProps {
  artistId: string;
  headline?: string;
  className?: string;
}

const ArtistPlaylists: React.FC<ArtistPlaylistsProps> = ({ artistId, headline, className }) => {
  const { playlists } = useGetPlaylistsByArtistId(artistId);

  if (playlists.length === 0) return null;

  return (
    <div className={twMerge('flex flex-col gap-y-2 w-full p-6 bg-transparent', className)}>
      {playlists.length !== 0 && <p className="font-bold text-2xl px-4">{headline ? headline : 'Featuring playlists'}</p>}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 mt-4">
        {playlists?.map((playlist) => (
          <AlbumItem key={playlist.id} data={playlist} />
        ))}
      </div>
    </div>
  )
}

export default ArtistPlaylists
