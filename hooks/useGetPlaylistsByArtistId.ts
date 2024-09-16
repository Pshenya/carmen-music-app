import { Playlist } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

const useGetPlaylistsByArtistId = (id: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!id) return;

    setIsLoading(true);

    const fetchPlaylists = async () => {
      const { data, error } = await supabaseClient
        .from("playlists")
        .select("*")
        .eq("artist_id", id)

      if (error) {
        setIsLoading(false);
        return toast.error(error.message);
      }

      setPlaylists(data);
      setIsLoading(false);
    };

    fetchPlaylists();

  }, [id, supabaseClient]);

  return useMemo(() => ({
    isLoading,
    playlists
  }), [isLoading, playlists]);
}

export default useGetPlaylistsByArtistId;
