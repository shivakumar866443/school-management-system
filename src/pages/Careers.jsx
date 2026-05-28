import { Box, Button, Card, CardContent, Chip, Grid, Stack, Typography } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SectionHeader from '../components/SectionHeader.jsx';
import { careers } from '../data/schoolData.js';

export default function Careers() {
  return (
    <Box className="section-band">
      <Box className="page-shell">
        <SectionHeader
          eyebrow="Careers"
          title="Join a team that shapes children every day"
          subtitle="Peepal Tree Schools welcomes teachers, coordinators, coaches, and support staff who care about discipline, warmth, subject clarity, and student confidence."
        />
        <Card sx={{ mb: 3, background: 'linear-gradient(135deg, #0b6b7a 0%, #17212b 100%)', color: '#fff' }}>
          <CardContent>
            <Typography variant="h4" gutterBottom>Why work with us?</Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.78)', maxWidth: 860 }}>
              Faculty members receive academic planning support, regular feedback, coordinated parent communication,
              and opportunities to lead clubs, events, mentoring programs, and student development initiatives.
            </Typography>
          </CardContent>
        </Card>
        <Grid container spacing={3}>
          {careers.map((job) => (
            <Grid item xs={12} sm={6} md={3} key={job.role}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <WorkIcon color="primary" />
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    {job.role}
                  </Typography>
                  <Typography color="text.secondary">{job.department}</Typography>
                  <Typography color="text.secondary" sx={{ mt: 1.5, minHeight: 72 }}>{job.note}</Typography>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                    <Chip size="small" label={job.type} />
                    <Button size="small" endIcon={<ArrowForwardIcon />}>Apply</Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
