import { Box, Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import SectionHeader from '../components/SectionHeader.jsx';
import { careers } from '../data/schoolData.js';

export default function Careers() {
  return (
    <Box className="section-band">
      <Box className="page-shell">
        <SectionHeader
          eyebrow="Careers"
          title="Teacher and staff openings"
          subtitle="Schools can publish teacher jobs, coordinator roles, coaches, and support staff positions here."
        />
        <Grid container spacing={3}>
          {careers.map((job) => (
            <Grid item xs={12} sm={6} md={3} key={job.role}>
              <Card>
                <CardContent>
                  <WorkIcon color="primary" />
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    {job.role}
                  </Typography>
                  <Typography color="text.secondary">{job.department}</Typography>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                    <Typography variant="body2">{job.type}</Typography>
                    <Button size="small">Apply</Button>
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
