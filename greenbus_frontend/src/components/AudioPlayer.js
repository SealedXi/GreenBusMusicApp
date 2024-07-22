import React, { useRef, useState, forwardRef, useImperativeHandle } from 'react';

const AudioPlayer = forwardRef(({ src, onPlay, datetime, duration }, ref) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useImperativeHandle(ref, () => ({
        pause: () => {
            if (audioRef.current) {
                audioRef.current.pause();
                setIsPlaying(false);
            }
        }
    }));

    const togglePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
            if (onPlay) onPlay();
        }
        setIsPlaying(!isPlaying);
    };

    const handlePause = () => {
        setIsPlaying(false);
    };

    return (
        <div className="audio-player">
            <audio ref={audioRef} src={src} onPause={handlePause}></audio>
            <button onClick={togglePlayPause}>
                {isPlaying ? 'Pause' : 'Play'}
            </button>
            <div className="audio-info">
                <span>{datetime}</span>
                <span>{duration}</span>
            </div>
        </div>
    );
});

export default AudioPlayer;