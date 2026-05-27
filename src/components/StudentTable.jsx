import { Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { students } from '../data/schoolData.js';

export default function StudentTable({ privateView = false }) {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Student</TableCell>
            <TableCell>Grade</TableCell>
            <TableCell>Attendance</TableCell>
            <TableCell>Marks</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{privateView ? student.name : `Student ${student.id}`}</TableCell>
              <TableCell>{student.grade}</TableCell>
              <TableCell>{student.attendance}%</TableCell>
              <TableCell>{student.marks}%</TableCell>
              <TableCell>
                <Chip size="small" color={student.status === 'Excellent' ? 'success' : 'primary'} label={student.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
