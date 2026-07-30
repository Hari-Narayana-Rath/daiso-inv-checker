
import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Link, Box } from '@mui/material';

const LoginRegister = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (isLogin) {
      const user = { name: 'Test User', phone };
      onLogin(user);
    } else {
      const newUser = { name, phone };
      onLogin(newUser);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '32px', maxWidth: '400px', margin: 'auto', borderRadius: '12px' }}>
      <Typography variant="h4" style={{ marginBottom: '24px', color: '#e6007e', fontWeight: 'bold' }}>
        {isLogin ? 'Welcome Back!' : 'Create an Account'}
      </Typography>
      {!isLogin && (
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          variant="filled"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}
      <TextField
        label="Phone Number"
        fullWidth
        margin="normal"
        variant="filled"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        variant="filled"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
        style={{ marginTop: '24px', padding: '12px', fontSize: '16px', fontWeight: 'bold' }}
      >
        {isLogin ? 'Login' : 'Register'}
      </Button>
      <Box style={{ marginTop: '24px', textAlign: 'center' }}>
        <Typography>
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <Link component="button" onClick={() => setIsLogin(!isLogin)} style={{ fontWeight: 'bold' }}>
            {isLogin ? 'Register' : 'Login'}
          </Link>
        </Typography>
        <Button
          variant="text"
          style={{ marginTop: '20px', textTransform: 'none', color: '#757575' }}
        >
          Staff Login
        </Button>
      </Box>
    </Paper>
  );
};

export default LoginRegister;