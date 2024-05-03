import { Song } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

const useGetSongsByAlbumId = (id?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [songs, setSong] = useState<Song[]>([]);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!id) return;

    setIsLoading(true);

    const fetchSongs = async () => {
      const { data, error } = await supabaseClient
        .from("songs")
        .select("*")
        .eq("album_id", id)

      if (error) {
        setIsLoading(false);
        return toast.error(error.message);
      }

      setSong(data);
      setIsLoading(false);
    };

    fetchSongs();

  }, [id, supabaseClient]);

  return useMemo(() => ({
    isLoading,
    songs
  }), [isLoading, songs]);
}

export default useGetSongsByAlbumId;
