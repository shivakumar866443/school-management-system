import { Alert, Box, Button, Card, CardContent, Stack, TextField, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader.jsx';
import { schoolProfile } from '../data/schoolData.js';
import { authApi } from '../services/api.js';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@school.com');
  const [password, setPassword] = useState('Admin@123');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await authApi.login({ email, password });
      navigate('/admin');
    } catch (apiError) {
      setError(apiError.message || 'Invalid admin credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box className="section-band">
      <Box className="page-shell" sx={{ maxWidth: 620 }}>
        <SectionHeader eyebrow="Admin" title="Secure school management login" subtitle="Access student records, employee details, academic indicators, attendance, and day-to-day administration from one focused workspace." />
        <Card>
          <CardContent>
            <Stack component="form" spacing={2.2} onSubmit={handleLogin}>
              <LockIcon color="primary" />
              <Typography color="text.secondary">Demo credentials: admin@school.com / Admin@123</Typography>
              {error && <Alert severity="error">{error}</Alert>}
              <TextField label="Admin Email" value={email} onChange={(event) => setEmail(event.target.value)} fullWidth />
              <TextField label="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} fullWidth />
              <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
                {isSubmitting ? 'Logging in...' : 'Login as Admin'}
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
