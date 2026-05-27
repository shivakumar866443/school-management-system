import { Box, Grid } from '@mui/material';
import SectionHeader from '../components/SectionHeader.jsx';
import { galleryImages } from '../data/schoolData.js';

export default function Gallery() {
  return (
    <Box className="section-band">
      <Box className="page-shell">
        <SectionHeader
          eyebrow="Gallery"
          title="Campus, classroom, sports, and events"
          subtitle="Replace these temporary public images with school-provided photos when the client shares assets."
        />
        <Grid container spacing={2}>
          {galleryImages.map((image) => (
            <Grid item xs={12} sm={6} md={4} key={image}>
              <Box
                component="img"
                src={image}
                alt="School gallery"
                sx={{ width: '100%', height: 250, objectFit: 'cover', borderRadius: 2, display: 'block' }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
