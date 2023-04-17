import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { registerUser } from "../api/user.api";
import { useNavigate } from "react-router-dom";
import { useContextUser } from "../context/UserContext";

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
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();

  const { user, setUser } = useContextUser();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = new FormData(event.currentTarget);
      /* console.log({
        email: data.get("email"),
        password: data.get("password"),
      }); */
   
      const newUser = {
        email: data.get("email"),
        password: data.get("password"),
      };
      const response = await registerUser(newUser);

      console.log(response.status);
      console.log(response.data.token);
      setUser({
        email: data.get("email"),
        password: data.get("password"),
        token:response.data.token
     })
     //console.log("imprimiendo obj user: "+user)
     navigate("/create")
    } catch (error) {
      console.log("email already in use");
      alert("email already in use");
    }
  };

  return (
    <ThemeProvider theme={theme}>
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up - registro
            </Button>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account ? Sign Up"}
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
