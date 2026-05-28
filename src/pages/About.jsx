import { Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import SectionHeader from '../components/SectionHeader.jsx';

const pillars = [
  {
    title: 'Learning With Purpose',
    icon: <MenuBookIcon color="primary" />,
    text: 'Concept-based teaching, regular assessments, reading habits, and practical classroom activities help students understand before they memorize.'
  },
  {
    title: 'Values And Care',
    icon: <VolunteerActivismIcon color="secondary" />,
    text: 'Teachers focus on discipline, empathy, communication, confidence, and personal attention so every child feels seen and supported.'
  },
  {
    title: 'Beyond The Classroom',
    icon: <EmojiEventsIcon color="warning" />,
    text: 'Sports, assemblies, competitions, cultural events, and leadership activities give students space to discover strengths beyond academics.'
  }
];

export default function About() {
  return (
    <Box className="section-band">
      <Box className="page-shell">
        <SectionHeader
          eyebrow="About"
          title="A school built around learning, care, and confidence"
          subtitle="Peepal Tree Schools is designed for families who want strong academics, clear communication, safe routines, and opportunities for children to grow as complete individuals."
        />
        <Grid container spacing={3} alignItems="stretch">
          <Grid item xs={12} md={5}>
            <Card sx={{ height: '100%', bgcolor: '#17212b', color: '#fff' }}>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  Our Approach
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.78)' }}>
                  The school combines classroom teaching, student mentoring, parent coordination,
                  activities, and transparent progress updates. Each child is guided through
                  academics, behaviour, communication, wellness, and participation.
                </Typography>
                <Stack spacing={1.5} sx={{ mt: 3 }}>
                  {['Safe and disciplined campus routines', 'Experienced teachers and coordinators', 'Regular parent-teacher communication'].map((item) => (
                    <Typography key={item} sx={{ color: 'rgba(255,255,255,0.86)' }}>
                      {item}
                    </Typography>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={7}>
            <Grid container spacing={3}>
              {pillars.map((pillar) => (
                <Grid item xs={12} key={pillar.title}>
                  <Card>
                    <CardContent>
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }}>
                        {pillar.icon}
                        <Box>
                          <Typography variant="h5" gutterBottom>
                            {pillar.title}
                          </Typography>
                          <Typography color="text.secondary">{pillar.text}</Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
          {['1,240+ Students', '86 Teachers', '4.8 Parent Rating'].map((title) => (
            <Grid item xs={12} md={4} key={title}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {title}
                  </Typography>
                  <Typography color="text.secondary">
                    A growing community supported by structured academics, activities, and responsible school administration.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
