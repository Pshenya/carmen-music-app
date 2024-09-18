"use client";

import { Album, Artist, Playlist, Song } from '@/types';
import { useRef } from 'react';
import SongItem from './SongItem';
import { useGetArtistsPlaylists, useGetPlaylistsByArtistId, useOnPlay, usePlayer } from '@/hooks';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import PlaylistItem from './Playlists/PlaylistItem';
import AlbumItem from './AlbumItem';
import SongList from './SongList';
import MediaItem from './MediaItem';
import MediaListItem from './MediaListItem';
import { twMerge } from 'tailwind-merge';

interface ScrollContainerProps {
  songs?: Song[];
  playlists?: Playlist[];
  albums?: Album[];
  section: 'songs' | 'artists' | 'albums' | 'charts' | 'for you' | 'song list';
  className?: string;
}

const ScrollContainer: React.FC<ScrollContainerProps> = ({ songs, playlists, albums, section, className}) => {
  const scrollContainer = useRef<HTMLDivElement>(null);
  const { onPlay } = useOnPlay(songs);
  const player = usePlayer();
  const { playlists: artistPlaylists } = useGetArtistsPlaylists();

  const scroll = (scrollOffset: number) => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollLeft += scrollOffset;
    }
  };

  const charts = playlists?.filter(playlist => playlist.name.includes('Top 100'));
  const forYou = playlists
    ?.filter(playlist => !playlist.name.includes('Top 100') && !playlist.artist_id)
    .sort((a, b) => +b.name.includes('Mix') - +a.name.includes('Mix'));


  return (
    <div className={twMerge("flex items-center mt-1 overflow-hidden px-3", className)}>
      <div className="absolute top-0 right-3 pt-1 hidden md:flex gap-x-1 items-center">
        <button
            className="group flex items-center justify-center p-1 rounded-full bg-transparent border border-neutral-400 hover:border-white transition"
            onClick={() => scroll(-500)}
        >
          <RxCaretLeft className="text-neutral-400 group-hover:text-white transition" size={20}/>
        </button>
        <button
            className="group flex items-center justify-center p-1 rounded-full bg-transparent border border-neutral-400 hover:border-white transition"
            onClick={() => scroll(500)}
        >
          <RxCaretRight className="text-neutral-400 group-hover:text-white transition" size={20}/>
        </button>
      </div>
      <div ref={scrollContainer} className="flex overflow-x-auto gap-1">
        {section === 'songs' && songs?.map((song) => (
          <div key={song.id}>
            <SongItem key={song.id} data={song} onClick={(id: string) => onPlay(id)} />
          </div>
        ))}
        {section === 'artists' && artistPlaylists.map((playlist) => (
          <div key={playlist.id}>
            <AlbumItem data={playlist} />
          </div>
        ))}
        {section === 'charts' && charts?.map((playlist) => (
          <div key={playlist.id}>
            <AlbumItem data={playlist} />
          </div>
        ))}
        {section === 'for you' && forYou?.map((playlist) => (
          <div key={playlist.id}>
            <AlbumItem data={playlist} />
          </div>
        ))}
        {section === 'albums' && albums?.map((album) => (
          <div key={album.id}>
            <AlbumItem data={album} />
          </div>
        ))}
        <div className='grid-songlist'>
          {section === 'song list' && songs?.map((song) => (
            <div key={song.id} className="group min-w-64 md:min-w-96 rounded-md hover:bg-neutral-400/20" >
              <MediaListItem
                key={song.id}
                data={song}
                showDetails
                activeId={player.activeId}
                onClick={() => onPlay(song.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ScrollContainer;