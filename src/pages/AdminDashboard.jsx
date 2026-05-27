import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  IconButton,
  Paper,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import HistoryIcon from '@mui/icons-material/History';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import BadgeIcon from '@mui/icons-material/Badge';
import SaveIcon from '@mui/icons-material/Save';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardCharts from '../components/DashboardCharts.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { employees as employeeSeed, students as studentSeed } from '../data/schoolData.js';

const emptyStudent = {
  name: '',
  grade: '',
  parent: '',
  phone: '',
  attendance: '',
  marks: '',
  status: 'Good'
};

const emptyEmployee = {
  name: '',
  role: '',
  department: '',
  phone: '',
  experience: '',
  status: 'Active'
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('students');
  const [mode, setMode] = useState('list');
  const [editingId, setEditingId] = useState(null);
  const [studentRows, setStudentRows] = useState(studentSeed);
  const [employeeRows, setEmployeeRows] = useState(employeeSeed);
  const [studentForm, setStudentForm] = useState(emptyStudent);
  const [employeeForm, setEmployeeForm] = useState(emptyEmployee);

  const logout = () => {
    sessionStorage.removeItem('school_admin_token');
    navigate('/admin/login');
  };

  const activeRows = tab === 'students' ? studentRows : employeeRows;
  const activeForm = tab === 'students' ? studentForm : employeeForm;
  const activeTitle = tab === 'students' ? 'Student' : 'Employee';

  const summary = useMemo(
    () => [
      { label: 'Students', value: studentRows.length, icon: <PeopleAltIcon color="primary" /> },
      { label: 'Employees', value: employeeRows.length, icon: <BadgeIcon color="secondary" /> },
      { label: 'Records Updated', value: studentRows.length + employeeRows.length, icon: <EditIcon color="success" /> },
      { label: 'History Mode', value: 'Static', icon: <HistoryIcon color="warning" /> }
    ],
    [employeeRows.length, studentRows.length]
  );

  const setActiveForm = (nextForm) => {
    if (tab === 'students') {
      setStudentForm(nextForm);
      return;
    }
    setEmployeeForm(nextForm);
  };

  const openCreate = (type = tab) => {
    setTab(type);
    setEditingId(null);
    setStudentForm(emptyStudent);
    setEmployeeForm(emptyEmployee);
    setMode('form');
  };

  const openEdit = (record) => {
    setEditingId(record.id);
    setActiveForm({ ...record });
    setMode('form');
  };

  const goBack = () => {
    setEditingId(null);
    setStudentForm(emptyStudent);
    setEmployeeForm(emptyEmployee);
    setMode('list');
  };

  const handleFieldChange = (field, value) => {
    setActiveForm({ ...activeForm, [field]: value });
  };

  const saveRecord = () => {
    if (tab === 'students') {
      const payload = {
        ...studentForm,
        attendance: Number(studentForm.attendance || 0),
        marks: Number(studentForm.marks || 0)
      };
      if (editingId) {
        setStudentRows((rows) => rows.map((row) => (row.id === editingId ? { ...payload, id: editingId } : row)));
      } else {
        setStudentRows((rows) => [{ ...payload, id: Date.now() }, ...rows]);
      }
    } else if (editingId) {
      setEmployeeRows((rows) => rows.map((row) => (row.id === editingId ? { ...employeeForm, id: editingId } : row)));
    } else {
      setEmployeeRows((rows) => [{ ...employeeForm, id: Date.now() }, ...rows]);
    }
    goBack();
  };

  const deleteRecord = (id) => {
    if (tab === 'students') {
      setStudentRows((rows) => rows.filter((row) => row.id !== id));
      return;
    }
    setEmployeeRows((rows) => rows.filter((row) => row.id !== id));
  };

  const renderForm = () => (
    <Card sx={{ overflow: 'hidden' }}>
      <Box sx={{ bgcolor: '#17212b', color: '#fff', p: 3 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={goBack} sx={{ color: '#fff', mb: 2 }}>
          Back
        </Button>
        <Typography variant="h4">{editingId ? `Edit ${activeTitle}` : `Add ${activeTitle}`}</Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.7)', mt: 0.5 }}>
          Static admin entry now. Later this same screen can call Node.js APIs with JWT authorization.
        </Typography>
      </Box>
      <CardContent>
        <Grid container spacing={2.5}>
          {tab === 'students' ? (
            <>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Student Name" value={studentForm.name} onChange={(event) => handleFieldChange('name', event.target.value)} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Grade" value={studentForm.grade} onChange={(event) => handleFieldChange('grade', event.target.value)} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Parent Name" value={studentForm.parent} onChange={(event) => handleFieldChange('parent', event.target.value)} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Phone" value={studentForm.phone} onChange={(event) => handleFieldChange('phone', event.target.value)} />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth label="Attendance %" type="number" value={studentForm.attendance} onChange={(event) => handleFieldChange('attendance', event.target.value)} />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth label="Marks %" type="number" value={studentForm.marks} onChange={(event) => handleFieldChange('marks', event.target.value)} />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth label="Status" value={studentForm.status} onChange={(event) => handleFieldChange('status', event.target.value)} />
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Employee Name" value={employeeForm.name} onChange={(event) => handleFieldChange('name', event.target.value)} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Role" value={employeeForm.role} onChange={(event) => handleFieldChange('role', event.target.value)} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Department" value={employeeForm.department} onChange={(event) => handleFieldChange('department', event.target.value)} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Phone" value={employeeForm.phone} onChange={(event) => handleFieldChange('phone', event.target.value)} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Experience" value={employeeForm.experience} onChange={(event) => handleFieldChange('experience', event.target.value)} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Status" value={employeeForm.status} onChange={(event) => handleFieldChange('status', event.target.value)} />
              </Grid>
            </>
          )}
          <Grid item xs={12}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
              <Button variant="contained" size="large" startIcon={<SaveIcon />} onClick={saveRecord}>
                Save {activeTitle}
              </Button>
              <Button variant="outlined" size="large" startIcon={<ArrowBackIcon />} onClick={goBack}>
                Back to Details
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  const renderTable = () => (
    <Card>
      <CardContent>
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ md: 'center' }} spacing={2} sx={{ mb: 2 }}>
          <Box>
            <Typography variant="h5">{activeTitle} Details</Typography>
            <Typography color="text.secondary">
              Admin can view, add, edit, and delete {tab === 'students' ? 'student' : 'employee'} records here.
            </Typography>
          </Box>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => openCreate(tab)}>
            Add {activeTitle}
          </Button>
        </Stack>
        <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead sx={{ bgcolor: '#eef4f6' }}>
              {tab === 'students' ? (
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Grade</TableCell>
                  <TableCell>Parent</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Attendance</TableCell>
                  <TableCell>Marks</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Experience</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              )}
            </TableHead>
            <TableBody>
              {activeRows.map((row) =>
                tab === 'students' ? (
                  <TableRow key={row.id} hover>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.grade}</TableCell>
                    <TableCell>{row.parent}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>{row.attendance}%</TableCell>
                    <TableCell>{row.marks}%</TableCell>
                    <TableCell>
                      <Chip size="small" color={row.status === 'Excellent' ? 'success' : 'primary'} label={row.status} />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton color="primary" onClick={() => openEdit(row)} aria-label="edit student">
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => deleteRecord(row.id)} aria-label="delete student">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow key={row.id} hover>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.role}</TableCell>
                    <TableCell>{row.department}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>{row.experience}</TableCell>
                    <TableCell>
                      <Chip size="small" color="success" label={row.status} />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton color="primary" onClick={() => openEdit(row)} aria-label="edit employee">
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => deleteRecord(row.id)} aria-label="delete employee">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );

  return (
    <Box className="section-band">
      <Box className="page-shell">
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={2}>
          <SectionHeader
            eyebrow="Admin Panel"
            title="Student and employee management"
            subtitle="Admin can manage static student and employee records here. Later these same actions can connect to Node.js, MongoDB, file uploads, and real JWT APIs."
          />
          <Button onClick={logout} variant="outlined" sx={{ alignSelf: { sm: 'flex-start' } }}>
            Logout
          </Button>
        </Stack>

        <Grid container spacing={2} sx={{ mb: 4 }}>
          {summary.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.label}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    {item.icon}
                    <Box>
                      <Typography variant="h4">{item.value}</Typography>
                      <Typography color="text.secondary">{item.label}</Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {mode === 'list' && (
          <Card sx={{ mb: 3, background: 'linear-gradient(135deg, #ffffff 0%, #eef4f6 100%)' }}>
            <CardContent>
              <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ md: 'center' }} spacing={2}>
                <Tabs value={tab} onChange={(event, value) => setTab(value)} textColor="primary" indicatorColor="secondary">
                  <Tab value="students" icon={<PeopleAltIcon />} iconPosition="start" label="Students" />
                  <Tab value="employees" icon={<BadgeIcon />} iconPosition="start" label="Employees" />
                </Tabs>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                  <Button variant="contained" startIcon={<AddIcon />} onClick={() => openCreate('students')}>
                    Add Student
                  </Button>
                  <Button variant="outlined" startIcon={<AddIcon />} onClick={() => openCreate('employees')}>
                    Add Employee
                  </Button>
                  <Button variant="text" startIcon={<VisibilityIcon />} onClick={() => setMode('list')}>
                    View Details
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        )}

        {mode === 'form' ? renderForm() : renderTable()}

        <Box sx={{ mt: 4, display: mode === 'form' ? 'none' : 'block' }}>
          <DashboardCharts />
        </Box>
      </Box>
    </Box>
  );
}
