'use client';

import { usePathname } from 'next/navigation';
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { LuLibrary } from "react-icons/lu";
import { useMemo } from 'react';
import BottomBarItem from './BottomBarItem';

interface BottomBarProps {

}

const BottomBar:React.FC<BottomBarProps> = () => {
  const pathname = usePathname();

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
    },
    {
      icon: LuLibrary,
      label: 'Library',
      active: pathname === '/library',
      href: '/library',
    }
  ], [pathname]);

  return (
    <div className='md:hidden w-full h-16 bg-neutral-900/95 backdrop-blur fixed bottom-0'>
      <div className='flex items-center justify-evenly gap-10 p-3'>
        {routes.map((item) => (
          <BottomBarItem key={item.label} {...item}/>
        ))}
      </div>
    </div>
  )
}

export default BottomBar
