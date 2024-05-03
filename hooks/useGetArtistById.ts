import { Artist } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

const useGetArtistById = (id?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [artist, setArtist] = useState<Artist | undefined>(undefined);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!id) return;

    setIsLoading(true);

    const fetchSong = async () => {
      const { data, error } = await supabaseClient
        .from("artists")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setIsLoading(false);
        return toast.error(error.message);
      }

      setArtist(data);
      setIsLoading(false);
    };

    fetchSong();

  }, [id, supabaseClient]);

  return useMemo(() => ({
    isLoading,
    artist
  }), [isLoading, artist]);
}

export default useGetArtistById;
