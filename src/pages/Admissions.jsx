import { Box, Button, Card, CardContent, Grid, List, ListItem, ListItemText, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SectionHeader from '../components/SectionHeader.jsx';
import { admissionSteps } from '../data/schoolData.js';

export default function Admissions() {
  return (
    <Box className="section-band">
      <Box className="page-shell">
        <SectionHeader
          eyebrow="Admissions"
          title="A clear admission journey for every family"
          subtitle="Parents can share basic details, understand the school process, and connect with the admissions team for counselling, campus visits, and class availability."
        />
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Admission Process
                </Typography>
                <List>
                  {admissionSteps.map((step, index) => (
                    <ListItem key={step} disableGutters>
                      <ListItemText primary={`${index + 1}. ${step}`} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={7}>
            <Card>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Student Name" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Class Applying For" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Parent Name" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Mobile Number" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth multiline minRows={4} label="Tell us about your child and preferred joining timeline" />
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" endIcon={<SendIcon />}>
                      Submit Admission Enquiry
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
