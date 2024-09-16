"use client";

import * as RadixSlider from "@radix-ui/react-slider";

interface PlaybackSliderProps {
  value?: number;
  onChange?: (value: number) => void;
}

const PlaybackSlider: React.FC<PlaybackSliderProps> = ({ value = 1, onChange }) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  }


  return (
    <RadixSlider.Root
      className="group relative flex items-center select-none touch-none w-full h-10 cursor-pointer"
      defaultValue={[1]}
      value={[value]}
      onValueChange={handleChange}
      max={1}
      step={0.001}
      aria-label="Duration"
    >
      <RadixSlider.Track className="bg-neutral-600 relative grow rounded-full h-[4px]">
        <RadixSlider.Range className="bg-primary absolute h-full rounded-full" />
      </RadixSlider.Track>
      <RadixSlider.Thumb className="hidden group-hover:block bg-white w-[10px] h-[10px] rounded-lg drop-shadow-md" aria-label="Duration" />
    </RadixSlider.Root>
  )
}

export default PlaybackSlider;
