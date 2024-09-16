"use client";

import { useGetAlbumsByArtistId, useLoadImage, useSubscribeModal, useUser } from "@/hooks";
import { Artist } from "@/types";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { Glow, GlowCapture } from "@codaworks/react-glow";
import Button from "./ui/Button";

interface BannerProps {
  artists?: Artist[];
  className?: string;
}

const Banner: React.FC<BannerProps> = ({ artists, className }) => {
  const router = useRouter();
  const subscribeModal = useSubscribeModal();
  const { subscription } = useUser();
  const weeknd = artists?.find((artist) => artist.name === "The Weeknd");
  const { albums } = useGetAlbumsByArtistId(weeknd?.id!);
  const imageUrl = useLoadImage(weeknd!);

  const handleRedirect = () => {
    router.push(`/artist/${weeknd?.id}`);
  }

  const onSubscibe = () => {
    return subscribeModal.onOpen();
  }

  return (
      artists ? (
    <div className='group relative w-full h-64 md:h-96 rounded-md bg-cover bg-center flex justify-between text-white cursor-pointer hover:opacity-90 transition-all'
      style={{ backgroundImage: `url(${imageUrl ? imageUrl : '/images/bg-gradient.jpg'})` }}
      onClick={handleRedirect}>
      <div className='px-5 py-5 text-left w-full'>
        <div className="flex justify-between">
          <h2 className='text-sm md:text-base font-bold mb-2 opacity-80'>Artist of the day</h2>
        </div>
        <h1 className='absolute top-[60%] left-[22%] text-4xl md:text-6xl font-semibold mb-4 text-white group-hover:scale-105 group-hover:bg-primary transition-all duration-500 '>{weeknd?.name}</h1>
      </div>
    </div>
    ) : (
      <div className={twMerge(`${subscription?.status === "active" ? 'hidden' : 'flex'} w-full h-64 md:h-96 rounded-md primary-gradient items-center justify-center opacity-90 px-7`, className)}>
        <div className='text-center'>
          <h2 className='text-4xl font-bold mb-2'>Upgrade to <span className="gradient-text">Premium</span></h2>
          <p className='text-xl'>Enjoy unlimited access to exclusive features</p>
          <GlowCapture>
            <Glow color='gradient'>
              <Button
                className="w-[200px] text-black bg-white border-none mt-5 glow:opacity-100 glow:blur-2 glow:gradient glow:spread-2 glow:radius-5"
                onClick={onSubscibe}
              >
                Upgrade
              </Button>
            </Glow>
          </GlowCapture>
        </div>
      </div>
    )
  )
}

export default Banner
