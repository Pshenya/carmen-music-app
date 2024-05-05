import React from 'react'
import { twMerge } from 'tailwind-merge';

interface RightSidebarProps {
  isOpen: boolean;
  children: React.ReactNode;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ isOpen, children }) => {

  return (
    <div
      className={`${isOpen ? 'block' : 'hidden'} bg-black absolute top-0 right-0 w-[300px] h-[calc(100%-85px)] overflow-scroll`}
    >
      <div className={twMerge('flex-col gap-y-2 bg-black p-4')}>
        {children}
      </div>
    </div>
  )
}

export default RightSidebar
