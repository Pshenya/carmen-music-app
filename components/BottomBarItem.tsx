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
    <Link href={href} className={twMerge('', active && '')}>
      <Icon size={26} className="text-neutral-300 m-auto"/>
      <p className="truncate w-full text-[10px] text-neutral-300 mt-0.5">{label}</p>
    </Link>
  )
}

export default BottomBarItem
