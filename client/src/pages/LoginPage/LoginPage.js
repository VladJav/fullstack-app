import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { useState } from 'react';
import PasswordField from '../../components/PasswordField/PasswordField';
import LoginField from '../../components/LoginField/LoginField';
import { loginUser } from '../../services/usersService';
import { Copyright } from '../../components/Copyright';

const theme = createTheme();
export default function SignIn() {
    const navigate = useNavigate();
    const [signMessage, setSignMessage] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const [emailInput, , passwordInput] = event.currentTarget.elements;
        if (emailInput.attributes['aria-invalid'].value === 'false' && passwordInput.attributes['aria-invalid'].value === 'false') {
            try {
                await loginUser(data.get('email'), data.get('password'));
                navigate('/');
            } catch (e) {
                setSignMessage('Bad password or email');
            }
        }
    };
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                  sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <LoginField
                          margin="normal"
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                          autoFocus
                        />
                        <PasswordField
                          margin="normal"
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          autoComplete="current-password"
                        />
                        <Grid container justifyContent="center">
                            <Grid
                              item
                              sx={{
                                    color: '#f44336',
                                }}
                            >
                                {signMessage}
                            </Grid>
                        </Grid>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="/register" variant="body2">
                                    Don&apos;t have an account? Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}
