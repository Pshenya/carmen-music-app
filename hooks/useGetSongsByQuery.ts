import { useState, useEffect } from 'react';
import { Song } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import toast from 'react-hot-toast';

const useSongsByQuery = (query: string) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    const fetchSongs = async () => {
      setIsLoading(true);

      let supabaseQuery = supabaseClient.from('songs').select('*').limit(10);

      if (query) {
        supabaseQuery = supabaseQuery
          .or(`title.ilike.%${query}%,author.ilike.%${query}%`);
      }

      const { data, error } = await supabaseQuery.order('created_at', { ascending: false });

      if (error) {
        toast.error(error.message);
      } else {
        setSongs(data || []);
      }

      setIsLoading(false);
    };

    fetchSongs();
  }, [query, supabaseClient]);

  return { songs, isLoading };
};

export default useSongsByQuery;