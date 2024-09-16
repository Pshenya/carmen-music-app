import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import getSongs from "./getSongs";

const getRecommendedSongs = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies
  });

  const allSongs = await getSongs();

  // Shuffle the array to get random order
  const shuffledData = (allSongs as any).sort(() => Math.random() - 0.5);

  // Take the first 10 songs
  const randomSongs = shuffledData.slice(0, 10);

  return randomSongs || [];
}

export default getRecommendedSongs;