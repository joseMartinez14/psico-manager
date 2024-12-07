'use client'
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useEffect } from 'react';
import { AppointmentItem } from '@/utils/Types';
import axios from 'axios';

interface Column {
    id: number;
    name: string;
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 1, name: 'clientName', label: 'Cliente', minWidth: 120 },
    { id: 2, name: 'clientEmail', label: 'email', minWidth: 200 },
    { id: 3, name: 'clientPhone', label: 'Telefono', minWidth: 70 },
    { id: 4, name: 'Dia', label: 'Dia', minWidth: 70 },
    { id: 5, name: 'Hora', label: 'Hora', minWidth: 50 },
    { id: 6, name: 'type', label: 'Tipo cita', minWidth: 50 },
    { id: 7, name: 'mode', label: 'Modo cita', minWidth: 50 },
    { id: 8, name: 'Duracion', label: 'Duración', minWidth: 50 },

];



const AppointmentTable = () => {

    const [appointments, setAppointments] = React.useState<AppointmentItem[]>([]);

    const getAppointments = async () => {
        try {
            const url = `api/admin/appointment`
            const res = await axios.get<AppointmentItem[]>(url, { withCredentials: true })
            const data = res.data
            console.log("aquiii")
            console.log(data)
            setAppointments(data);
        } catch (err) {
            console.error(err)
            //redirect('/login')
        }
    }

    useEffect(() => {
        console.log("Tabla use effect")
        getAppointments();
    }, []);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    return (
        <>
            <Paper elevation={5} sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead >
                            <TableRow sx={{ backgroundColor: 'lightblue' }}>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {appointments
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            <TableCell > {row.clientName}</TableCell>
                                            <TableCell > {row.clientEmail}</TableCell>
                                            <TableCell > {row.clientPhone}</TableCell>
                                            <TableCell > {row.date}</TableCell>
                                            <TableCell > {row.hour}</TableCell>
                                            <TableCell > {row.type}</TableCell>
                                            <TableCell > {row.mode}</TableCell>
                                            <TableCell > {`${row.duration} min`}</TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={appointments.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </>
    );
}

export default AppointmentTable;