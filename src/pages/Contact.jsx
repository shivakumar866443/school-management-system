import { Box, Button, Card, CardContent, Grid, Stack, TextField, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import SectionHeader from '../components/SectionHeader.jsx';
import { schoolProfile } from '../data/schoolData.js';

export default function Contact() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(schoolProfile.mapQuery)}&output=embed`;

  return (
    <Box className="section-band">
      <Box className="page-shell">
        <SectionHeader
          eyebrow="Contact"
          title="Address, map, and enquiry details"
          subtitle="Using free Google Maps embed for now. The address can be changed for each school from static data."
        />
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <Card>
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="h5">Reach the school</Typography>
                  <Stack direction="row" spacing={1.5}><LocationOnIcon color="primary" /><Typography>{schoolProfile.address}</Typography></Stack>
                  <Stack direction="row" spacing={1.5}><PhoneIcon color="primary" /><Typography>{schoolProfile.phone}</Typography></Stack>
                  <Stack direction="row" spacing={1.5}><EmailIcon color="primary" /><Typography>{schoolProfile.email}</Typography></Stack>
                  <TextField label="Your Name" fullWidth />
                  <TextField label="Email or Phone" fullWidth />
                  <TextField label="Message" multiline minRows={4} fullWidth />
                  <Button variant="contained">Send Static Message</Button>
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
