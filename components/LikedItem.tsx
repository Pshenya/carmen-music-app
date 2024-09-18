"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa";
import { TbPinnedFilled } from "react-icons/tb";
import { twMerge } from "tailwind-merge";

interface LikedItemProps {
  image: string;
  width?: number;
  height?: number;
  name: string;
  description?: string;
  href: string;
  pinned?: boolean;
  className?: string;
}

const LikedItem: React.FC<LikedItemProps> = ({ image, width, height, name, description, href, pinned, className }) => {
  const router = useRouter();

  const onClick = () => {
    // Add auth before pushing to href
    router.push(href);
  }

  return (
    <button
        className={twMerge('relative group flex items-center rounded-md overflow-hidden gap-x-3 bg-neutral-500/20 hover:bg-neutral-400/20 transition pr-4 mr-1', className)}
        onClick={onClick}
    >
      <div className={`${height || width ? `min-h-[${height}px] min-w-[${width}px]` : 'min-h-[58px] md:min-h-[64px] min-w-[58px] md:min-w-[64px]'} relative`}>
        <Image className="object-cover" fill src={image} alt="Liked"/>
      </div>
      <div className="flex flex-col">
        <p className="font-medium truncate gradient-text">{name}</p>
        <div className="flex items-center gap-1">
          {pinned && <TbPinnedFilled className="text-lg text-primary rotate-45 -ml-[3px]"/>}
          <p className="text-neutral-400 truncate text-left">{description}</p>
        </div>
      </div>
    </button>
  )
}

export default LikedItem
