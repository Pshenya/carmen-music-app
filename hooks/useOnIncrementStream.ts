import { Song } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useOnIncrementStream = () => {
  const supabaseClient = useSupabaseClient();

  const incrementStream = async (id: string) => {
    let updatedStreams;

    // Fetch current streams value (assuming it's numeric now)
    const { data: songData, error: songError } = await supabaseClient
      .from('songs')
      .select('streams')
      .eq('id', id)
      .single();

    if (songError) {
      console.log('Failed to fetch song data:', songError.message);
      return;
    }

    if (songData.streams !== null && songData.streams !== undefined) {
      updatedStreams = songData.streams + 1;
    } else {
      console.log('Streams value is null or undefined');
    }

    // Update streams for the song
    const { error: updateError } = await supabaseClient
      .from('songs')
      .update({ streams: updatedStreams })
      .eq('id', id);

    if (updateError) {
      console.log('Failed to update streams count:', updateError.message);
    }
  }

  return incrementStream;
}

export default useOnIncrementStream;