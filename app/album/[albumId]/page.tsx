"use client";

import { useGetAlbumById, useGetArtistById, useGetSongsByAlbumId } from '@/hooks';
import AlbumPageContent from './components/AlbumPageContent'

const AlbumPage = ({ params }: { params: {albumId: string} }) => {
  const { album } = useGetAlbumById(params.albumId);
  const { songs } = useGetSongsByAlbumId(params.albumId);

  return (
    <div className="rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <AlbumPageContent albumId={params.albumId} album={album} songs={songs} />
    </div>
  )
}

export default AlbumPage
