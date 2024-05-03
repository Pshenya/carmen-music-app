import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Album, Artist, Song } from "@/types";

const useLoadImage = (data: Song | Album) => {
  const supabaseClient = useSupabaseClient();

  if (!data) {
    return null;
  }

  const { data: imageData } = supabaseClient
    .storage.from('images').getPublicUrl(data.image_path);

  return imageData.publicUrl;
}

const useLoadArtistImage = (artist: Artist) => {
  const supabaseClient = useSupabaseClient();

  if (!artist) {
    return null;
  }

  const { data: imageData } = supabaseClient
    .storage.from('images').getPublicUrl(artist.image_path);

  return imageData.publicUrl;
}

export {
  useLoadImage,
  useLoadArtistImage
};