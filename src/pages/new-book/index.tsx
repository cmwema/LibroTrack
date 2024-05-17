import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import {
  StyledForm,
  StyledFormWrapper,
} from "../../components/styled-components";

export const NewBook = () => {
  return (
    <StyledFormWrapper>
      <StyledForm gap={4}>
        <Typography variant="h6">New Book</Typography>
        <Stack
          direction="row"
          justifyContent={"space-evenly"}
          alignItems={"center"}
          gap={2}
        >
          <TextField fullWidth label="title" type="text" />
          <TextField fullWidth label="author" type="text" />
        </Stack>
        <Stack
          direction="row"
          justifyContent={"space-evenly"}
          alignItems={"center"}
          gap={2}
        >
          <TextField fullWidth label="ISBN" type="text" />
          <TextField fullWidth label="Stock" type="number" />
        </Stack>
        <Stack
          direction="row"
          justifyContent={"space-evenly"}
          alignItems={"center"}
          gap={2}
        >
          <Box sx={{ display: "flex" }}>
            <Typography>Published Date:</Typography>
            <TextField type="date" hiddenLabel />
          </Box>
          <TextField fullWidth label="Genre" type="text" />
        </Stack>

        <Button variant="contained">Add</Button>
      </StyledForm>
    </StyledFormWrapper>
  );
};
