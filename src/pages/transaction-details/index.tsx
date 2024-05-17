import { useLocation } from "react-router-dom";
import {
  StyledForm,
  StyledFormWrapper,
} from "../../components/styled-components";
import { transactions } from "../../utils/transactions";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

interface Transaction {
  id: number;
  member: string;
  book: string;
  issue_date: string;
  due_date: string;
  return_date: string;
  fee_charged: string;
}

export const TransactionDetails = () => {
  const location = useLocation();
  const id = location.pathname.split("/").pop();
  const transactionId = id ? parseInt(id, 10) : null;

  const transaction = transactions.filter(
    (item) => item.id === transactionId
  ) as Transaction[];

  const [book, setBook] = useState(transaction[0].book);
  const [member, setMember] = useState(transaction[0].member);
  const [issueDate, setIssueDate] = useState(transaction[0].issue_date);
  const [fee, setFee] = useState(transaction[0].fee_charged);
  const [dueDate, setDueDate] = useState(transaction[0].due_date);
  const [returnDate, setReturnDate] = useState(transaction[0].return_date);

  return (
    <StyledFormWrapper>
      <StyledForm gap={4}>
        <Typography variant="h6">Transaction Details</Typography>
        <TextField label="Book" value={book} />
        <TextField label="Member" value={member} />
        <TextField label="Issue Date" value={issueDate} />
        <TextField label="Fee" value={fee} />
        <TextField label="Due Date" value={dueDate} />
        <TextField label="Return Date" value={returnDate} />
        <Stack direction={"row"} gap={4}>
          <Button variant="contained" color="error">
            Delete
          </Button>
          <Button variant="contained">Edit</Button>
        </Stack>
      </StyledForm>
    </StyledFormWrapper>
  );
};
