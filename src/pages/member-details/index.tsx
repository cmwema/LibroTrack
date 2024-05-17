import { Button, Stack, TextField, Typography, colors } from "@mui/material";
import { useLocation } from "react-router-dom";
import { members } from "../../utils/members";
import { useState } from "react";
import {
  StyledForm,
  StyledFormWrapper,
} from "../../components/styled-components";

interface Member {
  id: number;
  image: string;
  name: string;
  outstanding_debt: string;
  phone: string;
}
export const MemberDetails = () => {
  const location = useLocation();
  const id = location.pathname.split("/").pop();
  const memberId = id ? parseInt(id, 10) : null;

  const member = members.filter((member) => member.id === memberId) as Member[];

  const [name, setName] = useState(member[0].name);
  const [outstanding_debt, setOutstanding_debt] = useState(
    member[0].outstanding_debt
  );
  const [phone, setPhone] = useState(member[0].phone);

  return (
    <StyledFormWrapper>
      <StyledForm gap={4}>
        <Typography variant="h6">Member Details</Typography>
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
          <Button variant="outlined" color="error">
            Delete
          </Button>
          <Button variant="contained">Edit</Button>
        </Stack>
      </StyledForm>
    </StyledFormWrapper>
  );
};
