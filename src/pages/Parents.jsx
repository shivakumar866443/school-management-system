import { Box, Card, CardContent, Grid, Rating, Typography } from '@mui/material';
import SectionHeader from '../components/SectionHeader.jsx';
import { reviews } from '../data/schoolData.js';

export default function Parents() {
  return (
    <Box className="section-band">
      <Box className="page-shell">
        <SectionHeader
          eyebrow="Parents"
          title="Coordination, reviews, and transparent communication"
          subtitle="Families can understand how the school communicates progress, responds to concerns, and keeps parents connected to the child's daily development."
        />
        <Grid container spacing={3}>
          {reviews.map((review) => (
            <Grid item xs={12} md={4} key={review.name}>
              <Card>
                <CardContent>
                  <Rating value={review.rating} precision={0.1} readOnly />
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    {review.name}
                  </Typography>
                  <Typography variant="body2" color="primary.dark" fontWeight={700} sx={{ mb: 1 }}>
                    {review.relation}
                  </Typography>
                  <Typography color="text.secondary">{review.comment}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
