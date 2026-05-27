import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import SectionHeader from '../components/SectionHeader.jsx';

export default function About() {
  return (
    <Box className="section-band">
      <Box className="page-shell">
        <SectionHeader
          eyebrow="About"
          title="A common, customizable website for all schools"
          subtitle="Branding, images, address, admissions content, gallery, teachers, and reviews can be replaced from the static data file without changing the application structure."
        />
        <Grid container spacing={3}>
          {['Reusable Template', 'Future Backend Ready', 'Privacy Aware'].map((title) => (
            <Grid item xs={12} md={4} key={title}>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {title}
                  </Typography>
                  <Typography color="text.secondary">
                    The public site shows summary-level information. Sensitive student details are kept inside the admin area.
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
