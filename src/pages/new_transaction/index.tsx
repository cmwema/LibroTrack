import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  StyledForm,
  StyledFormWrapper,
} from "../../components/styled-components";

export const NewTransaction = () => {
  return (
    <StyledFormWrapper>
      <StyledForm gap={4}>
        <Typography variant="h5">New Transaction</Typography>
        <Stack sx={{ padding: "1rem" }} gap={2}>
          <Stack
            direction="row"
            sx={{
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextField select label="Book" sx={{ width: "45%" }}>
              <MenuItem>Test</MenuItem>
            </TextField>
            <TextField select label="Member" sx={{ width: "45%" }}>
              <MenuItem>Test</MenuItem>
            </TextField>
          </Stack>
          <Stack
            direction="row"
            sx={{
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">Issue Date:</Typography>
            <TextField type="date" sx={{ width: "50%" }} />
          </Stack>
          <Stack
            direction="row"
            sx={{
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">Due Date:</Typography>
            <TextField type="date" sx={{ width: "50%" }} />
          </Stack>
          <Stack
            direction="row"
            sx={{
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">Return Date:</Typography>
            <TextField type="date" sx={{ width: "50%" }} />
          </Stack>

          <TextField label="Fee" />
          <Button variant="contained">Add</Button>
        </Stack>
      </StyledForm>
    </StyledFormWrapper>
  );
};
