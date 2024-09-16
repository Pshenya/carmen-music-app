"use client";

import Input from '@/components/ui/Input';
import React, { ChangeEvent, FC } from 'react';
import { IoSearch } from 'react-icons/io5';

interface PlaylistSearchInputProps {
  onSearch: (searchInput: string) => void;
}

const PlaylistSearchInput: FC<PlaylistSearchInputProps> = ({ onSearch }) => {
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <div className='relative'>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <IoSearch className="text-neutral-400" />
      </div>
      <Input
        type='text'
        placeholder="Search for songs..."
        onChange={handleSearch}
        className='pl-9 max-w-[500px] text-neutral-400 bg-neutral-800/60'
      />
    </div>
  );
};

export default PlaylistSearchInput;