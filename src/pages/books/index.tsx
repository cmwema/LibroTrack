import { Button } from "@mui/material";
import { BooksList } from "../../components/books-list";
import { Layout } from "../../layout";
import { useNavigate } from "react-router-dom";
import { routesEnum } from "../../utils/routesEnum";

const ButtonComponent = () => {
  const navigate = useNavigate();
  return (
    <Button variant="outlined" onClick={() => navigate(routesEnum.NEW_BOOK)}>
      New Book
    </Button>
  );
};
export const Books = () => {
  return (
    <Layout title="All Books" ButtonComponent={ButtonComponent}>
      <BooksList />
    </Layout>
  );
};
