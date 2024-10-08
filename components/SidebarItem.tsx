import Link from "next/link"
import { IconType } from "react-icons"
import { twMerge } from "tailwind-merge"

interface SidebarItemProps {
  icon: IconType,
  label: string,
  active?: boolean,
  href: string
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, active, href }) => {
  return (
    <Link href={href} className={twMerge('sidebar-link', active && 'sidebar-link_active')}>
      <Icon size={26} className="text-primary"/>
      <p className="truncate w-full">{label}</p>
    </Link>
  )
}

export default SidebarItem
