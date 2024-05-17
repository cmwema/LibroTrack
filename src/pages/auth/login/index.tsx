import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  colors,
} from "@mui/material";
import { AuthLayout } from "../../../layout";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { routesEnum } from "../../../utils/routesEnum";

export const Login = () => {
  const [email, setEmail] = useState("xyz@example.com");
  const [password, setPassword] = useState("12345678");

  const navigate = useNavigate();

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
    navigate(routesEnum.BOOKS);
  };
  return (
    <AuthLayout>
      <Box
        onSubmit={(e) => handleFormSubmit(e)}
        component={"form"}
        sx={{
          border: "2px solid",
          borderColor: colors.blue[500],
          borderRadius: "1rem",
          padding: "1.75rem",
          width: "50%",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        <Typography variant="h6">Welcome Back</Typography>
        <Typography variant="h4">Log In</Typography>
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          helperText="Enter your email address."
          placeholder="xyz@example.com"
          required
          type="email"
        />
        <TextField
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          helperText="Enter a valid password"
          placeholder="***********"
          required
          type="password"
        />
        <Stack
          direction="row"
          sx={{ width: "100%" }}
          justifyContent="space-between"
        >
          <Button variant="contained" type="submit">
            Login
          </Button>
        </Stack>
      </Box>
    </AuthLayout>
  );
};
