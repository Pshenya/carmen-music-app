"use client";

import uniqid from 'uniqid';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import toast from 'react-hot-toast';
import { useUser, useUploadModal } from '@/hooks';
import Modal from './Modal'
import Input from './Input';
import Button from './Button';
import { formatAudioDuration, getAudioDuration, sanitizeString, transliterateCyrillicToLatin } from '@/utils/utils';

const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const uploadModal = useUploadModal();
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: '',
      title: '',
      album: '',
      album_type: '',
      song: null,
      image: null
    }
  });


  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  }



  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {

      setIsLoading(true);

      // Making sure the title doesn't contain any problematic special characters and is in latin
      const finalSongTitle = sanitizeString(transliterateCyrillicToLatin(values.title));
      console.log("FINAL SONG TITLE: ", finalSongTitle);

      /**
      |--------------------------------------------------
      | TODO: Handle featured artists and featured songs
      |--------------------------------------------------
      */
      // const artists = values.author.split(',').map((artist: string) => artist.trim());
      // console.log("ARTISTS: ", artists);

      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!imageFile || !songFile || !user) {
        toast.error('Missing fields');
        return;
      }

      const songDuration = await getAudioDuration(songFile);

      const uniqueID = uniqid();

      // Upload song
      const {
        data: songData,
        error: songError
      } = await supabaseClient
        .storage
        .from('songs')
        .upload(`song-${finalSongTitle}-${uniqueID}`, songFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (songError) {
        setIsLoading(false);
        console.log("ERROR: ", songError);
        return toast.error('Failed to upload song');
      }

     // Generate image path
      const imagePath = `image-${sanitizeString(transliterateCyrillicToLatin(values.album))}`;

      // List all images
      const { data: images, error: listError } = await supabaseClient
        .storage
        .from('images')
        .list();

      if (listError) {
        setIsLoading(false);
        return toast.error('Failed to list images');
      }

      // Check if image with similar name already exists
      const existingImage = images?.find((image) => image.name.startsWith(imagePath));

      let imageData = null;

      // If image doesn't exist, upload it
      if (!existingImage) {
        const { data, error: uploadError } = await supabaseClient
          .storage
          .from('images')
          .upload(`${imagePath}-${uniqueID}`, imageFile, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) {
          setIsLoading(false);
          return toast.error('Failed to upload image');
        }

        imageData = data;
      }

      // Retrieve artist ID
      const { data: artistData, error: artistError } =
        await supabaseClient.from('artists').select('id').eq('name', values.author).single();

      if(!artistData) {
        // Inset artist
        const { error: supabaseArtistError } =
        await supabaseClient.from('artists').insert({
          name: values.author,
          image_path: `artists/${values.author}`
        });

        if (supabaseArtistError) {
          setIsLoading(false);
          return toast.error(supabaseArtistError.message);
        }
      }

      let artistId = artistData?.id;
      let albumId;

      // Retrieve album ID
      const { data: albumData, error: albumError } =
        await supabaseClient.from('albums').select('id').eq('name', values.album).single();

      if (!albumData || albumError) {
        console.log("ALBUM DOESN'T EXIST");
        if (!artistData) {
          const { data: artistData, error: artistError } =
            await supabaseClient.from('artists').select('id').eq('name', values.author).single();

          if (artistError) {
            setIsLoading(false);
            console.log("GET ARTIST ERROR: ", artistError.message);
            return toast.error(artistError.message);
          }

          artistId = artistData?.id;
        }

        // Insert album
        const { error: supabaseAlbumError } =
        await supabaseClient.from('albums').insert({
          name: values.album,
          album_type: values.album_type,
          artist_id: artistId,
          image_path: existingImage ? existingImage.name : imageData?.path,
        });

        const { data: albumData, error: albumError } =
          await supabaseClient.from('albums').select('id').eq('name', values.album).single();

        if (albumError) {
          setIsLoading(false);
          console.log("GET ALBUM ERROR: ", albumError.message);
          return toast.error(albumError.message);
        }

        albumId = albumData?.id;

        if (supabaseAlbumError) {
          setIsLoading(false);
          console.log("INSERT ALBUM ERROR: ", supabaseAlbumError.message);
          return toast.error(supabaseAlbumError.message);
        }
      }

      // Insert song
      const { error: supabaseError } =
        await supabaseClient.from('songs').insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          artist_id: artistId,
          album_id: albumData ? albumData.id : albumId,
          image_path: existingImage ? existingImage.name : imageData?.path,
          song_path: songData.path,
          duration: songDuration
        });

      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }

      router.refresh();
      setIsLoading(false);
      toast.success('Song uploaded successfully');
      reset();
      uploadModal.onClose();

    } catch (error) {
      toast.error('Oops, something went wrong!');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal title='Add a song' description='Upload an .mp3 file' isOpen={uploadModal.isOpen} onChange={onChange}>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4'>
        <Input id="title" disabled={isLoading} {...register('title', { required: true })} placeholder="Song title" />
        <Input id="author" disabled={isLoading} {...register('author', { required: true })} placeholder="Artist" />
        <div>
          <Input id="album" disabled={isLoading} {...register('album', { required: true })} placeholder="Album name" defaultValue=""/>
          <p className='text-neutral-500 text-sm font-normal'>* Enter the exact album name from Spotify</p>
        </div>
        <div>
          <Input id="album_type" disabled={isLoading} {...register('album_type', { required: false })} placeholder="Album type (Single if empty)" />
          <p className='text-neutral-500 text-sm font-normal'>* Album, Single, or EP (in that exact naming)</p>
        </div>
        <div>
          <div className='pb-1'>
            Select a song file
          </div>
          <Input id="song" type="file" disabled={isLoading} accept=".mp3" {...register('song', { required: true })} />
        </div>
        <div>
          <div className='pb-1'>
            Select a cover image
          </div>
          <Input id="image" type="file" disabled={isLoading} accept="image/*" {...register('image', { required: true })} />
        </div>
        <Button type="submit" disabled={isLoading}>
          Create
        </Button>
      </form>
    </Modal>
  )
}

export default UploadModal
