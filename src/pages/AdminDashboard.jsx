import {
  Box,
  Alert,
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
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardCharts from '../components/DashboardCharts.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { employees as employeeSeed, students as studentSeed } from '../data/schoolData.js';
import { authApi, employeesApi, studentsApi } from '../services/api.js';

const emptyStudent = {
  admissionNo: '',
  name: '',
  grade: '',
  parent: '',
  phone: '',
  attendance: '',
  marks: '',
  status: 'Good'
};

const emptyEmployee = {
  employeeNo: '',
  name: '',
  role: '',
  department: '',
  phone: '',
  experience: '',
  status: 'Active'
};

function mapStudent(record) {
  return {
    id: record._id || record.id,
    admissionNo: record.admissionNo || '',
    name: record.name || '',
    grade: record.grade || '',
    parent: record.parentName || record.parent || '',
    phone: record.parentPhone || record.phone || '',
    attendance: record.attendance ?? '',
    marks: record.marks ?? '',
    status: record.status || 'Active',
    parentEmail: record.parentEmail || '',
    address: record.address || '',
    extraFields: record.extraFields || {}
  };
}

function mapEmployee(record) {
  return {
    id: record._id || record.id,
    employeeNo: record.employeeNo || '',
    name: record.name || '',
    role: record.role || '',
    department: record.department || '',
    phone: record.phone || '',
    email: record.email || '',
    experience: record.experience || '',
    status: record.status || 'Active',
    joiningDate: record.joiningDate || '',
    extraFields: record.extraFields || {}
  };
}

function buildStudentPayload(form) {
  return {
    admissionNo: form.admissionNo || `ADM${Date.now()}`,
    name: form.name,
    grade: form.grade,
    parentName: form.parent,
    parentPhone: form.phone,
    parentEmail: form.parentEmail || undefined,
    address: form.address || undefined,
    attendance: Number(form.attendance || 0),
    marks: Number(form.marks || 0),
    status: form.status || 'Active',
    extraFields: form.extraFields || {}
  };
}

function buildEmployeePayload(form) {
  return {
    employeeNo: form.employeeNo || `EMP${Date.now()}`,
    name: form.name,
    role: form.role,
    department: form.department,
    phone: form.phone,
    email: form.email || undefined,
    experience: form.experience,
    status: form.status || 'Active',
    joiningDate: form.joiningDate || undefined,
    extraFields: form.extraFields || {}
  };
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('students');
  const [mode, setMode] = useState('list');
  const [editingId, setEditingId] = useState(null);
  const [studentRows, setStudentRows] = useState(studentSeed);
  const [employeeRows, setEmployeeRows] = useState(employeeSeed);
  const [studentForm, setStudentForm] = useState(emptyStudent);
  const [employeeForm, setEmployeeForm] = useState(emptyEmployee);
  const [statusMessage, setStatusMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function loadRecords() {
      setIsLoading(true);
      setStatusMessage('');

      try {
        const [studentsResponse, employeesResponse] = await Promise.all([
          studentsApi.list(),
          employeesApi.list()
        ]);
        setStudentRows(studentsResponse.data.map(mapStudent));
        setEmployeeRows(employeesResponse.data.map(mapEmployee));
      } catch (error) {
        setStatusMessage(error.message || 'Unable to load records from the API.');
      } finally {
        setIsLoading(false);
      }
    }

    loadRecords();
  }, []);

  const logout = () => {
    authApi.logout();
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
      { label: 'Records View', value: 'Current', icon: <HistoryIcon color="warning" /> }
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

  const saveRecord = async () => {
    setStatusMessage('');
    setIsSaving(true);

    try {
      if (tab === 'students') {
        const payload = buildStudentPayload(studentForm);
        const response = editingId
          ? await studentsApi.update(editingId, payload)
          : await studentsApi.create(payload);
        const savedStudent = mapStudent(response.data);

        if (editingId) {
          setStudentRows((rows) => rows.map((row) => (row.id === editingId ? savedStudent : row)));
        } else {
          setStudentRows((rows) => [savedStudent, ...rows]);
        }
      } else {
        const payload = buildEmployeePayload(employeeForm);
        const response = editingId
          ? await employeesApi.update(editingId, payload)
          : await employeesApi.create(payload);
        const savedEmployee = mapEmployee(response.data);

        if (editingId) {
          setEmployeeRows((rows) => rows.map((row) => (row.id === editingId ? savedEmployee : row)));
        } else {
          setEmployeeRows((rows) => [savedEmployee, ...rows]);
        }
      }
      goBack();
    } catch (error) {
      setStatusMessage(error.message || `Unable to save ${activeTitle.toLowerCase()}.`);
    } finally {
      setIsSaving(false);
    }
  };

  const deleteRecord = async (id) => {
    setStatusMessage('');

    try {
      if (tab === 'students') {
        await studentsApi.remove(id);
        setStudentRows((rows) => rows.filter((row) => row.id !== id));
        return;
      }
      await employeesApi.remove(id);
      setEmployeeRows((rows) => rows.filter((row) => row.id !== id));
    } catch (error) {
      setStatusMessage(error.message || `Unable to delete ${activeTitle.toLowerCase()}.`);
    }
  };

  const renderForm = () => (
    <Card sx={{ overflow: 'hidden' }}>
      <Box sx={{ bgcolor: '#17212b', color: '#fff', p: 3 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={goBack} sx={{ color: '#fff', mb: 2 }}>
          Back
        </Button>
        <Typography variant="h4">{editingId ? `Edit ${activeTitle}` : `Add ${activeTitle}`}</Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.7)', mt: 0.5 }}>
          Keep school records accurate for classroom follow-up, parent communication, and management review.
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
              <Button variant="contained" size="large" startIcon={<SaveIcon />} onClick={saveRecord} disabled={isSaving}>
                {isSaving ? 'Saving...' : `Save ${activeTitle}`}
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
            subtitle="Manage student profiles, employee details, attendance indicators, marks, and operational records from a clean school administration workspace."
          />
          <Button onClick={logout} variant="outlined" sx={{ alignSelf: { sm: 'flex-start' } }}>
            Logout
          </Button>
        </Stack>

        {statusMessage && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {statusMessage}
          </Alert>
        )}

        {isLoading && (
          <Alert severity="info" sx={{ mb: 3 }}>
            Loading latest records...
          </Alert>
        )}

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
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={1.5}
                  sx={{ width: { xs: '100%', md: 'auto' }, justifyContent: 'flex-end' }}
                >
                  <Button variant="contained" startIcon={<AddIcon />} onClick={() => openCreate('students')}>
                    Add Student
                  </Button>
                  <Button variant="outlined" startIcon={<AddIcon />} onClick={() => openCreate('employees')}>
                    Add Employee
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
