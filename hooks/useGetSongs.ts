import { Song } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

const useGetSongs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [songs, setSongs] = useState<Song[]>([]);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    setIsLoading(true);

    const fetchSongs = async () => {
      const { data, error } = await supabaseClient
        .from('songs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        setIsLoading(false);
        return toast.error(error.message);
      }

      setSongs(data);
      setIsLoading(false);
    };

    fetchSongs();

  }, [supabaseClient]);

  return useMemo(() => ({
    isLoading,
    songs
  }), [isLoading, songs]);
}

export default useGetSongs;
