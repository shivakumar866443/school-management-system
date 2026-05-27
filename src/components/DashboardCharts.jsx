import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { dashboardMetrics, studentPerformance } from '../data/schoolData.js';

const COLORS = ['#0b6b7a', '#d7472f', '#16865f', '#f2a900', '#5f5aa2'];

export default function DashboardCharts() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={8}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Monthly School Performance
            </Typography>
            <Box sx={{ height: 360 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dashboardMetrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="attendance" fill="#0b6b7a" name="Attendance %" />
                  <Bar dataKey="performance" fill="#d7472f" name="Performance %" />
                  <Bar dataKey="engagement" fill="#16865f" name="Engagement %" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Skill Distribution
            </Typography>
            <Box sx={{ height: 360 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={studentPerformance} dataKey="value" nameKey="name" outerRadius={110} label>
                    {studentPerformance.map((entry, index) => (
                      <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
