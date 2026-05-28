import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import { activities, schoolProfile } from '../data/schoolData.js';

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: '#17212b', color: '#ffffff', py: 6, mt: 8 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <Typography variant="h5" gutterBottom>
              {schoolProfile.brandName}
            </Typography>
            <Typography color="rgba(255,255,255,0.72)">
              A caring school community focused on academics, values, student confidence,
              parent communication, and well-managed campus operations.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Modules
            </Typography>
            <Typography color="rgba(255,255,255,0.72)" variant="body2" sx={{ mb: 1 }}>
              Everyday school workflows for admissions, learning, activities, parent updates, and administration.
            </Typography>
            <Stack spacing={0.7}>
              {activities.slice(0, 5).map((item) => (
                <Typography key={item} color="rgba(255,255,255,0.72)" variant="body2">
                  {item}
                </Typography>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              Contact
            </Typography>
            <Typography color="rgba(255,255,255,0.72)" variant="body2" sx={{ mb: 1 }}>
              Connect with the admissions desk for campus visits, class availability, and parent counselling.
            </Typography>
            <Typography color="rgba(255,255,255,0.72)" variant="body2">
              {schoolProfile.address}
            </Typography>
            <Typography color="rgba(255,255,255,0.72)" variant="body2">
              {schoolProfile.phone}
            </Typography>
            <Typography color="rgba(255,255,255,0.72)" variant="body2">
              {schoolProfile.email}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
