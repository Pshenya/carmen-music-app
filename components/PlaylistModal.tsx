"use client";

import { useEffect, useState } from 'react'
import uniqid from 'uniqid';
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, set, useForm } from 'react-hook-form';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { usePlaylistModal, useUser } from '@/hooks';
import Image from 'next/image';
import Modal from './Modal'
import Input from './ui/Input'
import Textarea from './ui/Textarea';
import Button from './ui/Button';
import toast from 'react-hot-toast';
import { RiPlayListFill } from 'react-icons/ri';
import { FaPen } from 'react-icons/fa';
import { sanitizeString, transliterateCyrillicToLatin } from '@/utils/utils';

const PlaylistModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageObject, setImageObject] = useState<string | null>(null);
  const playlistModal = usePlaylistModal();
  const { user } = useUser();
  const adminUserId = process.env.NEXT_PUBLIC_ADMIN_USER_ID;
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const { register, setValue, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      image: null,
      name: '',
      description: '',
      artistName: '',
    }
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      setImageObject(null);
      playlistModal.resetValues();
      playlistModal.onClose();
    }
  }

  useEffect(() => {
    if (playlistModal.isOpen) {
      setValue('name', playlistModal.name || '');
      setValue('description', playlistModal.description || '');
      setValue('artistName', playlistModal.artistName || '');
      if (playlistModal.imageUrl) {
        setImageObject(playlistModal.imageUrl);
        setValue('image', playlistModal.imageUrl || null);
      }
    }
  }, [playlistModal.isOpen, playlistModal.name, playlistModal.description, playlistModal.artistName, playlistModal.imageUrl, setValue]);

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const imageFile = values.image?.[0];
      console.log("IMAGE FILE: ", imageFile)


      if (!user) {
        toast.error('Missing fields');
        return;
      }

      const uniqueID = uniqid();


      let artistData;

      if(values.artistName) {
        // Retrieve artist ID
        const { data, error: artistError } =
        await supabaseClient.from('artists').select('id').eq('name', values.artistName).single();

        if (artistError) {
          setIsLoading(false);
          return toast.error(artistError.message);
        }

        artistData = data;
      }

      // Generate image path
      const imagePath = `playlists/image-${sanitizeString(transliterateCyrillicToLatin(values.name))}-${uniqueID}`;

      // Only upload image if user has chosen or updated it
      if (imageFile) {
        const { data, error: uploadError } = await supabaseClient
          .storage
          .from('images')
          .upload(`${imagePath}`, imageFile, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) {
          setIsLoading(false);
          return toast.error('Failed to upload image');
        }
      }


      if (playlistModal.action_type === 'create') {
        const { error: supabaseError } =
          await supabaseClient.from('playlists').insert({
            user_id: user.id,
            name: values.name,
            description: values.description,
            image_path: imageFile ? imagePath : 'playlists/placeholder',
            is_public: false,
            artist_id: values.artistName ? artistData?.id : null,
          });

        if (supabaseError) {
          setIsLoading(false);
          return toast.error(supabaseError.message, { duration: 5000 });
        }
      } else if (playlistModal.action_type === 'update') {
        let updateObject: {name: string, description: string, artist_id: string, updated_at: string, image_path?: string} = {
          name: values.name,
          description: values.description,
          artist_id: values.artistName ? artistData?.id : null,
          updated_at: new Date().toISOString(),
        };

        if (imageFile) {
          updateObject.image_path = imagePath;
        }

        const { error: supabaseError } =
          await supabaseClient.from('playlists').update(updateObject).match({ id: playlistModal.playlistId });

        if (supabaseError) {
          setIsLoading(false);
          return toast.error(supabaseError.message, { duration: 5000 });
        }
      }


      router.refresh();
      setIsLoading(false);
      setImageObject(null);
      if (playlistModal.action_type === 'update') {
        toast.success('Playlist updated successfully');
      } else {
        toast.success('Playlist created successfully');
      }
      reset();
      playlistModal.onClose();

    } catch (error: Error | any) {
      toast.error('Error: ', error.message);
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <Modal title={`${playlistModal.action_type === 'create' ? 'Create' : 'Update'} a playlist`} isOpen={playlistModal.isOpen} onChange={onChange} className='md:max-w-[550px]'>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4'>
        <div className='flex gap-6'>
          <label htmlFor="image" className="relative group cursor-pointer hover:opacity-80">
          {imageObject ? (
            <Image src={imageObject} alt="Selected" width={176} height={176} />
          ) : (
            <div className='flex justify-center items-center w-44 h-44 bg-neutral-800/60 backdrop-filter backdrop-blur'>
              <RiPlayListFill className='group-hover:hidden text-4xl text-neutral-400'/>
              <div className='hidden group-hover:block'>
                <FaPen className='text-3xl text-neutral-400 m-auto'/>
                <p className='text-neutral-400 text-sm font-normal'>Choose an image</p>
              </div>
            </div>
          )}
          <Input
            id="image"
            type="file"
            disabled={isLoading}
            accept="image/*"
            {...register('image', { required: false })}
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setImageObject(URL.createObjectURL(e.target.files[0]));
              } else {
                setImageObject(playlistModal.imageUrl!);
              }
            }}
            className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
            />
          </label>
          <div className='w-full flex flex-col gap-3'>
            <Input id="name" disabled={isLoading} {...register('name', { required: true })} placeholder="Playlist name" className='max-h-[40px]' />
            <Textarea id="description" disabled={isLoading} {...register('description', { required: false })} placeholder="description" className='h-full resize-none'/>
          </div>
        </div>
        {playlistModal.action_type !== 'update' && <p className='text-neutral-400 text-center text-sm font-normal'>* You can add songs to it later</p>}
        {adminUserId === user?.id && <Input id="artistName" disabled={isLoading} {...register('artistName', { required: false })} placeholder="Associated artist" />}
        <Button type="submit" disabled={isLoading} className='mt-10'>
          {playlistModal.action_type === 'create' ? 'Create' : 'Update'}
        </Button>
      </form>
    </Modal>
  )
}

export default PlaylistModal
