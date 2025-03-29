import { useState } from 'react';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LinkIcon from '@mui/icons-material/Link';
import { 
  Button, Card, CardMedia, CardContent, Typography, 
  Box, Chip, IconButton, Tooltip, Divider, Avatar
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VisibilityIcon from '@mui/icons-material/Visibility';
import NewsDetail from '../Pages/User/NewsDetail';

const NewsCard = ({ news, onPlayAudio, currentPlayingNews, onReadMore }) => {
  // Default values if no news prop is passed
  const {
    title = 'Breaking News: AI Transforms News Consumption',
    summary = 'AI-powered platforms now offer concise news summaries with text, audio, and 3D avatars, revolutionizing how users stay informed.',
    timestamp = new Date().toISOString(),
    imageUrl = 'https://images.unsplash.com/photo-1581090700227-1e8d49c2a960?auto=format&fit=crop&w=800&q=80',
    sourceName = 'Tech Today',
    sourceUrl = 'https://example.com',
    sourceReliability = 'High'
  } = news || {};

  const isCurrentlyPlaying = currentPlayingNews?.id === news?.id;

  const handleListen = () => {
    if (onPlayAudio) {
      onPlayAudio(news);
    } else {
      console.log('Listen button clicked, but no onPlayAudio handler provided');
    }
  };

  const handleReadMore = () => {
    if (onReadMore) {
      onReadMore();
    } else {
      console.log('Read More button clicked, but no onReadMore handler provided');
    }
  };

  const formattedDate = new Date(timestamp).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const isPlaying = currentPlayingNews?.id === news.id;

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      // Try to handle the format if it's not a valid ISO string
      if (typeof timestamp === 'string' && timestamp.includes('T')) {
        // Parse the date part and format as DD/MM/YYYY
        const dateParts = timestamp.split('T')[0].split('-');
        if (dateParts.length === 3) {
          return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`; // DD/MM/YYYY
        }
        return timestamp.split('T')[0].replace(/-/g, '/');
      }
      // If we can't parse it, just return the original
      return timestamp;
    }
    
    // Format as DD/MM/YYYY
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  };

  return (
    <Card sx={{ 
      maxWidth: '100%', 
      borderRadius: 2, 
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 12px 20px rgba(0,0,0,0.12)'
      },
      overflow: 'hidden',
      mb: 3
    }}>
      <CardMedia
        component="img"
        height="200"
        image={imageUrl}
        alt={title}
        sx={{ objectFit: 'cover' }}
      />
      
      <CardContent sx={{ pb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontSize: '0.75rem' }}>
            <AccessTimeIcon fontSize="inherit" />
            {formattedDate}
          </Typography>
          
          <Chip 
            size="small"
            label={`Source: ${sourceName}`}
            color={sourceReliability === 'High' ? 'success' : 'warning'}
            variant="outlined"
            sx={{ fontSize: '0.7rem' }}
            icon={<LinkIcon fontSize="small" />}
            onClick={() => window.open(sourceUrl, '_blank')}
          />
        </Box>
        
        <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
          {title}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 2 }}>
          {summary}
        </Typography>
        
        <Divider sx={{ mb: 2 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            size="small"
            variant="outlined"
            onClick={handleReadMore}
            sx={{ 
              borderRadius: '20px',
              textTransform: 'none',
              borderColor: '#1976d2',
              color: '#1976d2',
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.04)',
                borderColor: '#1976d2'
              }
            }}
          >
            Read More
          </Button>
          
          <Button
            size="small"
            variant="contained"
            startIcon={isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            onClick={(e) => {
              e.stopPropagation();
              onPlayAudio(news);
            }}
            sx={{ 
              borderRadius: '20px',
              textTransform: 'none',
              backgroundColor: isPlaying ? '#f44336' : '#1976d2',
              '&:hover': {
                backgroundColor: isPlaying ? '#d32f2f' : '#1565c0'
              }
            }}
          >
            {isPlaying ? 'Pause' : 'Listen'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NewsCard;