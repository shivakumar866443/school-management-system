import { Alert, Box, Button, Card, CardContent, Stack, TextField, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader.jsx';
import { schoolProfile } from '../data/schoolData.js';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@school.com');
  const [password, setPassword] = useState('Admin@123');
  const [error, setError] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    if (email === schoolProfile.adminCredentials.email && password === schoolProfile.adminCredentials.password) {
      const fakeJwt = btoa(JSON.stringify({ role: 'admin', email, loginAt: new Date().toISOString() }));
      sessionStorage.setItem('school_admin_token', fakeJwt);
      navigate('/admin');
      return;
    }
    setError('Invalid static admin credentials.');
  };

  return (
    <Box className="section-band">
      <Box className="page-shell" sx={{ maxWidth: 620 }}>
        <SectionHeader eyebrow="Admin" title="Secure admin login" subtitle="Static demo login. Replace this with JWT APIs when backend development starts." />
        <Card>
          <CardContent>
            <Stack component="form" spacing={2.2} onSubmit={handleLogin}>
              <LockIcon color="primary" />
              <Typography color="text.secondary">Demo credentials: admin@school.com / Admin@123</Typography>
              {error && <Alert severity="error">{error}</Alert>}
              <TextField label="Admin Email" value={email} onChange={(event) => setEmail(event.target.value)} fullWidth />
              <TextField label="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} fullWidth />
              <Button type="submit" variant="contained" size="large">
                Login as Admin
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
