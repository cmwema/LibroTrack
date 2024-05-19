import { Button, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { StyledForm } from "../../components/styled-components";
import {
  EditTransaction,
  Member,
  useBooksListQuery,
  useEditTransactionMutation,
  useMembersListQuery,
  useNewTransactionMutation,
} from "../../store/api-slice";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setChanged } from "../../store/crud-slice";
import { routesEnum } from "../../utils/routesEnum";

type TransactionFormProps = {
  edit: boolean;
  transaction?: EditTransaction;
};
type Book = {
  id: string;
  title: string;
  author: string;
  isbn: string;
  published_date: string;
  stock: number;
  genre: string;
};

export const TransactionForm = ({
  edit,
  transaction,
}: TransactionFormProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: books, isSuccess: booksSuccess } = useBooksListQuery({});
  const { data: members, isSuccess: membersSuccess } = useMembersListQuery({});
  const [newTransaction] = useNewTransactionMutation();
  const [editTransaction] = useEditTransactionMutation();
  const [member, setMember] = useState(`${edit ? transaction?.member : ""}`);
  const [book, setBook] = useState(`${edit ? transaction?.book : ""}`);
  const [issue, setIssue] = useState(`${edit ? transaction?.issue_date : ""}`);
  const [due, setDue] = useState(`${edit ? transaction?.due_date : ""}`);
  const [returnDate, setReturnDate] = useState(
    `${edit ? transaction?.return_date : ""}`
  );
  const [fee, setFee] = useState(`${edit ? transaction?.fee : ""}`);
  const [paid, setPaid] = useState(`${edit ? transaction?.paid : false}`);
  const [submit, setSubmit] = useState(false);

  const handleSubmit = async () => {
    try {
      let result;
      if (!edit) {
        toast.loading("Adding...");
        setSubmit(true);
        result = await newTransaction({
          member,
          book,
          issue_date: issue,
          due_date: due,
          return_date: returnDate,
          fee,
          paid: paid ? true : false,
        });
      } else if (edit && transaction) {
        toast.loading("Updating...");
        setSubmit(true);
        result = await editTransaction({
          id: transaction.id,
          member,
          book,
          issue_date: issue,
          due_date: due,
          return_date: returnDate,
          fee,
          paid: paid ? true : false,
        });
      }
      if (result?.data) {
        toast.dismiss();
        toast.success("Operation Completed Successfully!");
        dispatch(setChanged(true));
        navigate(routesEnum.TRANSACTIONS);
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Error occured");
    }
  };

  if (membersSuccess && booksSuccess) {
    return (
      <StyledForm gap={4}>
        <Typography variant="h5">
          {edit ? "Edit Transaction" : "New Transaction"}
        </Typography>
        <Stack sx={{ padding: "1rem" }} gap={2}>
          <Stack
            direction="row"
            sx={{
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextField
              select
              label="Book"
              sx={{ width: "45%" }}
              value={book}
              onChange={(e) => setBook(e.target.value)}
            >
              {books.map((item: Book) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.title}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Member Email"
              sx={{ width: "45%" }}
              value={member}
              onChange={(e) => setMember(e.target.value)}
            >
              {members.map((item: Member) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.email}
                </MenuItem>
              ))}
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
            <TextField
              type="date"
              sx={{ width: "50%" }}
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
            />
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
            <TextField
              type="date"
              sx={{ width: "50%" }}
              value={due}
              onChange={(e) => setDue(e.target.value)}
            />
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
            <TextField
              type="date"
              sx={{ width: "50%" }}
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </Stack>

          <TextField
            label="Fee"
            value={fee}
            onChange={(e) => setFee(e.target.value)}
          />
          <Stack direction={"row"} gap={4}>
            <Typography>Paid?</Typography>
            <input
              type="checkbox"
              value={paid}
              onChange={(e) => setPaid(e.target.value)}
              disabled={!edit}
            />
          </Stack>
          <Button variant="contained" onClick={handleSubmit} disabled={submit}>
            {edit ? "Update" : "Add"}
          </Button>
        </Stack>
      </StyledForm>
    );
  }
};
