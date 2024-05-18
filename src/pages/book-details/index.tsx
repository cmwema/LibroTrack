import {
  Button,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useBookDetailsQuery,
  useDeleteBookMutation,
} from "../../store/api-slice";
import { Layout } from "../../layout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../../store";
import { setChanged } from "../../store/crud-slice";
import toast from "react-hot-toast";
import { routesEnum } from "../../utils/routesEnum";

export const BookDetails = () => {
  const location = useLocation();
  const id = location.pathname.split("/").pop();
  const navigate = useNavigate();
  const { data, isSuccess, isLoading, refetch } = useBookDetailsQuery({
    book_id: id,
  });
  const [deleteBook] = useDeleteBookMutation();
  const changed = useSelector((state: RootState) => state.crud.changed);
  const dispatch = useDispatch();
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    refetch();
    dispatch(setChanged(false));
  }, [changed]);

  const handleDelete = async () => {
    try {
      setSubmit(false);
      toast.loading("Deleting...");
      await deleteBook({ book_id: data.id });
      navigate(routesEnum.BOOKS);
      toast.dismiss();
      toast.success("Book Deleted successfully.");
      dispatch(setChanged(true));
    } catch (error) {
      toast.dismiss();
      toast.error("Error occured");
    }
  };
  if (isLoading) {
    return (
      <Layout title={"Book Details"}>
        <Stack sx={{ padding: "4rem" }} gap={2}>
          Loading...
        </Stack>
      </Layout>
    );
  }
  if (isSuccess) {
    return (
      <Layout title={"Book Details"}>
        <Stack sx={{ padding: "4rem" }} gap={2}>
          <List>
            <ListItem>
              <ListItemText>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Title
                </Typography>
              </ListItemText>
              <ListItemText>
                <Typography variant="h6">{data.title}</Typography>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Author
                </Typography>
              </ListItemText>
              <ListItemText>
                <Typography variant="h6">{data.author}</Typography>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  ISBN
                </Typography>
              </ListItemText>
              <ListItemText>
                <Typography variant="h6">{data.isbn}</Typography>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Published Date
                </Typography>
              </ListItemText>
              <ListItemText>
                <Typography variant="h6">{data.published_date}</Typography>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  In Stock
                </Typography>
              </ListItemText>
              <ListItemText>
                <Typography variant="h6">{data.stock}</Typography>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Genre
                </Typography>
              </ListItemText>
              <ListItemText>
                <Typography variant="h6">{data.genre}</Typography>
              </ListItemText>
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
              onClick={() => navigate(`/books/edit/${data.id}`)}
            >
              Edit
            </Button>
          </Stack>
        </Stack>
      </Layout>
    );
  }
};
