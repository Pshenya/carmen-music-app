import { Artist } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getArtists = async (): Promise<Artist[]> => {
  console.log('Getting artists...');
  const supabase = createServerComponentClient({
    cookies: cookies
  });

  const { data, error } = await supabase
    .from('artists').select('*').order('created_at', { ascending: false });

  if (error) {
    console.log(error);
  }

  return (data as any) || [];
}

export default getArtists;