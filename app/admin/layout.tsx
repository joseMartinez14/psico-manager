
import { AppBar, Box, Button, Toolbar, Typography, makeStyles } from '@mui/material';
import ButtomLink from '../components/ButtomLink';

export default function layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: "black", mb: 2, height: 60 }}>
                <Toolbar >
                    <Typography variant="h5" component="div" sx={{ pl: '15px', flexGrow: 1 }}>
                        Administrador de citas
                    </Typography>
                    <Box>
                        <ButtomLink to='/admin' text='Proximas citas' />
                        <ButtomLink to='/admin/calendario' text='Calendario' />
                        <ButtomLink to='/admin/disponibilidad' text='Agregar disponibilidad' />
                        <ButtomLink to='/login' text='Login' />
                    </Box>
                </Toolbar>
            </AppBar>
            {children}
        </>
    )
}

