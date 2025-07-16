import React, { useState, useEffect } from 'react';
import './login.css';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, FormControlLabel, Checkbox } from '@mui/material';

function Login() {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Try to load remembered user
    const rememberedUser = JSON.parse(localStorage.getItem('user'));
    if (rememberedUser) {
      setLoginData({ email: rememberedUser.email, password: rememberedUser.password });
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(sessionStorage.getItem('user')) || JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.email === loginData.email && storedUser.password === loginData.password) {
      alert('Login Successful!');
      if (rememberMe) {
        localStorage.setItem('user', JSON.stringify(storedUser));
      } else {
        sessionStorage.setItem('user', JSON.stringify(storedUser));
        localStorage.removeItem('user'); // clear if not remember
      }
      navigate('/home');
    } else if (!storedUser || loginData.email === '' || loginData.password === '') {
      alert('Please fill all fields');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <TextField
          label="Email"
          name="email"
          value={loginData.email}
          onChange={handleChange}
          inputProps={{ style: { height: 15 } }}
          fullWidth
          sx={{ mb: 1.3 }}
          size="medium"
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleChange}
          inputProps={{ style: { height: 15 } }}
          fullWidth
          sx={{ mb: 1.3 }}
          size="medium"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              color="primary"
            />
          }
          label="Remember me"
          sx={{ mb: 1.3 }}
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Create an Account</Link>
      </p>
    </div>
  );
}

export default Login;
