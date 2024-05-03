import { Album, Artist } from "@/types";
import AlbumItem from "./AlbumItem";
import { useGetAlbumsByArtistId, useOnPlay } from "@/hooks";

interface DiscographyBlockProps {
  artistId: string | undefined;
  albumId?: string;
  headline?: string;
}

const DiscographyBlock: React.FC<DiscographyBlockProps> = ({ artistId, albumId, headline }) => {
  const { albums } = useGetAlbumsByArtistId(artistId);
  const filteredAlbums = [...albums?.filter((album) => album.id.toString() !== albumId)];
  // const onPlay = useOnPlay(songs);

  return (
    <div className="flex flex-col gap-y-2 w-full p-6 bg-transparent">
      <p className="font-bold text-2xl px-2">{headline ? headline : 'Discography'}</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 mt-4">
        {filteredAlbums?.map((album) => (
          <AlbumItem key={album.id} album={album} />
        ))}
      </div>
    </div>
  )
}

export default DiscographyBlock
