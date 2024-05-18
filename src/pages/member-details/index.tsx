import { useLocation, useNavigate } from "react-router-dom";
import {
  useDeleteBookMutation,
  useDeleteMemberMutation,
  useMemberDetailsQuery,
} from "../../store/api-slice";
import { Layout } from "../../layout";
import {
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { setChanged } from "../../store/crud-slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import toast from "react-hot-toast";
import { routesEnum } from "../../utils/routesEnum";

export const MemberDetails = () => {
  const location = useLocation();
  const id = location.pathname.split("/").pop() || "";
  const { data, isSuccess, isLoading, refetch } = useMemberDetailsQuery(id);
  const [deleteMember] = useDeleteMemberMutation();
  const [submit, setSubmit] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changed = useSelector((state: RootState) => state.crud.changed);

  useEffect(() => {
    refetch();
    dispatch(setChanged(false));
  }, [changed]);

  if (isLoading) {
    return (
      <Layout title="Member Details">
        <Stack sx={{ padding: "4rem" }} gap={4}>
          Loading...
        </Stack>
      </Layout>
    );
  }
  if (isSuccess) {
    const handleDelete = async () => {
      try {
        setSubmit(true);
        toast.loading("deleting...");
        await deleteMember(data.id);
        toast.dismiss();
        toast.success("Member deleted Successfully!");
        dispatch(setChanged(true));
        navigate(routesEnum.MEMBERS);
      } catch (error) {
        toast.dismiss();
        toast.success("Member deleted Successfully!");
        dispatch(setChanged(true));
        navigate(routesEnum.MEMBERS);
      }
    };
    return (
      <Layout title="Member Details">
        <Stack sx={{ padding: "4rem" }} gap={2}>
          <List>
            <ListItem>
              <ListItemText>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Full Name
                </Typography>
              </ListItemText>
              <ListItemText>
                {data.first_name} {data.last_name}
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Email
                </Typography>
              </ListItemText>
              <ListItemText>{data.email}</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Debt
                </Typography>
              </ListItemText>
              <ListItemText>{data.debt}</ListItemText>
            </ListItem>
          </List>
          <Stack direction="row" gap={4}>
            <Button
              variant="outlined"
              color="error"
              onClick={handleDelete}
              disabled={submit}
            >
              Delete
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate(`/members/edit/${data.id}`)}
            >
              Edit
            </Button>
          </Stack>
        </Stack>
      </Layout>
    );
  }
};
