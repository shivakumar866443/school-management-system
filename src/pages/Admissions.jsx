import { Alert, Box, Button, Card, CardContent, Grid, List, ListItem, ListItemText, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import SectionHeader from '../components/SectionHeader.jsx';
import { admissionSteps } from '../data/schoolData.js';
import { admissionsApi } from '../services/api.js';

const initialForm = {
  studentName: '',
  applyingForGrade: '',
  parentName: '',
  phone: '',
  message: ''
};

export default function Admissions() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: '', message: '' });
    setIsSubmitting(true);

    try {
      await admissionsApi.create(form);
      setForm(initialForm);
      setStatus({ type: 'success', message: 'Admission enquiry submitted successfully.' });
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'Unable to submit admission enquiry.' });
    } finally {
      setIsSubmitting(false);
    }
  };

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
                <Grid container spacing={2} component="form" onSubmit={handleSubmit}>
                  {status.message && (
                    <Grid item xs={12}>
                      <Alert severity={status.type}>{status.message}</Alert>
                    </Grid>
                  )}
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth required label="Student Name" value={form.studentName} onChange={(event) => handleChange('studentName', event.target.value)} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth required label="Class Applying For" value={form.applyingForGrade} onChange={(event) => handleChange('applyingForGrade', event.target.value)} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth required label="Parent Name" value={form.parentName} onChange={(event) => handleChange('parentName', event.target.value)} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth required label="Mobile Number" value={form.phone} onChange={(event) => handleChange('phone', event.target.value)} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth multiline minRows={4} label="Tell us about your child and preferred joining timeline" value={form.message} onChange={(event) => handleChange('message', event.target.value)} />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" endIcon={<SendIcon />} disabled={isSubmitting}>
                      {isSubmitting ? 'Submitting...' : 'Submit Admission Enquiry'}
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
