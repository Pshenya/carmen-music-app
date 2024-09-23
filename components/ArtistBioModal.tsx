"use client";

import { useArtistBioModal } from "@/hooks";
import Modal from "./Modal";
import Image from "next/image";

const ArtistBioModal = () => {
  const artistBioModal = useArtistBioModal();
  const formattedListeners = (x: number) => {
    return new Intl.NumberFormat('ru-RU').format(x);
  }

  const onChange = (open: boolean) => {
    artistBioModal.onClose();
  }

  return (
    <Modal
      title={artistBioModal.name}
      isOpen={artistBioModal.isOpen}
      onChange={onChange}
      className="artist-modal"
    >
      <div className="relative max-w-[800px] h-[500px]">
        <Image src={artistBioModal.imageUrl || '/images/artist-placeholder.png'} alt="Artist image" fill className="object-cover h-auto"/>
      </div>
      <div className="flex flex-col md:flex-row mt-5 md:mt-10">
        <div className="flex md:flex-col gap-16 md:gap-10 px-8 min-w-[220px]">
          <div className="flex flex-col bg-neutral-100 text-black w-20 h-20 rounded-full text-center justify-center items-center">
            <p className="font-bold text-2xl">#{artistBioModal.rank}</p>
            <p className="text-xs -mt-1">in the world</p>
          </div>
          <div className="self-center md:self-start">
            <p className="text-2xl font-bold">{formattedListeners(artistBioModal.listeners)}</p>
            <p className="text-sm text-neutral-300">Listeners</p>
          </div>
        </div>
        <div className="p-2 mt-2 md:mt-0">
          {artistBioModal.bio}
        </div>
      </div>
    </Modal>
  )
}

export default ArtistBioModal;
