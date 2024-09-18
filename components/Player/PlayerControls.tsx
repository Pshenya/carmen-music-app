import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { FaRepeat, FaShuffle } from "react-icons/fa6";

interface PlaybackControlsProps {
  isPlaying: boolean;
  isShuffled: boolean;
  isRepeating: boolean;
  onPlay: () => void;
  onPlayNext: () => void;
  onPlayPrevious: () => void;
  onShuffle: () => void;
  onRepeat: () => void;
}

const PlayerControls: React.FC<PlaybackControlsProps> = ({ ...props }) => {
  const { isPlaying, isShuffled, isRepeating, onPlay, onPlayNext, onPlayPrevious, onShuffle, onRepeat } = props;
  const PlaybackIcon = isPlaying ? BsPauseFill : BsPlayFill;

  return (
    <>
      {/* Mobile only playback */}
      <div className="flex md:hidden col-auto w-full justify-end items-center mt-5 md:mt-4">
      <div
        className="h-10 w-10 flex items-center justify-center rounded-full bg-primary p-1 cursor-pointer"
        onClick={onPlay}
      >
        <PlaybackIcon className="text-black" size={30}/>
      </div>
    </div>

    {/* Desktop playback */}
    <div className="hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-5 -mb-[12px]">
      <div
        className={`icon-container ${isShuffled ? 'is-active' : ''}`}
        onClick={onShuffle}
      >
        <FaShuffle
          className={`${isShuffled ? 'text-primary/90 hover:text-primary' : 'text-neutral-400 hover:text-white'} cursor-pointer transition`}
        />
      </div>
      <AiFillStepBackward
        className="text-neutral-400 text-[24px] cursor-pointer hover:text-white transition"
        onClick={onPlayPrevious}
      />
      <div
        className="flex items-center justify-center h-10 w-10 rounded-full bg-primary p-1 cursor-pointer transition duration-100 transform hover:scale-105 active:scale-90"
        onClick={onPlay}
      >
        <PlaybackIcon className={`text-black ${PlaybackIcon === BsPlayFill && 'ml-[2px]'}`} size={26}/>
      </div>
      <AiFillStepForward
        className="text-neutral-400 text-[24px] cursor-pointer hover:text-white transition"
        onClick={onPlayNext}
      />
      <div
        className={`icon-container ${isRepeating ? 'is-active' : ''}`}
        onClick={onRepeat}
      >
        <FaRepeat
          className={`${isRepeating ? 'text-primary/90 hover:text-primary' : 'text-neutral-400 hover:text-white'} cursor-pointer transition`}
        />
      </div>
    </div>
  </>
  )
}

export default PlayerControls
