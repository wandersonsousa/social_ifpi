import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {
    Container, Link, Paper, Box, Grid, Checkbox, Avatar, Button, TextField, FormControlLabel, CssBaseline,
} from '@mui/material';
import MainAppBar from '../../components/MainAppBar';
import Publication from './components/Publication';

export default function Feed() {
    return (
        <>
            <MainAppBar />
            <Container elevation={0}>
                <Grid container /* justifyContent="center" */ component="main" sx={{ height: '100vh' }}>
                    <Grid item xs={12} sm={8} md={8} component={Paper} elevation={6} square>

                        <Typography sx={{ textAlign: 'center', padding: '1rem' }} variant="h4">
                            Feed
                        </Typography>

                        <Box p={3}>
                            <Publication />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}