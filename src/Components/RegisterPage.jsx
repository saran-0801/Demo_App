import React, { use, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid, Card, CardContent, TextField,
  FormLabel, RadioGroup, FormControlLabel, Radio,
  Button, Typography, IconButton, InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import './Register.css';

function Register() {
  const today = new Date();
  const _dob = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
  const maxDate = _dob.toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', password: '', confirmPassword: '', dob: '', gender: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newErrors = { ...errors };
    if (name === 'confirmPassword' && formData.password && value !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    } else {
      newErrors.confirmPassword = '';
    }
    setFormData({ ...formData, [name]: value });
    setErrors(newErrors);
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = {};
    const nameRegex = /^[A-Za-z ]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!nameRegex.test(formData.name)) {
      newErrors.name = 'Name must contain only letters';
      valid = false;
    }
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
      valid = false;
    }
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Phone must be exactly 10 digits';
      valid = false;
    }
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      valid = false;
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {

    e.preventDefault();
    if (!validateForm()) return;
    sessionStorage.setItem('user', JSON.stringify({ ...formData }));
    alert('Registered successfully!');
    navigate('/');
  };

  return (
    <Grid container className="register-container" style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Grid item xs={12} md={6} className="register-form-side">
        <Card className="register-card">
          <CardContent>
            <Typography variant="h4" fontFamily={'serif'} align="center" gutterBottom>
              Register Form
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 1.3 }}
                size="medium"
                inputProps={{ style: { height: 15 } }}
                error={!!errors.name}
                helperText={errors.name}
              />
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 1.3 }}
                size="medium"
                inputProps={{ style: { height: 15 } }}
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={(e) => (/^\d{0,10}$/.test(e.target.value) ? handleChange(e) : null)}
                inputProps={{ maxLength: 10, style: { height: 15 } }}
                fullWidth
                sx={{ mb: 1.3 }}
                size="medium"
                error={!!errors.phone}
                helperText={errors.phone}
              />

              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 1.3 }}
                size="medium"
                inputProps={{ style: { height: 15 } }}
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              <TextField
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 1.3 }}
                size="medium"
                inputProps={{ style: { height: 15 } }}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              <TextField
                label="Date of Birth"
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 1.3 }}
                size="medium"
                InputLabelProps={{ shrink: true }}
                inputProps={{ max: maxDate, style: { height: 15 } }}
              />

              <FormLabel component="legend" style={{ marginTop: '15px' }}>Gender</FormLabel>
              <RadioGroup
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                style={{ flexDirection: 'row', marginBottom: '10px' }}
              >
                <FormControlLabel value="Male" control={<Radio />} label="Male" />
                <FormControlLabel value="Female" control={<Radio />} label="Female" />
                <FormControlLabel value="Other" control={<Radio />} label="Other" />
              </RadioGroup>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                style={{ backgroundColor: '#4aa15eff', marginTop: '10px' ,  }}
              >
                Register
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Register;
