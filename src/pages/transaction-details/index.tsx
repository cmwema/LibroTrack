import { useLocation, useNavigate } from "react-router-dom";

import {
  Button,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import {
  useDeleteTransactionMutation,
  useTransactionDetailsQuery,
} from "../../store/api-slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEffect } from "react";
import { setChanged } from "../../store/crud-slice";
import { Layout } from "../../layout";
import toast from "react-hot-toast";
import { routesEnum } from "../../utils/routesEnum";

export const TransactionDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.pathname.split("/").pop() || "";
  const { data, isSuccess, isLoading, refetch } =
    useTransactionDetailsQuery(id);
  const changed = useSelector((state: RootState) => state.crud.changed);
  const dispatch = useDispatch();
  const [deleteTransaction] = useDeleteTransactionMutation();

  useEffect(() => {
    refetch();
    dispatch(setChanged(false));
  }, [changed]);

  const handleDelete = async () => {
    try {
      toast.loading("Deleting..");
      await deleteTransaction(data.id);
      toast.dismiss();
      toast.success("Transaction Deleted Successfully.");
      dispatch(setChanged(true));
      navigate(routesEnum.TRANSACTIONS);
    } catch (error) {
      toast.dismiss();
      toast.error("Error Occurred.");
    }
  };
  if (isLoading) {
    <Layout title="Transaction Details">
      <Stack sx={{ padding: "4rem" }} gap={4}>
        Loading...
      </Stack>
    </Layout>;
  }
  if (isSuccess) {
    return (
      <Layout title="Transaction Details">
        <Stack sx={{ padding: "1rem" }} gap={4}>
          <List>
            <ListItem>
              <ListItemText>
                <Typography sx={{ fontWeight: "bold" }} variant="h6">
                  Book Title
                </Typography>
              </ListItemText>
              <ListItemText>{data.book_title}</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Typography sx={{ fontWeight: "bold" }} variant="h6">
                  Member Name
                </Typography>
              </ListItemText>
              <ListItemText>{data.member_name}</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Typography sx={{ fontWeight: "bold" }} variant="h6">
                  Issue Date
                </Typography>
              </ListItemText>
              <ListItemText>{data.issue_date}</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Typography sx={{ fontWeight: "bold" }} variant="h6">
                  Due Date
                </Typography>
              </ListItemText>
              <ListItemText>{data.due_date}</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Typography sx={{ fontWeight: "bold" }} variant="h6">
                  Return Date
                </Typography>
              </ListItemText>
              <ListItemText>{data.return_date}</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Typography sx={{ fontWeight: "bold" }} variant="h6">
                  Paid?
                </Typography>
              </ListItemText>
              <ListItemText>{data.paid ? "Yes" : "No"}</ListItemText>
            </ListItem>
          </List>
          <Stack direction={"row"} gap={4}>
            <Button variant="outlined" color="error" onClick={handleDelete}>
              Delete
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate(`/transactions/edit/${data.id}`)}
            >
              Edit
            </Button>
          </Stack>
        </Stack>
      </Layout>
    );
  }
};
