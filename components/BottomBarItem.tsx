import Link from 'next/link';
import { IconType } from 'react-icons';
import { twMerge } from 'tailwind-merge';

interface BottomBarItemProps {
  icon: IconType,
  label: string,
  active?: boolean,
  href: string,
}

const BottomBarItem:React.FC<BottomBarItemProps> = ({icon: Icon, label, active, href}) => {

  return (
    <Link href={href} className={twMerge('text-neutral-400', active && 'text-white')}>
      <Icon size={26} className=" m-auto"/>
      <p className="truncate w-full text-[10px] mt-0.5">{label}</p>
    </Link>
  )
}

export default BottomBarItem
