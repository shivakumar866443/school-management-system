import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import { NavLink } from 'react-router-dom';
import { navItems, schoolProfile } from '../data/schoolData.js';

export default function Navbar() {
  return (
    <AppBar position="sticky" color="inherit" elevation={0} sx={{ borderBottom: '1px solid #e6edf3' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ gap: 2, minHeight: 72 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, minWidth: { xs: 210, md: 250 } }}>
            <SchoolIcon color="primary" />
            <Typography variant="h6" color="primary.dark" noWrap>
              {schoolProfile.brandName}
            </Typography>
          </Box>

          <Box className="nav-scroll" sx={{ display: 'flex', gap: 0.5, flex: 1, pb: 0.5 }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
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
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
