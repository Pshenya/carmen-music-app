import { useGetAlbumsByArtistId, useOnPlay } from "@/hooks";
import { twMerge } from "tailwind-merge";
import ScrollContainer from "./ScrollContainer";

interface DiscographyBlockProps {
  artistId: string | undefined;
  albumId?: string;
  headline?: string;
  className?: string;
}

const DiscographyBlock: React.FC<DiscographyBlockProps> = ({ artistId, albumId, headline, className }) => {
  const { albums } = useGetAlbumsByArtistId(artistId);
  const filteredAlbums = [...albums?.filter((album) => album.id.toString() !== albumId)];

  return (
    <div className={twMerge('flex flex-col gap-y-2 w-full p-6 bg-black bg-opacity-65 backdrop-blur mt-10', className)}>
      {filteredAlbums.length !== 0 && <p className="font-bold text-2xl px-4">{headline ? headline : 'Discography'}</p>}
        <ScrollContainer albums={filteredAlbums} section="albums"/>
    </div>
  )
}

export default DiscographyBlock
