import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import PsychologyIcon from '@mui/icons-material/Psychology';
import ForumIcon from '@mui/icons-material/Forum';
import SectionHeader from '../components/SectionHeader.jsx';
import StudentTable from '../components/StudentTable.jsx';

const growthAreas = [
  { title: 'Games & Sports', icon: <SportsBasketballIcon color="primary" />, text: 'Track participation, fitness, teamwork, house events, and certificates.' },
  { title: 'Teacher Interaction', icon: <ForumIcon color="secondary" />, text: 'Capture classroom observations, mentoring notes, academic support, and follow-ups.' },
  { title: 'Child Development', icon: <PsychologyIcon color="success" />, text: 'Monitor confidence, communication, discipline, creativity, and leadership habits.' }
];

export default function StudentGrowth() {
  return (
    <Box className="section-band">
      <Box className="page-shell">
        <SectionHeader
          eyebrow="Student Growth"
          title="Whole-child progress across academics and activities"
          subtitle="Student growth is viewed through attendance, marks, participation, teacher feedback, behaviour, sports, and confidence indicators."
        />
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {growthAreas.map((area) => (
            <Grid item xs={12} md={4} key={area.title}>
              <Card>
                <CardContent>
                  {area.icon}
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    {area.title}
                  </Typography>
                  <Typography color="text.secondary">{area.text}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <StudentTable />
      </Box>
    </Box>
  );
}
