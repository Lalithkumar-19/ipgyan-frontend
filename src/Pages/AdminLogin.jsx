import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  Divider,
  Fade
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  AdminPanelSettings,
  ArrowBack
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { api } from '../utils';

// Custom styled components
const LoginContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  marginTop: "40px",
  marginBottom: "40px",
  alignItems: 'center',
  justifyContent: 'center',
  background: 'white',
  padding: theme.spacing(2),
}));

const LoginCard = styled(Paper)(({ theme }) => ({
  width: '100%',
  maxWidth: 440,
  padding: theme.spacing(4),
  borderRadius: 16,
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

const AdminLogo = styled(Box)(({ theme }) => ({
  width: 80,
  height: 80,
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  boxShadow: '0 8px 16px rgba(245, 158, 11, 0.3)',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 12,
    fontFamily: "'Inter', sans-serif",
    '&:hover fieldset': {
      borderColor: '#f59e0b',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#f59e0b',
    },
  },
}));

const LoginButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  color: 'white',
  padding: theme.spacing(1.5),
  borderRadius: 12,
  fontWeight: 600,
  fontSize: '1rem',
  textTransform: 'none',
  boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
  '&:hover': {
    boxShadow: '0 6px 16px rgba(245, 158, 11, 0.4)',
    background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
  },
  '&:disabled': {
    background: 'linear-gradient(135deg, #fcd34d 0%, #f59e0b 100%)',
  },
}));

const AdminLogin = () => {


 
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      setLoading(true);
      const res = await api.post("/admin-login", { email, password });
      if(res.status===200){
        localStorage.setItem('admin_token', res.data.token);
        localStorage.setItem('admin_user', res.data.user);
        setTimeout(()=>{
        navigate('/admin');
        },3000);
      }else{
        setError(res.data.message);
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <LoginContainer>
      <Fade in={true} timeout={800}>
        <LoginCard elevation={8}>
          <LogoContainer>
            <AdminLogo>
              <AdminPanelSettings sx={{ fontSize: 40 }} />
            </AdminLogo>
          </LogoContainer>

          <Typography
            variant="h3"
            component="h1"
            align="center"
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Admin Portal
          </Typography>

          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ mb: 4, fontFamily: "'Inter', sans-serif" }}
          >
            Sign in to access the management dashboard
          </Typography>

          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                borderRadius: 3,
                fontFamily: "'Inter', sans-serif"
              }}
            >
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <StyledTextField
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
            />

            <StyledTextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* <Box sx={{ textAlign: 'right', mb: 3 }}>
              <Button
                size="small"
                sx={{
                  color: '#f59e0b',
                  fontWeight: 500,
                  fontFamily: "'Inter', sans-serif"
                }}
              >
                Forgot Password?
              </Button>
            </Box> */}

            <LoginButton
              fullWidth
              type="submit"
              disabled={loading}
              size="large"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </LoginButton>

            <Divider sx={{ my: 3 }}>

            </Divider>

            {/* <DemoHint>
              <Typography
                variant="body2"
                align="center"
                sx={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  color: '#4f46e5',
                  mb: 1
                }}
              >
                Demo Credentials
              </Typography>
              <Typography
                variant="body2"
                align="center"
                sx={{
                  fontFamily: "'Inter', sans-serif",
                  color: '#6b7280'
                }}
              >
                admin@ipgyan.com / admin123
              </Typography>
              <Box sx={{ textAlign: 'center', mt: 1 }}>
                <Button
                  size="small"
                  onClick={handleDemoLogin}
                  sx={{
                    color: '#4f46e5',
                    fontWeight: 500,
                    fontFamily: "'Inter', sans-serif"
                  }}
                >
                  Auto-fill Demo Credentials
                </Button>
              </Box>
            </DemoHint> */}

            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Button
                startIcon={<ArrowBack />}
                onClick={() => navigate('/')}
                sx={{
                  color: 'text.secondary',
                  fontFamily: "'Inter', sans-serif"
                }}
              >
                Back to Home
              </Button>
            </Box>
          </form>
        </LoginCard>
      </Fade>

      {/* Add Inter font to the head */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        body {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
    </LoginContainer>
  );
};

export default AdminLogin;