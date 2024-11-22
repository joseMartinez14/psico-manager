'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
interface LoginFormValues {
    email: string;
    password: string;
}

export default function LoginPage() {
    const [formData, setFormData] = React.useState<LoginFormValues>({
        email: '',
        password: '',
    });

    const Swal = require('sweetalert2')
    const router = useRouter()
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formData);


        axios.post('/api/admin/login', formData, { withCredentials: true })
            .then((res) => {
                console.log(res)
                router.push("admin")

            })
            .catch((error) => {
                console.error(error)
                Swal.fire({
                    title: "Error",
                    text: "Error en las credenciales",
                    icon: "error"
                });
            })

    };

    return (
        <>
            <Box display={'flex'} flexDirection={'column'} width={'100%'} pt={8}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    pb: 4
                }}>
                    <Typography
                        variant='h1'
                        sx={{
                            fontSize: 36,
                            textAlign: 'center',
                            verticalAlign: 'center',
                            fontStyle: "cursive",
                            margin: 0,
                            padding: 0,
                            fontWeight: 300,
                        }}>
                        {'Login'}
                    </Typography>
                </Box>

            </Box>

            <Container maxWidth="sm">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <form onSubmit={handleSubmit}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                    </form>
                </Box>
            </Container>
        </>
    );
}