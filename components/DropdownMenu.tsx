import * as RadixDropdown from "@radix-ui/react-dropdown-menu";
import { AiOutlinePlus } from "react-icons/ai";
import { RiPlayListFill } from "react-icons/ri";
import { TbMusicPlus } from "react-icons/tb";

interface DropdownMenuProps {
  onUploadClick: (e: React.MouseEvent<HTMLElement>) => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ onUploadClick }) => {

  return (
    <RadixDropdown.Root>
      <RadixDropdown.Trigger className="focus:outline-none">
        <AiOutlinePlus className="text-neutral-400 cursor-pointer hover:text-white transition" size={20} />
      </RadixDropdown.Trigger>
      <RadixDropdown.Content className="dropdown-content flex flex-col p-2 gap-3 absolute -left-3 top-2">
        <RadixDropdown.Item id="add_song" className="dropdown-item gap-2" onClick={onUploadClick}>
          <TbMusicPlus className="text-xl text-primary"/>
          <span>Add a song</span>
        </RadixDropdown.Item>
        <RadixDropdown.Item id="add_playlist" className="dropdown-item gap-2" onClick={onUploadClick}>
          <RiPlayListFill className="text-xl text-primary"/>
          <span>Create a new playlist</span>
        </RadixDropdown.Item>
      </RadixDropdown.Content>
    </RadixDropdown.Root>
  )
}

export default DropdownMenu
