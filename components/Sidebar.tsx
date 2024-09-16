"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { Playlist, Song } from "@/types";
import { usePlayer } from "@/hooks";
import Box from "./ui/Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";
import { twMerge } from "tailwind-merge";

interface SidebarProps {
  children: React.ReactNode;
  songs: Song[];
  playlists: Playlist[];
}

const Sidebar: React.FC<SidebarProps> = ({ children, songs, playlists }) => {
  const pathname = usePathname();
  const player = usePlayer();

  const routes = useMemo(() => [
    {
      icon: HiHome,
      label: 'Home',
      active: pathname !== '/search',
      href: '/',
    },
    {
      icon: BiSearch,
      label: 'Search',
      active: pathname === '/search',
      href: '/search',
    }
  ], [pathname]);

  return (
    <div className={twMerge('flex h-full')}>
      <div className="hidden md:flex flex-col gap-y-2 h-full w-[300px] border-r border-neutral-800 z-20">
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4 border-b border-neutral-800">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <Library songs={songs} playlists={playlists}/>
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}

export default Sidebar
