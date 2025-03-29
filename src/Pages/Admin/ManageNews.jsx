// src/Pages/Admin/ManageNews.jsx
import React, { useState, useEffect } from 'react';
import {
  Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, Menu, MenuItem, Tooltip,
  LinearProgress, Avatar, TablePagination, Divider, useTheme, useMediaQuery
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import FilterListIcon from '@mui/icons-material/FilterList';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchIcon from '@mui/icons-material/Search';

const ManageNews = () => {
  // Theme hooks for responsive design
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  
  // State variables
  const [news, setNews] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const [editedSummary, setEditedSummary] = useState('');
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Example data for testing
    const exampleData = [
      { id: 1, title: 'Global Markets Surge After Economic Report', source: 'BBC', timestamp: '2025-03-27 12:00', status: 'pending', summary: 'Financial markets around the world saw significant gains following the release of promising economic data.' },
      { id: 2, title: 'New Healthcare Bill Passes Senate Vote', source: 'CNN', timestamp: '2025-03-27 12:30', status: 'pending', summary: 'After months of debate, the Senate has approved a new healthcare bill aimed at expanding coverage.' },
      { id: 3, title: 'Technology Giants Announce Collaboration', source: 'Reuters', timestamp: '2025-03-27 13:00', status: 'approved', summary: 'Four of the world\'s largest technology companies have announced plans to collaborate on AI ethics.' },
      { id: 4, title: 'International Peace Talks Set for Next Week', source: 'Al Jazeera', timestamp: '2025-03-27 14:00', status: 'rejected', summary: 'Representatives from several countries will meet next week to discuss ongoing conflicts.' },
      { id: 5, title: 'Major Sports Event Announces New Sponsors', source: 'ESPN', timestamp: '2025-03-27 15:00', status: 'pending', summary: 'The upcoming international sports event has secured several new major sponsors.' },
      { id: 6, title: 'Scientific Breakthrough in Renewable Energy', source: 'Nature', timestamp: '2025-03-27 16:00', status: 'approved', summary: 'Scientists announce a breakthrough in solar energy technology that could revolutionize renewable energy.' },
    ];

    setTimeout(() => {
      setNews(exampleData);
      setLoading(false);
    }, 500);
  }, []);

  // Handlers
  const handleApprove = (id) => {
    setNews(news.map(item => item.id === id ? { ...item, status: 'approved' } : item));
  };

  const handleReject = (id) => {
    setNews(news.map(item => item.id === id ? { ...item, status: 'rejected' } : item));
  };

  const handleOpenDetails = (newsItem) => {
    setSelectedNews(newsItem);
    setEditedSummary(newsItem.summary);
    setDialogOpen(true);
  };

  const handleSaveSummary = () => {
    setNews(news.map((item) => (item.id === selectedNews.id ? { ...item, summary: editedSummary } : item)));
    setDialogOpen(false);
    setSelectedNews(null);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedNews(null);
  };

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = (filter) => {
    if (filter !== undefined) {
      setStatusFilter(filter);
    }
    setFilterAnchorEl(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  // Add a new handler function for refreshing the data
  const handleRefresh = () => {
    setLoading(true);
    
    // Simulate fetching fresh data
    setTimeout(() => {
      // Example data for testing - you can keep the same data for now
      const exampleData = [
        { id: 1, title: 'Global Markets Surge After Economic Report', source: 'BBC', timestamp: '2025-03-27 12:00', status: 'pending', summary: 'Financial markets around the world saw significant gains following the release of promising economic data.' },
        { id: 2, title: 'New Healthcare Bill Passes Senate Vote', source: 'CNN', timestamp: '2025-03-27 12:30', status: 'pending', summary: 'After months of debate, the Senate has approved a new healthcare bill aimed at expanding coverage.' },
        { id: 3, title: 'Technology Giants Announce Collaboration', source: 'Reuters', timestamp: '2025-03-27 13:00', status: 'approved', summary: 'Four of the world\'s largest technology companies have announced plans to collaborate on AI ethics.' },
        { id: 4, title: 'International Peace Talks Set for Next Week', source: 'Al Jazeera', timestamp: '2025-03-27 14:00', status: 'rejected', summary: 'Representatives from several countries will meet next week to discuss ongoing conflicts.' },
        { id: 5, title: 'Major Sports Event Announces New Sponsors', source: 'ESPN', timestamp: '2025-03-27 15:00', status: 'pending', summary: 'The upcoming international sports event has secured several new major sponsors.' },
        { id: 6, title: 'Scientific Breakthrough in Renewable Energy', source: 'Nature', timestamp: '2025-03-27 16:00', status: 'approved', summary: 'Scientists announce a breakthrough in solar energy technology that could revolutionize renewable energy.' },
      ];
      
      setNews(exampleData);
      setLoading(false);
      
      // Reset filters and search
      setStatusFilter('all');
      setSearchQuery('');
      setPage(0);
    }, 500);
  };

  // Filter and search logic
  const filteredNews = news
    .filter(item => statusFilter === 'all' || item.status === statusFilter)
    .filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.source.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Calculate pagination
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredNews.length - page * rowsPerPage);

  if (loading) {
    return (
      <Box sx={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ textAlign: 'center', mb: 3, color: '#1a237e' }}>Loading news articles...</Typography>
        <LinearProgress color="primary" sx={{ width: '50%', borderRadius: 2 }} />
      </Box>
    );
  }

  return (
    <Box sx={{ 
      p: { xs: 2, md: 3 }, 
      width: '100%', 
      maxWidth: '100%',
      boxSizing: 'border-box',
      overflowX: 'hidden'
    }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: isSmallScreen ? 'column' : 'row', 
        justifyContent: 'space-between', 
        alignItems: isSmallScreen ? 'flex-start' : 'center', 
        mb: 4,
        gap: isSmallScreen ? 2 : 0
      }}>
        <Typography variant="h4" sx={{ 
          fontWeight: 'bold', 
          color: '#1a237e',
          fontSize: { xs: '1.8rem', md: '2.2rem' }
        }}>
          Manage News
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 1,
          width: isSmallScreen ? '100%' : 'auto'
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            backgroundColor: '#f5f5f5', 
            borderRadius: 2,
            p: 1,
            flexGrow: isSmallScreen ? 1 : 0,
            minWidth: isSmallScreen ? '100%' : 150,
            mb: isSmallScreen ? 1 : 0
          }}>
            <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
            <TextField
              placeholder="Search news..."
              variant="standard"
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{ disableUnderline: true }}
              sx={{ width: '100%' }}
            />
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="Refresh data">
              <IconButton 
                onClick={handleRefresh}
                sx={{ 
                  color: '#1976d2',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.08)',
                  backgroundColor: 'white',
                  '&:hover': {
                    backgroundColor: '#f5f5f5'
                  }
                }}
              >
                <RefreshIcon />
              </IconButton>
            </Tooltip>
            
            <Button 
              variant="contained" 
              startIcon={<FilterListIcon />}
              onClick={handleFilterClick}
              sx={{ 
                textTransform: 'none',
                borderRadius: 2,
                backgroundColor: '#1976d2',
                boxShadow: '0 2px 5px rgba(25, 118, 210, 0.3)',
                '&:hover': {
                  backgroundColor: '#1565c0',
                }
              }}
            >
              {statusFilter === 'all' ? 'All Status' : 
               statusFilter === 'pending' ? 'Pending' : 
               statusFilter === 'approved' ? 'Approved' : 'Rejected'}
            </Button>
          </Box>
          
          <Menu
            anchorEl={filterAnchorEl}
            open={Boolean(filterAnchorEl)}
            onClose={() => handleFilterClose()}
            PaperProps={{
              elevation: 3,
              sx: {
                borderRadius: 2,
                minWidth: 150
              }
            }}
          >
            <MenuItem onClick={() => handleFilterClose('all')}>All Status</MenuItem>
            <MenuItem onClick={() => handleFilterClose('pending')}>Pending</MenuItem>
            <MenuItem onClick={() => handleFilterClose('approved')}>Approved</MenuItem>
            <MenuItem onClick={() => handleFilterClose('rejected')}>Rejected</MenuItem>
          </Menu>
        </Box>
      </Box>

      {/* Status Summary Cards */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, 
        gap: 2, 
        mb: 4
      }}>
        <Paper sx={{ 
          p: 3, 
          borderRadius: 3,
          backgroundColor: '#e3f2fd',
          borderLeft: '5px solid #2196f3',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 6px 25px rgba(0,0,0,0.07)'
          }
        }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.9rem' }}>Total Articles</Typography>
          <Typography variant="h4" sx={{ fontWeight: 600, color: '#2196f3', mt: 1 }}>
            {news.length}
          </Typography>
        </Paper>
        
        <Paper sx={{ 
          p: 3, 
          borderRadius: 3,
          backgroundColor: '#fff8e1',
          borderLeft: '5px solid #ffc107',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 6px 25px rgba(0,0,0,0.07)'
          }
        }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.9rem' }}>Pending</Typography>
          <Typography variant="h4" sx={{ fontWeight: 600, color: '#ffc107', mt: 1 }}>
            {news.filter(item => item.status === 'pending').length}
          </Typography>
        </Paper>
        
        <Paper sx={{ 
          p: 3, 
          borderRadius: 3,
          backgroundColor: '#e8f5e9',
          borderLeft: '5px solid #4caf50',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 6px 25px rgba(0,0,0,0.07)'
          }
        }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.9rem' }}>Approved</Typography>
          <Typography variant="h4" sx={{ fontWeight: 600, color: '#4caf50', mt: 1 }}>
            {news.filter(item => item.status === 'approved').length}
          </Typography>
        </Paper>
        
        <Paper sx={{ 
          p: 3, 
          borderRadius: 3,
          backgroundColor: '#ffebee',
          borderLeft: '5px solid #f44336',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 6px 25px rgba(0,0,0,0.07)'
          }
        }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.9rem' }}>Rejected</Typography>
          <Typography variant="h4" sx={{ fontWeight: 600, color: '#f44336', mt: 1 }}>
            {news.filter(item => item.status === 'rejected').length}
          </Typography>
        </Paper>
      </Box>

      {/* News Table */}
      <TableContainer component={Paper} sx={{ 
        borderRadius: 3, 
        boxShadow: '0 6px 25px rgba(0,0,0,0.07)', 
        mb: 3,
        overflow: 'hidden',
        width: '100%'
      }}>
        <Table sx={{ width: '100%' }}>
          <TableHead sx={{ backgroundColor: '#f0f4f8' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: '#1a237e', py: 2 }}>Title</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#1a237e', py: 2 }}>Source</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#1a237e', py: 2 }}>Timestamp</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#1a237e', py: 2 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#1a237e', textAlign: 'center', py: 2 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredNews
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <TableRow 
                  key={item.id} 
                  hover 
                  sx={{ 
                    '&:last-child td, &:last-child th': { border: 0 },
                    '&:nth-of-type(odd)': { backgroundColor: 'rgba(0, 0, 0, 0.01)' },
                    transition: 'background-color 0.2s',
                    '&:hover': {
                      backgroundColor: 'rgba(25, 118, 210, 0.04) !important'
                    }
                  }}
                >
                  <TableCell sx={{ maxWidth: 300, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.title}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar 
                        src={`https://logo.clearbit.com/${item.source.toLowerCase()}.com`}
                        sx={{ 
                          width: 28, 
                          height: 28, 
                          mr: 1,
                          border: '1px solid rgba(0,0,0,0.05)'
                        }}
                      >
                        {item.source.charAt(0)}
                      </Avatar>
                      {item.source}
                    </Box>
                  </TableCell>
                  <TableCell>{item.timestamp}</TableCell>
                  <TableCell>
                    <Chip
                      label={item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      color={
                        item.status === 'approved' ? 'success' :
                        item.status === 'pending' ? 'warning' : 'error'
                      }
                      size="small"
                      sx={{ 
                        minWidth: 90, 
                        textAlign: 'center',
                        fontWeight: 'medium',
                        py: 0.5
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      {item.status === 'pending' ? (
                        <>
                          <Tooltip title="Approve">
                            <IconButton 
                              color="success" 
                              onClick={() => handleApprove(item.id)}
                              sx={{ 
                                '&:hover': { 
                                  backgroundColor: 'rgba(76, 175, 80, 0.1)',
                                  transform: 'scale(1.1)'
                                },
                                transition: 'transform 0.2s'
                              }}
                            >
                              <CheckCircleIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Reject">
                            <IconButton 
                              color="error" 
                              onClick={() => handleReject(item.id)}
                              sx={{ 
                                '&:hover': { 
                                  backgroundColor: 'rgba(244, 67, 54, 0.1)',
                                  transform: 'scale(1.1)'
                                },
                                transition: 'transform 0.2s'
                              }}
                            >
                              <CancelIcon />
                            </IconButton>
                          </Tooltip>
                        </>
                      ) : (
                        <Typography variant="caption" 
                          sx={{ 
                            color: item.status === 'approved' ? 'success.main' : 'error.main',
                            fontWeight: 'bold',
                            backgroundColor: item.status === 'approved' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
                            padding: '4px 8px',
                            borderRadius: '4px'
                          }}
                        >
                          {item.status === 'approved' ? 'APPROVED' : 'REJECTED'}
                        </Typography>
                      )}
                      <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                      <Tooltip title="View & Edit">
                        <IconButton
                          color="primary"
                          onClick={() => handleOpenDetails(item)}
                          sx={{ 
                            '&:hover': { 
                              backgroundColor: 'rgba(25, 118, 210, 0.1)',
                              transform: 'scale(1.1)'
                            },
                            transition: 'transform 0.2s'
                          }}
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 73 * emptyRows }}>
                <TableCell colSpan={5} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredNews.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            borderTop: '1px solid rgba(224, 224, 224, 1)',
            backgroundColor: '#f9fafc'
          }}
        />
      </TableContainer>

      {/* View/Edit Dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={handleCloseDialog} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 10px 40px rgba(0,0,0,0.15)'
          }
        }}  
      >
        <DialogTitle sx={{ backgroundColor: '#f5f5f5', py: 2.5, px: 3, borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1a237e' }}>News Article Details</Typography>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          {selectedNews && (
            <>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium', color: '#1a237e', mb: 2 }}>
                {selectedNews.title}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 1 }}>
                <Avatar 
                  src={`https://logo.clearbit.com/${selectedNews.source.toLowerCase()}.com`}
                  sx={{ width: 32, height: 32, mr: 1 }}
                >
                  {selectedNews.source.charAt(0)}
                </Avatar>
                <Typography variant="body1" sx={{ mr: 2, fontWeight: 'medium' }}>
                  {selectedNews.source}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedNews.timestamp}
                </Typography>
                <Box sx={{ ml: 'auto' }}>
                  <Chip
                    label={selectedNews.status.charAt(0).toUpperCase() + selectedNews.status.slice(1)}
                    color={
                      selectedNews.status === 'approved' ? 'success' :
                      selectedNews.status === 'pending' ? 'warning' : 'error'
                    }
                    sx={{ fontWeight: 'medium', px: 1 }}
                  />
                </Box>
              </Box>
              
              <Divider sx={{ my: 3 }} />
              
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium', color: '#455a64' }}>Summary</Typography>
              <TextField
                fullWidth
                multiline
                rows={8}
                value={editedSummary}
                onChange={(e) => setEditedSummary(e.target.value)}
                variant="outlined"
                sx={{ 
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    fontSize: '1rem',
                    backgroundColor: '#fafafa',
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#1976d2'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#1976d2',
                      borderWidth: 1
                    }
                  }
                }}
              />
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, backgroundColor: '#f5f5f5', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
          <Button 
            onClick={handleCloseDialog} 
            sx={{ 
              textTransform: 'none',
              fontWeight: 'medium',
              px: 3
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSaveSummary} 
            variant="contained" 
            sx={{ 
              textTransform: 'none', 
              bgcolor: '#1976d2',
              px: 3,
              py: 1,
              fontWeight: 'medium',
              boxShadow: '0 4px 10px rgba(25, 118, 210, 0.25)',
              '&:hover': {
                bgcolor: '#1565c0',
                boxShadow: '0 6px 15px rgba(25, 118, 210, 0.3)'
              }
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageNews;