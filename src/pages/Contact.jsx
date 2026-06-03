import { Alert, Box, Button, Card, CardContent, Grid, Stack, TextField, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { useState } from 'react';
import SectionHeader from '../components/SectionHeader.jsx';
import { schoolProfile } from '../data/schoolData.js';
import { contactApi } from '../services/api.js';

const initialForm = {
  name: '',
  emailOrPhone: '',
  message: ''
};

export default function Contact() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(schoolProfile.mapQuery)}&output=embed`;
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
      await contactApi.create(form);
      setForm(initialForm);
      setStatus({ type: 'success', message: 'Message sent successfully.' });
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'Unable to send message.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box className="section-band">
      <Box className="page-shell">
        <SectionHeader
          eyebrow="Contact"
          title="Address, map, and enquiry details"
          subtitle="Reach the school office for admissions, transport, fee guidance, parent meetings, and general campus information."
        />
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <Card>
              <CardContent>
                <Stack spacing={2} component="form" onSubmit={handleSubmit}>
                  <Typography variant="h5">Reach the school</Typography>
                  <Stack direction="row" spacing={1.5}><LocationOnIcon color="primary" /><Typography>{schoolProfile.address}</Typography></Stack>
                  <Stack direction="row" spacing={1.5}><PhoneIcon color="primary" /><Typography>{schoolProfile.phone}</Typography></Stack>
                  <Stack direction="row" spacing={1.5}><EmailIcon color="primary" /><Typography>{schoolProfile.email}</Typography></Stack>
                  {status.message && <Alert severity={status.type}>{status.message}</Alert>}
                  <TextField required label="Your Name" fullWidth value={form.name} onChange={(event) => handleChange('name', event.target.value)} />
                  <TextField required label="Email or Phone" fullWidth value={form.emailOrPhone} onChange={(event) => handleChange('emailOrPhone', event.target.value)} />
                  <TextField required label="Message" multiline minRows={4} fullWidth value={form.message} onChange={(event) => handleChange('message', event.target.value)} />
                  <Button type="submit" variant="contained" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={7}>
            <iframe className="map-frame" title="School map" src={mapSrc} loading="lazy" />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
