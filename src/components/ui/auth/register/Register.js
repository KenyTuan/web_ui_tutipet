"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import { register, useAuthContext } from "@/contexts/AuthContext";
import { registerUser } from "@/api/Auth";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        TuTiPet`s Shop
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function Register() {
  const router = useRouter();
  const [formState, setFormState] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "0",
  });
  const [formErrors, setFormErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formValid, setFormValid] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { dispatch } = useAuthContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const validateForm = () => {
    const errors = {
      fullName: !formState.fullName ? "Full Name is required" : "",
      email: !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formState.email)
        ? "Invalid email address"
        : "",
      password:
        !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,20}$/.test(
          formState.password
        )
          ? "Password must be 8-20 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
          : "",
      confirmPassword:
        formState.password !== formState.confirmPassword
          ? "Passwords do not match"
          : "",
    };
    setFormErrors(errors);
    return !Object.values(errors).some((error) => error);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { fullName, email, password, gender } = formState;
      const response = await registerUser({
        fullName,
        email,
        password,
        gender: gender === "1",
      });
      if (response.success) {
        const { token, user } = response.data;
        dispatch(register(user, token));
        setSuccess("Registration successful!");
        router.push("/");
      } else {
        setFormValid(response.error);
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Link href={"/"}>
            <Avatar
              sx={{ m: 2, width: 150, height: 150 }}
              src="/logo.png"
              alt="Logo Shop"
            />
          </Link>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  error={!!formErrors.fullName}
                  required
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  name="fullName"
                  autoComplete="fullName"
                  onChange={handleChange}
                  value={formState.fullName}
                  helperText={formErrors.fullName}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Gender:</FormLabel>
                  <RadioGroup
                    name="gender"
                    row
                    value={formState.gender}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="0"
                      control={<Radio />}
                      label="Nữ"
                    />
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label="Nam"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  error={!!formErrors.email}
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                  value={formState.email}
                  helperText={formErrors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  onChange={handleChange}
                  error={!!formErrors.password}
                  value={formState.password}
                  helperText={formErrors.password}
                  autoComplete="new-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type={showPassword ? "text" : "password"}
                  onChange={handleChange}
                  error={!!formErrors.confirmPassword}
                  value={formState.confirmPassword}
                  helperText={formErrors.confirmPassword}
                  autoComplete="new-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            {formValid && (
              <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
                <Alert severity="error">{formValid}</Alert>
              </Stack>
            )}

            {success && (
              <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
                <Alert severity="success">{success}</Alert>
              </Stack>
            )}

            {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography
                  onClick={() => {
                    router.back();
                  }}
                  variant="body2"
                  className="hover:cursor-pointer"
                  sx={{
                    color: "#1976d2",
                    textDecoration: "underline",
                  }}
                >
                  Already have an account? Sign in
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
