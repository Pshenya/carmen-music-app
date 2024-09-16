import { Playlist } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getPlaylistById = async (id: string): Promise<Playlist> => {
  const supabase = createServerComponentClient({
    cookies: cookies
  });

  const { data, error } = await supabase
    .from('playlists')
    .select('*')
    .eq('id', id)
    .order('created_at', { ascending: false });

  if (error) {
    console.log(error);
  }

  return data?.[0];
}

export default getPlaylistById;