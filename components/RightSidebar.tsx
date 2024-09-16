import React from 'react'
import { twMerge } from 'tailwind-merge';

interface RightSidebarProps {
  isOpen: boolean;
  children: React.ReactNode;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ isOpen, children }) => {

  return (
    <div
      className={`${isOpen ? 'block' : 'hidden'} bg-neutral-700/30 backdrop-filter backdrop-blur-2xl absolute top-0 right-0 w-[300px] h-[calc(100%-85px)] overflow-scroll`}
    >
      <div className={twMerge('flex-col gap-y-2 p-4')}>
        {children}
      </div>
    </div>
  )
}

export default RightSidebar
