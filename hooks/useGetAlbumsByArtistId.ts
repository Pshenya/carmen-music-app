import { Album } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

const useGetAlbumsByArtistId = (id?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [albums, setAlbums] = useState<Album[]>([]);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!id) return;

    setIsLoading(true);

    const fetchAlbums = async () => {
      const { data, error } = await supabaseClient
        .from("albums")
        .select("*")
        .eq("artist_id", id)

      if (error) {
        setIsLoading(false);
        return toast.error(error.message);
      }

      setAlbums(data);
      setIsLoading(false);
    };

    fetchAlbums();

  }, [id, supabaseClient]);

  return useMemo(() => ({
    isLoading,
    albums
  }), [isLoading, albums]);
}

export default useGetAlbumsByArtistId;
