import React from "react";
import { Box, Typography, IconButton, Menu, MenuItem, Button } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { Link, useLocation } from 'react-router-dom';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const location = useLocation();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ 
      backgroundColor: 'Black',
      width: '100%',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 1300,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      borderBottom: '1px solid rgba(255,255,255,0.1)'
    }}>
      <Box sx={{ 
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ 
              fontWeight: 700,
              fontSize: '1.8rem',
              color: 'White',
              letterSpacing: '0.5px',
              textShadow: '0 1px 2px rgba(0,0,0,0.1)'
            }}
          >
            News App
          </Typography>
        </Link>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton 
            onClick={handleClick}
            sx={{ 
              color: 'White',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)'
              }
            }}
          >
            <LanguageIcon />
          </IconButton>
          <Menu 
            anchorEl={anchorEl} 
            open={open} 
            onClose={handleClose}
            PaperProps={{
              sx: {
                mt: 1,
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }
            }}
          >
            <MenuItem onClick={handleClose} sx={{ py: 1.5, px: 3 }}>English</MenuItem>
            <MenuItem onClick={handleClose} sx={{ py: 1.5, px: 3 }}>Hindi</MenuItem>
            <MenuItem onClick={handleClose} sx={{ py: 1.5, px: 3 }}>Tamil</MenuItem>
            <MenuItem onClick={handleClose} sx={{ py: 1.5, px: 3 }}>Telugu</MenuItem>
          </Menu>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;