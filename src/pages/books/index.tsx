import { Stack } from "@mui/material";
import { BooksList } from "../../components/books-list";

export const Books = () => {
  return (
    <Stack sx={{ padding: "1rem" }}>
      <BooksList />
    </Stack>
  );
};
