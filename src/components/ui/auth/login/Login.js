"use client";
import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { Alert, Link, OutlinedInput, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { loginUser, logoutUser, useAuthContext } from "@/contexts/AuthContext";
import Auth from "@/api/Auth";

const defaultTheme = createTheme();

export default function Login() {
  const router = useRouter();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formValid, setFormValid] = useState("");
  const [success, setSuccess] = useState(false);
  const { state, dispatch } = useAuthContext();
  const auth = new Auth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleNavigateToHome = () => {
    router.back();
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const validateForm = () => {
    const errors = {
      email: !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formState.email)
        ? "Invalid email address"
        : "",
      password:
        !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,20}$/.test(
          formState.password
        )
          ? "Password must be 8-20 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
          : "",
    };
    setFormErrors(errors);
    return !Object.values(errors).some((error) => error);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { email, password } = formState;
      const response = await auth.loginUser({
        email,
        password,
      });
      if (response.success) {
        const { token, user } = response.data;
        dispatch(loginUser(user, token));
        setSuccess("Login successful!");
        router.push("/");
      } else {
        setFormValid(response.error);
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Grid
            container
            direction={"column"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Link href={"/"}>
              <Avatar
                sx={{ m: 2, width: 150, height: 150 }}
                src="/logo.png"
                alt="Logo Shop"
              />
            </Link>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                component="h1"
                variant="h3"
                fontWeight={600}
                color={"#555"}
              >
                Login
              </Typography>
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
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  label="Email Address"
                  fullWidth
                  required
                  variant="outlined"
                  size="medium"
                  margin="normal"
                  name="email"
                  sx={{ width: "100%" }}
                  value={formState.email}
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                  onChange={handleChange}
                />
                <FormControl
                  sx={{ width: "100%" }}
                  variant="outlined"
                  margin="normal"
                >
                  <InputLabel
                    error={!!formErrors.password}
                    htmlFor="outlined-adornment-password"
                  >
                    Password
                  </InputLabel>
                  <OutlinedInput
                    name="password"
                    type={showPassword ? "text" : "password"}
                    error={!!formErrors.password}
                    helperText={formErrors.password}
                    onChange={handleChange}
                    value={formState.password}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                <Grid
                  container
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Grid item xs={5}>
                    <Button
                      type="button"
                      fullWidth
                      variant="outlined"
                      sx={{ mt: 3, mb: 2 }}
                      color="primary"
                      onClick={handleNavigateToHome}
                    >
                      <Typography fontSize={18} fontWeight={500}>
                        Quay Lại
                      </Typography>
                    </Button>
                  </Grid>
                  <Grid item xs={5}>
                    <Button
                      className="bg-blue-500"
                      type="button"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      color="primary"
                      onClick={handleSubmit}
                    >
                      <Typography fontSize={18} fontWeight={500}>
                        Đăng Nhập
                      </Typography>
                    </Button>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="/register" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
