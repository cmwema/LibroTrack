import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import {
  StyledForm,
  StyledFormWrapper,
} from "../../components/styled-components";

export const NewMember = () => {
  const [name, setName] = useState("");
  const [outstanding_debt, setOutstanding_debt] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <StyledFormWrapper>
      <StyledForm gap={4}>
        <Typography variant="h6">New Member</Typography>
        <TextField
          value={name}
          label="Name"
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
          fullWidth
          type="text"
        />
        <TextField
          value={outstanding_debt}
          label="Out standing Debt"
          onChange={(e) => setOutstanding_debt(e.target.value)}
          variant="outlined"
          fullWidth
          type="text"
        />
        <TextField
          value={phone}
          label="Phone"
          onChange={(e) => setPhone(e.target.value)}
          variant="outlined"
          fullWidth
          type="text"
        />
        <Stack
          direction={"row"}
          sx={{ width: "50%", justifyContent: "space-between" }}
        >
          <Button variant="contained">Add</Button>
        </Stack>
      </StyledForm>
    </StyledFormWrapper>
  );
};
