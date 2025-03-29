import { useState, useRef, useEffect } from 'react';
import { 
  Box, Paper, Typography, IconButton, 
  Slider, LinearProgress, Chip
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import CloseIcon from '@mui/icons-material/Close';
import SpeedIcon from '@mui/icons-material/Speed';

const AudioPlayer = ({ news, isPlaying, onStop, onTogglePlay }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  
  const audioRef = useRef(null);
  
  // Dummy audio source - in a real app, this would come from the news item
  const audioSrc = "https://example.com/audio-summary.mp3";
  
  useEffect(() => {
    // In a real application, you would fetch the audio file or 
    // generate audio from the text using a TTS API
    
    // Simulate audio loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      // For demo purposes, set a fake duration
      setDuration(60); // 60 seconds
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    // Update time while playing
    let interval;
    
    if (isPlaying && !isLoading) {
      interval = setInterval(() => {
        setCurrentTime(prevTime => {
          const newTime = prevTime + 0.1 * playbackRate;
          if (newTime >= duration) {
            onStop();
            return 0;
          }
          return newTime;
        });
      }, 100);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, duration, isLoading, playbackRate, onStop]);
  
  const togglePlay = () => {
    if (isLoading) return;
    onTogglePlay();
  };
  
  const handleTimeChange = (e, newValue) => {
    setCurrentTime(newValue);
    // In a real app: audioRef.current.currentTime = newValue;
  };
  
  const handleVolumeChange = (e, newValue) => {
    setVolume(newValue);
    setIsMuted(newValue === 0);
    // In a real app: audioRef.current.volume = newValue;
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
    // In a real app: audioRef.current.muted = !audioRef.current.muted;
  };
  
  const changePlaybackRate = () => {
    const rates = [0.75, 1, 1.25, 1.5, 2];
    const currentIndex = rates.indexOf(playbackRate);
    const nextIndex = (currentIndex + 1) % rates.length;
    setPlaybackRate(rates[nextIndex]);
    // In a real app: audioRef.current.playbackRate = rates[nextIndex];
  };
  
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 2, 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2,
        bgcolor: 'background.paper',
        borderRadius: '8px 8px 0 0',
        width: '100%',
        maxWidth: '100%',
        boxShadow: '0 -4px 12px rgba(0,0,0,0.1)'
      }}
    >
      {/* Close Button */}
      <IconButton 
        onClick={onStop}
        sx={{ 
          color: 'text.secondary',
          '&:hover': { color: 'error.main' }
        }}
      >
        <CloseIcon />
      </IconButton>

      {/* News Title */}
      <Typography 
        variant="subtitle1" 
        sx={{ 
          flex: 1, 
          fontWeight: 'bold',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}
      >
        {news.title}
      </Typography>

      {/* Playback Controls */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton onClick={togglePlay} disabled={isLoading}>
          {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>
        
        <Box sx={{ width: 200, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="caption">{formatTime(currentTime)}</Typography>
          <Slider
            value={currentTime}
            max={duration}
            onChange={handleTimeChange}
            size="small"
            sx={{ mx: 1 }}
          />
          <Typography variant="caption">{formatTime(duration)}</Typography>
        </Box>

        <IconButton onClick={toggleMute}>
          {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
        </IconButton>
        
        <Slider
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          size="small"
          sx={{ width: 100 }}
        />

        <Chip
          icon={<SpeedIcon />}
          label={`${playbackRate}x`}
          onClick={changePlaybackRate}
          size="small"
        />
      </Box>

      {/* Loading Progress */}
      {isLoading && (
        <LinearProgress 
          sx={{ 
            position: 'absolute', 
            bottom: 0, 
            left: 0, 
            right: 0,
            height: 2
          }} 
        />
      )}
    </Paper>
  );
};

export default AudioPlayer;
 