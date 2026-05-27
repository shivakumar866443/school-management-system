import { Box, Typography } from '@mui/material';

export default function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <Box sx={{ mb: 4 }}>
      {eyebrow && (
        <Typography variant="overline" color="secondary" fontWeight={800}>
          {eyebrow}
        </Typography>
      )}
      <Typography variant="h3" sx={{ mt: 0.5, fontSize: { xs: 30, md: 42 } }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 760 }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}
