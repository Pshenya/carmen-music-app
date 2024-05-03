import { Album } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

const useGetAlbumById = (id?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [album, setAlbum] = useState<Album | undefined>(undefined);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!id) return;

    setIsLoading(true);

    const fetchAlbum = async () => {
      const { data, error } = await supabaseClient
        .from("albums")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setIsLoading(false);
        return toast.error(error.message);
      }

      setAlbum(data);
      setIsLoading(false);
    };

    fetchAlbum();

  }, [id, supabaseClient]);

  return useMemo(() => ({
    isLoading,
    album
  }), [isLoading, album]);
}

export default useGetAlbumById;
