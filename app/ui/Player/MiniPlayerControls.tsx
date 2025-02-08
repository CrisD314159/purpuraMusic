'use client'
import { usePLayerStore } from "@/app/store/usePlayerStore";
import { Button, IconButton } from "@mui/material";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import { Vibrant } from "node-vibrant/browser";


interface MiniPlayerControls {
	setOpen : () => void
}


export const MiniPlayerControls = ({setOpen}: MiniPlayerControls) => {
	const { currentSong, isPlaying, togglePlay, playNext, playPrevious } = usePLayerStore();
	const [color, setColor] = useState('#141414')

	

	const [currentTime, setCurrentTime] = useState(0);
	const audioRef = useRef<HTMLAudioElement | null>(null);


  const handleRepeat = ()=>{
    if(currentTime < 4){
      playPrevious()
    }else{
      handleSeek([0])
    }

  }

	useEffect(()=>{
		if (!currentSong || !currentSong.imageUrl) return
		Vibrant.from(currentSong.imageUrl)
		.getPalette()
		.then((palette) =>{
			setColor(palette.DarkVibrant?.hex ?? '#141414')

		} );

	}, [currentSong])

	useEffect(() => {
		audioRef.current = document.querySelector("audio");

		const audio = audioRef.current;
		if (!audio) return;

		const updateTime = () => setCurrentTime(audio.currentTime);
	

		audio.addEventListener("timeupdate", updateTime);


		const handleEnded = () => {
			usePLayerStore.setState({ isPlaying: false });
		};

		audio.addEventListener("ended", handleEnded);

		return () => {
			audio.removeEventListener("timeupdate", updateTime);
			audio.removeEventListener("ended", handleEnded);
		};
	}, [currentSong]);

	const handleSeek = (value: number[]) => {
		if (audioRef.current) {
			audioRef.current.currentTime = value[0];
		}
	};

	return (
	
			<div className={`flex items-center h-16 max-w-[1800px] w-[94%] mx-auto rounded-xl`} style={{background:color}}>
				{/* currently playing song */}
				<Button onClick={setOpen} className='flex items-center gap-4 min-w-[180px] w-[75%] pl-4'>
					{currentSong ? (
						<>
							<Image
              	width={50}
              	height={50}
								src={currentSong.imageUrl ?? ''}
								alt={currentSong.name}
								className='object-cover rounded-md'
								unoptimized
							/>
							<div className='flex-1 min-w-0 justify-start'>
								<div className='font-medium truncate text-left cursor-pointer text-white'>
									{currentSong.name}
								</div>
							</div>
						</>
					):
					<div className='flex-1 min-w-0'>
								<div className='font-medium truncate cursor-pointer text-white'>
									{'Not Playing'}
								</div>
							</div>
					}
				</Button>

				{/* player controls*/}
				<div className='flex flex-col items-centerflex-1 max-w-full sm:max-w-[45%] '>
					<div className='flex items-center  sm:gap-6'>

						<IconButton
					
							className='hover:text-white text-zinc-400'
              onDoubleClick={playPrevious}
							onClick={handleRepeat}
							disabled={!currentSong}
						>
							<SkipPreviousRoundedIcon className='h-4 w-4' />
						</IconButton>

						<IconButton
							onClick={togglePlay}
							disabled={!currentSong}
						>
							{isPlaying ? <PauseRoundedIcon className='h-5 w-5' /> : <PlayArrowRoundedIcon className='h-5 w-5' />}
						</IconButton>
						<IconButton
							className='hover:text-white text-zinc-400'
							onClick={playNext}
							disabled={!currentSong}
						>
							<SkipNextRoundedIcon className='h-4 w-4' />
						</IconButton>
					</div>

				</div>
			
			</div>
	);
};