import { useArtistBioModal, useGetArtists } from "@/hooks";
import { Artist } from "@/types";
import Image from "next/image";

interface ArtistBioProps {
  artist: Artist;
  artistImage: string;
}

const ArtistBio: React.FC<ArtistBioProps> = ({ artist, artistImage }) => {
  const { artists } = useGetArtists();
  const rank = artists.findIndex(a => a.listeners === artist?.listeners) + 1;
  const artistBioModal = useArtistBioModal();
  const formattedListeners = new Intl.NumberFormat('ru-RU').format(artist?.listeners);

  const modalOnOpen = () => {
    artistBioModal.setValues(
      artist.name,
      artistImage,
      artist.listeners,
      artist.bio || '',
      rank
    )
    artistBioModal.onOpen();
  }

  return (
    <div className="p-6 bg-transparent">
      <p className="font-bold text-2xl p-4">About artist</p>
      <div
        className="relative rounded-md max-w-[800px] h-[300px] md:h-[500px] overflow-hidden mx-3 hover:scale-[1.02] transition-all duration-500 cursor-pointer"
        onClick={modalOnOpen}
      >
        <Image
          src={artistImage ? artistImage : '/images/artist-placeholder.png'}
          alt="Artist Image" className="object-cover" fill
        />
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="absolute right-5 top-5 bg-neutral-100 text-black w-20 h-20 rounded-full flex flex-col text-center justify-center items-center">
          <p className="font-bold text-2xl">#{rank}</p>
          <p className="text-xs -mt-1">in the world</p>
        </div>
        <div className="absolute bottom-0 p-10 max-w-[670px]">
          <h1 className="font-bold">{formattedListeners} monthly listeners</h1>
          <p className="mt-2 line-clamp-3 overflow-hidden">{artist?.bio}</p>
        </div>
      </div>
    </div>
  )
}

export default ArtistBio;