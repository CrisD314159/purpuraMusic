'use client'

import { usePLayerStore } from "@/app/store/usePlayerStore"
import { useEffect, useRef } from "react"

export default function PlayerComponent() {
  const audioRef = useRef<HTMLAudioElement>(null);
	const prevSongRef = useRef<string | null>(null);

	const { currentSong, isPlaying, playNext } = usePLayerStore();

	// handle play/pause logic
	useEffect(() => {
		if (isPlaying) audioRef.current?.play();
		else audioRef.current?.pause();
	}, [isPlaying]);

	// handle song ends
	useEffect(() => {
		const audio = audioRef.current;

		const handleEnded = () => {
			playNext();
		};

		audio?.addEventListener("ended", handleEnded);

		return () => audio?.removeEventListener("ended", handleEnded);
	}, [playNext]);

	// handle song changes
  useEffect(() => {
    if (!audioRef.current || !currentSong || !currentSong.audioUrl) return;

    const audio = audioRef.current;

    // Verificar si realmente hay un cambio de canción
    const isSongChange = prevSongRef.current !== currentSong.audioUrl;
    if (isSongChange) {
        audio.src = currentSong.audioUrl;
        audio.currentTime = 0;
        prevSongRef.current = currentSong.audioUrl;

        // Manejar la reproducción segura evitando AbortError
        const handleCanPlay = async () => {
            if (isPlaying) {
              const isOk = audio.currentTime > 0 && !audio.paused && !audio.ended && audio.readyState > audio.HAVE_CURRENT_DATA;
              if (!isOk) {
                audio.pause()
                await audio.play().catch((err)=> console.log(err));
              }
            }
            audio.removeEventListener("canplay", handleCanPlay);
        };

        audio.addEventListener("canplay", handleCanPlay);
    }
}, [currentSong, isPlaying]);

	return <audio ref={audioRef} />;
  
} 