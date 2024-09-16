import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Album, Artist, Playlist, Song, UserDetails } from "@/types";
import { useEffect, useState } from "react";

const useLoadImage = (data: Song | Album | Artist | Playlist) => {
  const supabaseClient = useSupabaseClient();

  if (!data) {
    return null;
  }

  const { data: imageData } = supabaseClient
    .storage.from('images').getPublicUrl(data.image_path);

  return imageData.publicUrl;
}

export default useLoadImage;

export const useLoadUserAvatar = (data: UserDetails) => {
  const supabaseClient = useSupabaseClient();

  if (!data || !data.avatar_url) {
    return null;
  }

  const { data: imageData } = supabaseClient
    .storage.from('images').getPublicUrl(data.avatar_url);

  return imageData.publicUrl;
}