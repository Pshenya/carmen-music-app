"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSupabaseClient, useSessionContext } from "@supabase/auth-helpers-react";
import { useUser } from '@/hooks';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';

type FormData = {
  username: string;
};

const ProfileCompletionPage = () => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const { session } = useSessionContext();
  const { userDetails } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      setIsLoading(true);

      if (session && session.user) {
        const { error } = await supabaseClient
          .from('users')
          .update({
            username: data.username,
          })
          .eq('id', session.user.id);

        if (error) {
          console.log('Error updating user:', error.message);
        }


      }
    } catch (error: Error | any) {
      toast.error('Error: ', error.message);
    } finally {
      setIsLoading(false);
      router.push('/')
    }
  };

  useEffect(() => {
    if (userDetails?.username) {
      router.push('/'); // Redirect to homepage if profile is already completed
    }
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-neutral-900/80 z-50">
      <div className="rounded-lg w-full max-w-md overflow-hidden overflow-y-auto bg-black backdrop-filter backdrop-blur-md p-6 shadow-lg z-50">
        <h2 className="text-3xl text-center font-bold text-primary">Almost there!</h2>
        <p className='text-center mb-6'>Now let&apos;s create a unique <span className='gradient-text'>username</span> for you</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className='mb-6'>
            <Input type="text" {...register("username", { required: true })} placeholder='Username' className='mb-1'/>
            {errors.username && <span className="text-red-500 text-xs">This field is required</span>}
          </div>
          <Button type="submit" className='text-white' disabled={isLoading}>Complete Profile</Button>
        </form>
      </div>
    </div>
  );
};

export default ProfileCompletionPage;