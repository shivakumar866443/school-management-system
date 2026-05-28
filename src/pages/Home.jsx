import { Box, Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { operationalModules } from '../data/schoolData.js';

export default function Home() {
  const [activeModule, setActiveModule] = useState(operationalModules[0]);

  return (
    <>
      <HeroSection />
      <Box className="section-band">
        <Box className="page-shell">
          <SectionHeader
            eyebrow="School Management"
            title="A complete digital presence for a growing school"
            subtitle="Peepal Tree Schools brings admissions, academics, parent communication, student progress, gallery, careers, and administration into one clear experience for families and school teams."
          />
          <Grid container spacing={3} alignItems="stretch">
            {[
              ['For Parents', 'Clear updates on admissions, attendance, reviews, events, and student progress.'],
              ['For Teachers', 'Organized classroom observations, subject performance, mentoring notes, and parent meeting context.'],
              ['For Management', 'A professional web presence with practical dashboards, records, enquiries, and school communication.']
            ].map(([title, text]) => (
              <Grid item xs={12} md={4} key={title}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>{title}</Typography>
                    <Typography color="text.secondary">{text}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      <Box className="section-band" sx={{ bgcolor: '#eef4f6' }}>
        <Box className="page-shell">
          <SectionHeader title="Operational Modules" subtitle="Practical school workflows presented in a simple, parent-friendly way while still supporting management needs." />
          <Grid container spacing={2} alignItems="stretch">
            {operationalModules.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={item.title}>
                <Card
                  component="button"
                  onClick={() => setActiveModule(item)}
                  sx={{
                    width: '100%',
                    height: '100%',
                    minHeight: 152,
                    p: 0,
                    textAlign: 'left',
                    border: activeModule.title === item.title ? '2px solid #0b6b7a' : '1px solid #dbe5ea',
                    bgcolor: activeModule.title === item.title ? '#ffffff' : '#fbfdfe',
                    cursor: 'pointer'
                  }}
                >
                  <CardContent sx={{ height: '100%' }}>
                    <Stack spacing={1.2}>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                      {index % 2 === 0 ? <GroupsIcon color="primary" /> : <SportsEsportsIcon color="secondary" />}
                        <Typography variant="h6">{item.title}</Typography>
                      </Stack>
                      <Typography color="text.secondary">{item.summary}</Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Card sx={{ mt: 3, borderLeft: '5px solid #0b6b7a' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>{activeModule.title}</Typography>
              <Typography color="text.secondary" sx={{ mb: 2 }}>{activeModule.details}</Typography>
              <Button component={Link} to="/dashboard" endIcon={<ArrowForwardIcon />} variant="contained">
                View School Dashboard
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  );
}
