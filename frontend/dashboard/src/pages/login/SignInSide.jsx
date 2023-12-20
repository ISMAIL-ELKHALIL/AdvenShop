import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignInSide() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const location = useLocation();

  console.log("location", location);

  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/v1/users";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
      console.log(error);
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
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                m: 1,
                width: 260,
              }}
            >
              <img
                src="logo.png"
                style={{ width: "100%", height: "auto" }}
                alt=""
              />
            </Box>
            <Typography variant="h5 " fontSize={20} letterSpacing={1.5}>
              Dashboard Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={submitHandler}
              sx={{ mt: 1 }}
            >
              <TextField
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "0px",
                    "&.Mui-focused fieldset": {
                      borderColor: "#e75455",
                    },
                    "&.Mui-focused": {
                      color: "black",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#e75455",
                  },
                }}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <TextField
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "0px",
                    "&.Mui-focused fieldset": {
                      borderColor: "#e75455",
                    },
                    "&.Mui-focused": {
                      color: "black",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#e75455",
                  },
                }}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="error" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                
                sx={{ 
                  mt: 3, 
                  height: 50,
                  mb: 2, 
                  backgroundColor: "black",
                  '&:hover': {
                    backgroundColor: '#e75455', 
                  },
                }}
                disabled={isLoading}
              >
                Sign In
              </Button>
              {isLoading && <CircularProgress size={24} />}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
