import { Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import HeroSection from '../components/HeroSection.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import DashboardCharts from '../components/DashboardCharts.jsx';
import MetricCard from '../components/MetricCard.jsx';
import { activities, stats } from '../data/schoolData.js';

export default function Home() {
  return (
    <>
      <HeroSection />
      <Box className="section-band">
        <Box className="page-shell">
          <SectionHeader
            eyebrow="School Management"
            title="Everything a school needs on day one"
            subtitle="This static website can be reused for any school and later connected to Node.js, MongoDB, file uploads, and real JWT authentication."
          />
          <Grid container spacing={3}>
            {stats.map((stat) => (
              <Grid item xs={12} sm={6} md={3} key={stat.label}>
                <MetricCard label={stat.label} value={stat.value} helper="Static demo data" icon={<AutoGraphIcon color="primary" />} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      <Box className="section-band" sx={{ bgcolor: '#eef4f6' }}>
        <Box className="page-shell">
          <DashboardCharts />
        </Box>
      </Box>

      <Box className="section-band">
        <Box className="page-shell">
          <SectionHeader title="Operational Modules" subtitle="Admissions, parents, teachers, student performance, games, reviews, and communication are represented with static content." />
          <Grid container spacing={2}>
            {activities.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={item}>
                <Card>
                  <CardContent>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      {index % 2 === 0 ? <GroupsIcon color="primary" /> : <SportsEsportsIcon color="secondary" />}
                      <Typography variant="h6">{item}</Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
}
