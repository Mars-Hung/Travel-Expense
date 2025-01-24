import React, { useState } from 'react';
import {
    Button,
    Container,
    Typography,
    Box
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { signInWithGoogle } from '../services/firebase-config';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    const handleGoogleLogin = async () => {
        try {
            const user = await signInWithGoogle();
            if (user) {
                navigate('/groups');  // 登入成功後導向群組頁面
            }
        } catch (err) {
            setError('登入失敗');
        }
    };

    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Typography component="h1" variant="h5">
                    旅遊記帳登入
                </Typography>

                <Button
                    fullWidth
                    variant="contained"
                    startIcon={<GoogleIcon />}
                    onClick={handleGoogleLogin}
                    sx={{ mt: 3 }}
                >
                    Google 登入
                </Button>

                {error && (
                    <Typography color="error" sx={{ mt: 2 }}>
                        {error}
                    </Typography>
                )}
            </Box>
        </Container>
    );
};

export default LoginPage;