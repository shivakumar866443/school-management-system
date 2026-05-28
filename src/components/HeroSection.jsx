import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import { Link } from 'react-router-dom';
import { schoolProfile, stats } from '../data/schoolData.js';

export default function HeroSection() {
  return (
    <Box
      sx={{
        minHeight: { xs: 680, md: 620 },
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        backgroundImage: `linear-gradient(90deg, rgba(23,33,43,0.88), rgba(23,33,43,0.42)), url(${schoolProfile.heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        py: { xs: 7, md: 0 }
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5} alignItems="center">
          <Grid item xs={12} md={7}>
            <Typography variant="overline" sx={{ color: '#f2c94c', fontWeight: 800 }}>
              Admissions open for the new academic year
            </Typography>
            <Typography variant="h1" sx={{ fontSize: { xs: 42, md: 66 }, lineHeight: 1.02, mt: 1 }}>
              {schoolProfile.brandName}
            </Typography>
            <Typography variant="h5" sx={{ mt: 2, maxWidth: 720, color: 'rgba(255,255,255,0.82)' }}>
              {schoolProfile.tagLine}. A caring campus experience with smart school operations,
              clear parent communication, student growth tracking, admissions, careers, gallery,
              and management dashboards.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 4 }}>
              <Button
                variant="contained"
                size="large"
                component={Link}
                to="/admissions"
                endIcon={<ArrowForwardIcon />}
                sx={{ bgcolor: '#f2a900', color: '#17212b', '&:hover': { bgcolor: '#d89200' } }}
              >
                Start Admission
              </Button>
              <Button variant="outlined" size="large" component={Link} to="/dashboard" startIcon={<QueryStatsIcon />} sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.55)' }}>
                View Dashboard
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12} md={5}>
            <Grid container spacing={2}>
              {stats.map((stat) => (
                <Grid item xs={6} key={stat.label}>
                  <Box sx={{ p: 2.5, bgcolor: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.24)', borderRadius: 2, backdropFilter: 'blur(10px)' }}>
                    <Typography variant="h4">{stat.value}</Typography>
                    <Typography color="rgba(255,255,255,0.72)">{stat.label}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
