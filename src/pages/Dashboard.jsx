import { Box, Grid } from '@mui/material';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import GradeIcon from '@mui/icons-material/Grade';
import GroupsIcon from '@mui/icons-material/Groups';
import ReviewsIcon from '@mui/icons-material/Reviews';
import DashboardCharts from '../components/DashboardCharts.jsx';
import MetricCard from '../components/MetricCard.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import StudentTable from '../components/StudentTable.jsx';

export default function Dashboard() {
  return (
    <Box className="section-band">
      <Box className="page-shell">
        <SectionHeader
          eyebrow="Dashboard"
          title="School overview with charts and tables"
          subtitle="Public users see aggregated academic, attendance, engagement, and review details. Full student names are available only after admin login."
        />
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard icon={<Diversity3Icon color="primary" />} label="Attendance" value="96%" helper="Current term" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard icon={<GradeIcon color="secondary" />} label="Average Marks" value="89%" helper="Across grades" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard icon={<GroupsIcon color="success" />} label="Parent Meetings" value="312" helper="This year" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard icon={<ReviewsIcon color="warning" />} label="Reviews" value="4.8" helper="Average rating" />
          </Grid>
        </Grid>
        <DashboardCharts />
        <Box sx={{ mt: 4 }}>
          <StudentTable />
        </Box>
      </Box>
    </Box>
  );
}
