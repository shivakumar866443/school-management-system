import { AppBar, Box, Button, Container, Divider, Drawer, IconButton, List, ListItemButton, ListItemText, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SchoolIcon from '@mui/icons-material/School';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { schoolProfile } from '../data/schoolData.js';

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const menuGroups = [
    {
      label: 'Home',
      path: '/',
      children: [
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'About', path: '/about' }
      ]
    },
    {
      label: 'Careers',
      path: '/careers',
      children: [
        { label: 'Admission', path: '/admissions' },
        { label: 'Academics', path: '/academics' },
        { label: 'Student Growth', path: '/student-growth' }
      ]
    },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Parents Interaction', path: '/parents' },
    { label: 'Contact', path: '/contact' },
    { label: 'Admin Login', path: '/admin/login' }
  ];

  return (
    <AppBar position="sticky" color="inherit" elevation={0} sx={{ borderBottom: '1px solid #e6edf3' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ gap: 2, minHeight: 72 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, minWidth: { xs: 0, md: 250 }, flex: { xs: 1, md: '0 0 auto' } }}>
            <SchoolIcon color="primary" />
            <Typography variant="h6" color="primary.dark" noWrap>
              {schoolProfile.brandName}
            </Typography>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.75, flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
            {menuGroups.map((item) => (
              <Box
                key={item.path}
                sx={{
                  position: 'relative',
                  py: 1.5,
                  '&:hover .hover-menu': {
                    opacity: 1,
                    pointerEvents: 'auto',
                    transform: 'translateY(0)'
                  }
                }}
              >
                <Button
                  component={NavLink}
                  to={item.path}
                  sx={{
                    color: 'text.secondary',
                    whiteSpace: 'nowrap',
                    px: 1.5,
                    '&.active': {
                      color: 'primary.dark',
                      bgcolor: 'rgba(11, 107, 122, 0.08)'
                    }
                  }}
                >
                  {item.label}
                </Button>
                {item.children && (
                  <Box
                    className="hover-menu"
                    sx={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      minWidth: 210,
                      bgcolor: '#ffffff',
                      border: '1px solid #dbe5ea',
                      borderRadius: 1,
                      boxShadow: '0 16px 36px rgba(22, 33, 43, 0.12)',
                      opacity: 0,
                      pointerEvents: 'none',
                      transform: 'translateY(8px)',
                      transition: 'all 160ms ease',
                      zIndex: 20,
                      overflow: 'hidden'
                    }}
                  >
                    {item.children.map((child) => (
                      <Button
                        key={child.path}
                        component={NavLink}
                        to={child.path}
                        fullWidth
                        sx={{
                          justifyContent: 'flex-start',
                          color: 'text.secondary',
                          borderRadius: 0,
                          px: 2,
                          py: 1.2,
                          '&.active': {
                            color: 'primary.dark',
                            bgcolor: 'rgba(11, 107, 122, 0.08)'
                          }
                        }}
                      >
                        {child.label}
                      </Button>
                    ))}
                  </Box>
                )}
              </Box>
            ))}
          </Box>

          <IconButton color="primary" onClick={() => setDrawerOpen(true)} sx={{ display: { xs: 'inline-flex', md: 'none' } }} aria-label="open navigation">
            <MenuIcon />
          </IconButton>
          <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
            <Box sx={{ width: 290, p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <SchoolIcon color="primary" />
                <Typography variant="h6" color="primary.dark">
                  {schoolProfile.brandName}
                </Typography>
              </Box>
              <Divider />
              <List>
                {menuGroups.map((item) => (
                  <Box key={item.path}>
                    <ListItemButton component={NavLink} to={item.path} onClick={() => setDrawerOpen(false)}>
                      <ListItemText primary={item.label} />
                    </ListItemButton>
                    {item.children?.map((child) => (
                      <ListItemButton key={child.path} component={NavLink} to={child.path} onClick={() => setDrawerOpen(false)} sx={{ pl: 4 }}>
                        <ListItemText primary={child.label} />
                      </ListItemButton>
                    ))}
                  </Box>
                ))}
              </List>
            </Box>
          </Drawer>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
