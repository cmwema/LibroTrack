import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { StyledForm } from "../../components/styled-components";
import {
  Member,
  useEditMemberMutation,
  useNewMemberMutation,
} from "../../store/api-slice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setChanged } from "../../store/crud-slice";
import { useNavigate } from "react-router-dom";

interface MemberProps {
  edit: boolean;
  member?: Member;
}

export const MemberForm = ({ edit, member }: MemberProps) => {
  const [firstName, setFirstName] = useState(member ? member.first_name : "");
  const [lastName, setLastName] = useState(member ? member.last_name : "");
  const [email, setEmail] = useState(member ? member.email : "");
  const [debt, setDebt] = useState(member ? member.debt.toString() : "");
  const [submit, setSubmit] = useState(false);
  const [newMember] = useNewMemberMutation();
  const [editMember] = useEditMemberMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      setSubmit(true);
      toast.loading("Submitting...");
      let result;
      if (!edit) {
        result = await newMember({
          first_name: firstName,
          last_name: lastName,
          email,
          debt: parseFloat(debt),
        });

        dispatch(setChanged(true));
      } else if (edit && member) {
        result = await editMember({
          id: member.id,
          first_name: firstName,
          last_name: lastName,
          email,
          debt: parseFloat(debt),
        });
      }
      toast.dismiss();
      toast.success("Operation successful.");
      dispatch(setChanged(true));
      navigate(`/members/${result?.data.id}`);
    } catch (error) {
      toast.dismiss();
      toast.error("Error occurred.");
    } finally {
      setSubmit(false);
    }
  };

  return (
    <StyledForm gap={4}>
      <Typography variant="h6">
        {edit ? "Edit Member" : "New Member"}
      </Typography>
      <TextField
        value={firstName}
        label="First Name"
        onChange={(e) => setFirstName(e.target.value)}
        variant="outlined"
        fullWidth
        type="text"
      />
      <TextField
        value={lastName}
        label="Last Name"
        onChange={(e) => setLastName(e.target.value)}
        variant="outlined"
        fullWidth
        type="text"
      />
      <TextField
        value={email}
        label="Email"
        onChange={(e) => setEmail(e.target.value)}
        variant="outlined"
        fullWidth
        type="email"
      />
      <TextField
        value={debt}
        label="Outstanding Debt"
        onChange={(e) => setDebt(e.target.value)}
        variant="outlined"
        fullWidth
        type="number"
      />

      <Stack
        direction={"row"}
        sx={{ width: "50%", justifyContent: "space-between" }}
      >
        <Button variant="contained" onClick={handleSubmit} disabled={submit}>
          {edit ? "Update" : "Add"}
        </Button>
      </Stack>
    </StyledForm>
  );
};
