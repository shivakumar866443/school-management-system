import { Box, Card, CardContent, Grid, LinearProgress, Typography } from '@mui/material';
import SectionHeader from '../components/SectionHeader.jsx';
import { studentPerformance } from '../data/schoolData.js';

export default function Academics() {
  return (
    <Box className="section-band">
      <Box className="page-shell">
        <SectionHeader
          eyebrow="Academics"
          title="Strong academics with steady learning support"
          subtitle="The academic program focuses on concept clarity, reading, written expression, assessments, remedial plans, and regular communication with families."
        />
        <Grid container spacing={3}>
          {studentPerformance.map((item) => (
            <Grid item xs={12} md={6} key={item.name}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{item.name}</Typography>
                  <LinearProgress variant="determinate" value={item.value} sx={{ my: 2, height: 10, borderRadius: 5 }} />
                  <Typography color="text.secondary">{item.value}% current term learning indicator with teacher-led support plans.</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
