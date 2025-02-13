
import { usePLayerStore } from "@/app/store/usePlayerStore"
import { useEffect, useRef } from "react"

export default function PlayerComponent() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const prevSongRef = useRef<string | null>(null);
  const { currentSong, isPlaying, playNext } = usePLayerStore();

  // Remove the separate useEffect that automatically play/pauses on isPlaying change

  // handle song ends
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      playNext();
    };
    audio.addEventListener("ended", handleEnded);

    return () => audio.removeEventListener("ended", handleEnded);
  }, [playNext]);

  // handle song changes & play/pause logic
  useEffect(() => {
    if (!audioRef.current || !currentSong?.audioUrl) return;

    const audio = audioRef.current;
    const isSongChange = prevSongRef.current !== currentSong.audioUrl;

    if (isSongChange) {
      audio.pause();
      audio.src = currentSong.audioUrl;
      audio.currentTime = 0;
      prevSongRef.current = currentSong.audioUrl;
      audio.load();
    }

    // Either play or pause based on isPlaying
    const attemptPlay = async () => {
      if (!isPlaying) {
        audio.pause();
        return;
      }
      try {
        await audio.play();
      } catch (err) {
        if( err instanceof Error){
          if (err.name === "AbortError") {
            // Retry or ignore
          } else {
            console.error("Error playing audio:", err);
          }
        }
      }
    };

    // Wait for audio to be ready if needed
    if (audio.readyState < audio.HAVE_CURRENT_DATA) {
      const handleLoadedData = () => {
        attemptPlay();
        audio.removeEventListener("loadeddata", handleLoadedData);
      };
      audio.addEventListener("loadeddata", handleLoadedData);
    } else {
      attemptPlay();
    }
  }, [currentSong, isPlaying]);

  return <audio ref={audioRef} preload="none" />;
}