import { Card, CardContent, Stack, Typography } from '@mui/material';

export default function MetricCard({ icon, label, value, helper }) {
  return (
    <Card>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          {icon}
          <Typography color="text.secondary">{label}</Typography>
        </Stack>
        <Typography variant="h4" sx={{ mt: 1 }}>
          {value}
        </Typography>
        {helper && (
          <Typography color="text.secondary" variant="body2" sx={{ mt: 0.5 }}>
            {helper}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
