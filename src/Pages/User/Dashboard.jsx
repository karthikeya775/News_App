import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  InputBase,
  IconButton,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Button,
  Grid,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CardActionArea,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useNavigate, useParams } from "react-router-dom";
import NewsCard from "../../Components/NewsCard";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const categories = [
  { id: 'all', label: 'All News' },
  { id: 'technology', label: 'Technology' },
  { id: 'business', label: 'Business' },
  { id: 'health', label: 'Health' },
  { id: 'politics', label: 'Politics' },
  { id: 'science', label: 'Science' },
  { id: 'sports' , label:'Sports'}
];

const Dashboard = ({ onPlayAudio, currentPlayingNews }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { category = 'all' } = useParams();
  const navigate = useNavigate();
  
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [newsCategories, setNewsCategories] = useState([]);

  useEffect(() => {
    // Mock data with news items for all categories
    const mockNewsData = [
      // Technology News
      {
        id: 1,
        title: 'Global Tech Summit Announces Breakthrough in Quantum Computing',
        summary: 'The annual Global Tech Summit revealed a major advancement in quantum computing that could revolutionize data processing capabilities worldwide.',
        sourceName: 'Tech Today',
        sourceUrl: 'https://techtoday.com/quantum-breakthrough',
        sourceReliability: 'High',
        category: 'technology',
        timestamp: '2023-07-15T09:30:00',
        imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=fit=crop&w=800&q=80'
      },
      {
        id: 2,
        title: 'Apple Unveils Revolutionary AI-Powered iPhone Features',
        summary: 'Apple\'s latest iOS update introduces groundbreaking AI features that promise to transform how users interact with their devices.',
        sourceName: 'Tech Insider',
        sourceUrl: 'https://techinsider.com/apple-ai-features',
        sourceReliability: 'High',
        category: 'technology',
        timestamp: '2023-07-14T14:20:00',
        imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=fit=crop&w=800&q=80'
      },
      
      // Business News
      {
        id: 3,
        title: 'Global Economic Forum Predicts Strong Recovery in Coming Quarter',
        summary: 'The latest analysis from the Global Economic Forum suggests a stronger than expected economic recovery in the upcoming financial quarter.',
        sourceName: 'Financial Times',
        sourceUrl: 'https://ft.com/economic-recovery',
        sourceReliability: 'High',
        category: 'business',
        timestamp: '2023-07-13T11:45:00',
        imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=fit=crop&w=800&q=80'
      },
      {
        id: 4,
        title: 'Startup Ecosystem Shows Remarkable Growth in 2023',
        summary: 'New data reveals unprecedented growth in the global startup ecosystem, with record-breaking investments and innovative solutions emerging across sectors.',
        sourceName: 'Business Weekly',
        sourceUrl: 'https://businessweekly.com/startup-growth',
        sourceReliability: 'Medium',
        category: 'business',
        timestamp: '2023-07-12T16:20:00',
        imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=fit=crop&w=800&q=80'
      },
      
      // Health News
      {
        id: 5,
        title: 'Healthcare Innovation: AI-Driven Diagnostic Tool Gets FDA Approval',
        summary: 'A revolutionary AI-powered diagnostic tool has received FDA approval, promising to improve early detection rates for multiple conditions.',
        sourceName: 'Medical Daily',
        sourceUrl: 'https://medicaldaily.com/ai-diagnostic-approval',
        sourceReliability: 'High',
        category: 'health',
        timestamp: '2023-07-11T10:15:00',
        imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=fit=crop&w=800&q=80'
      },
      {
        id: 6,
        title: 'Breakthrough in Cancer Treatment Shows Promising Results',
        summary: 'Clinical trials of a new immunotherapy treatment show remarkable success rates in treating previously untreatable forms of cancer.',
        sourceName: 'Health Journal',
        sourceUrl: 'https://healthjournal.com/cancer-breakthrough',
        sourceReliability: 'High',
        category: 'health',
        timestamp: '2023-07-10T09:30:00',
        imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=fit=crop&w=800&q=80'
      },
      
      // Politics News
      {
        id: 7,
        title: 'New Climate Policy Framework Adopted by Major Economies',
        summary: 'Leading global economies have agreed to adopt a comprehensive climate policy framework aimed at reducing carbon emissions by 50% before 2030.',
        sourceName: 'Global News Network',
        sourceUrl: 'https://gnn.news/climate-policy-2023',
        sourceReliability: 'Medium',
        category: 'politics',
        timestamp: '2023-07-09T14:20:00',
        imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=fit=crop&w=800&q=80'
      },
      {
        id: 8,
        title: 'Historic Peace Agreement Reached in Long-Standing Conflict',
        summary: 'After years of negotiations, a historic peace agreement has been signed, marking a new era of diplomatic relations between the involved nations.',
        sourceName: 'World Politics Today',
        sourceUrl: 'https://worldpolitics.com/peace-agreement',
        sourceReliability: 'High',
        category: 'politics',
        timestamp: '2023-07-08T11:45:00',
        imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=fit=crop&w=800&q=80'
      },
      
      // Science News
      {
        id: 9,
        title: 'Space Exploration Milestone: New Habitable Exoplanet Discovered',
        summary: 'Astronomers have identified a potentially habitable exoplanet within our galactic neighborhood, marking a significant milestone in space exploration.',
        sourceName: 'Science Weekly',
        sourceUrl: 'https://scienceweekly.com/new-exoplanet',
        sourceReliability: 'High',
        category: 'science',
        timestamp: '2023-07-07T16:20:00',
        imageUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=fit=crop&w=800&q=80'
      },
      {
        id: 10,
        title: 'Revolutionary Discovery in Quantum Physics Challenges Existing Theories',
        summary: 'Scientists have made a groundbreaking discovery in quantum physics that could fundamentally change our understanding of the universe.',
        sourceName: 'Scientific American',
        sourceUrl: 'https://scientificamerican.com/quantum-discovery',
        sourceReliability: 'High',
        category: 'science',
        timestamp: '2023-07-06T10:15:00',
        imageUrl: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=fit=crop&w=800&q=80'
      }
    ];

    // Simulate API fetch delay
    setTimeout(() => {
      console.log('Setting news items:', mockNewsData.length);
      setNewsItems(mockNewsData);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter news items based on category, search query, and source filter
  const filteredNews = newsItems.filter(news => {
    const matchesCategory = category === 'all' || news.category === category;
    const matchesSearch = searchQuery === '' || 
      news.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      news.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSource = sourceFilter === 'all' || news.sourceName === sourceFilter;
    
    if (!matchesCategory) {
      console.log('Category mismatch:', {
        newsCategory: news.category,
        currentCategory: category,
        title: news.title
      });
    }
    
    return matchesCategory && matchesSearch && matchesSource;
  });

  // Get unique sources for filter dropdown
  const sources = [...new Set(newsItems.map(news => news.sourceName))];

  console.log('Current Playing News:', currentPlayingNews);

  useEffect(() => {
    // Simulate fetching categories and news
    const fetchCategories = async () => {
      // Replace with your API call
      const exampleCategories = [
        { id: 1, name: 'Technology', articles: [] },
        { id: 2, name: 'Health', articles: [] },
        { id: 3, name: 'Sports', articles: [] },
      ];
      setNewsCategories(exampleCategories);
    };

    fetchCategories();
  }, []);

  const handleNewsClick = (newsId) => {
    // Find the news item by ID
    const newsItem = newsItems.find(item => item.id === newsId);
    // Navigate to the news detail page with the news item as state
    navigate(`/news/${newsId}`, { state: { news: newsItem } });
  };
  

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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#333" }}>
          News Dashboard
        </Typography>
        <Button
          startIcon={<RefreshIcon />}
          variant="contained"
          onClick={() => window.location.reload()}
          size="small"
          sx={{ bgcolor: "#007bff", ":hover": { bgcolor: "#0056b3" } }}
        >
          Refresh
        </Button>
      </Box>

      {/* Search and Filters */}
      <Paper
        component="form"
        sx={{
          p: "6px 12px",
          display: "flex",
          alignItems: "center",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          mb: 3,
          backgroundColor: "#fff",
        }}
        elevation={2}
        onSubmit={(e) => e.preventDefault()}
      >
        <InputBase
          sx={{ ml: 1, flex: 1, fontSize: "16px" }}
          placeholder="Search news..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <IconButton type="submit" sx={{ p: "10px", color: "#007bff" }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <IconButton 
          sx={{ p: "10px", color: showFilters ? "#007bff" : "gray" }} 
          aria-label="filter" 
          onClick={() => setShowFilters(!showFilters)}
        >
          <FilterListIcon />
        </IconButton>
      </Paper>

      {/* Filters Dropdown */}
      {showFilters && (
        <Paper sx={{ p: 2, mb: 3, borderRadius: "8px", backgroundColor: "#f9f9f9" }} elevation={1}>
          <FormControl sx={{ minWidth: 200 }} size="small">
            <InputLabel id="source-filter-label">Source</InputLabel>
            <Select 
              labelId="source-filter-label" 
              value={sourceFilter} 
              label="Source" 
              onChange={(e) => setSourceFilter(e.target.value)}
            >
              <MenuItem value="all">All Sources</MenuItem>
              {sources.map((source) => (
                <MenuItem key={source} value={source}>
                  {source}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>
      )}

      {/* Category Navigation */}
      <Box 
        sx={{ 
          display: 'flex', 
          gap: 1, 
          mb: 3, 
          overflowX: 'auto',
          pb: 1,
          '&::-webkit-scrollbar': {
            height: '6px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#f1f1f1',
            borderRadius: '3px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
            borderRadius: '3px',
            '&:hover': {
              backgroundColor: '#555',
            },
          },
        }}
      >
        {categories.map((cat) => (
          <Button
            key={cat.id}
            variant={category === cat.id ? "contained" : "outlined"}
            onClick={() => navigate(`/dashboard/${cat.id}`)}
            sx={{
              borderRadius: '20px',
              textTransform: 'none',
              whiteSpace: 'nowrap',
              minWidth: 'auto',
              px: 2,
              '&.MuiButton-contained': {
                backgroundColor: '#007bff',
                '&:hover': {
                  backgroundColor: '#0056b3',
                },
              },
            }}
          >
            {cat.label}
          </Button>
        ))}
      </Box>

      {/* News Grid */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredNews.map((news) => (
            <Grid item xs={12} md={6} lg={4} key={news.id}>
              <NewsCard 
                news={news}
                onPlayAudio={onPlayAudio}
                currentPlayingNews={currentPlayingNews}
                onReadMore={() => handleNewsClick(news.id)}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Dashboard;
