import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import {
  StyledForm,
  StyledFormWrapper,
} from "../../components/styled-components";
import { useLocation } from "react-router-dom";
import { books } from "../../utils/books";
import { useState } from "react";

interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  published_date: string;
  stock: number;
  genre: string;
  image: string;
}

export const BookDetails = () => {
  const location = useLocation();
  const id = location.pathname.split("/").pop();
  const bookId = id ? parseInt(id, 10) : null;

  const book = books.filter((book) => book.id === bookId) as Book[];
  const [title, setTitle] = useState(book[0].title);
  const [author, setAuthor] = useState(book[0].author);
  const [isbn, setIsbn] = useState(book[0].isbn);
  const [published_date, setPublished_date] = useState(book[0].published_date);
  const [stock, setStock] = useState(`${book[0].stock}`);
  const [genre, setGenre] = useState(book[0].genre);

  return (
    <StyledFormWrapper>
      <StyledForm gap={4}>
        <Typography variant="h5">Book Details</Typography>

        <TextField
          fullWidth
          label="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          fullWidth
          label="author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <TextField
          fullWidth
          label="ISBN"
          type="text"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
        />
        <TextField
          fullWidth
          label="Stock"
          type="text"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        <TextField
          type="text"
          value={published_date}
          onChange={(e) => setPublished_date(e.target.value)}
          label="Published Date"
        />
        <TextField
          fullWidth
          label="Genre"
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <Stack
          direction="row"
          justifyContent={"space-between"}
          sx={{ width: "40%" }}
        >
          <Button variant="contained" color="error">
            Delete
          </Button>
          <Button variant="contained">Edit</Button>
        </Stack>
      </StyledForm>
    </StyledFormWrapper>
  );
};
