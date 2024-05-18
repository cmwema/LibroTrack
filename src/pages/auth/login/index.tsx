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
import { useLoginMutation } from "../../../store/api-slice";
import toast from "react-hot-toast";

type LoginResult = {
  data: {
    token: string;
  };
};
export const Login = () => {
  const [username, setUsername] = useState("mwema");
  const [password, setPassword] = useState("@Test1234");
  const [submit, setSubmit] = useState(false);
  const [login] = useLoginMutation();

  const navigate = useNavigate();

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setSubmit(true);
      toast.loading("Authenticating...");
      const result = (await login({ username, password })) as LoginResult;
      if (result.data.token) {
        toast.dismiss();
        toast.success("Loggin successful!");
        setSubmit(false);
        localStorage.setItem("token", result.data.token);
        navigate(routesEnum.BOOKS);
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Error occured.");
    }
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
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          helperText="Enter your username"
          required
          type="text"
        />
        <TextField
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          helperText="Enter a valid password"
          required
          type="password"
        />
        <Stack
          direction="row"
          sx={{ width: "100%" }}
          justifyContent="space-between"
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: `${
                submit ? colors.grey[100] : colors.blue[400]
              }`,
            }}
            type="submit"
            disabled={submit}
          >
            Login
          </Button>
        </Stack>
      </Box>
    </AuthLayout>
  );
};
