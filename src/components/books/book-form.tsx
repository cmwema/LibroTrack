import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { StyledForm } from "../../components/styled-components";
import { useEditBookMutation, useNewBookMutation } from "../../store/api-slice";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setChanged } from "../../store/crud-slice";

interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  stock: number;
  published_date: string;
  genre: string;
}

interface BookFormProps {
  book?: Book;
  isEdit: boolean;
}

export const BookForm = ({ book, isEdit = false }: BookFormProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newBook] = useNewBookMutation();
  const [editBook] = useEditBookMutation();
  const [title, setTitle] = useState(`${book ? book.title : ""}`);
  const [author, setAuthor] = useState(`${book ? book.author : ""}`);
  const [isbn, setIsbn] = useState(`${book ? book.isbn : ""}`);
  const [stock, setStock] = useState(`${book ? book.stock : ""}`);
  const [date, setDate] = useState(`${book ? book.published_date : ""}`);
  const [genre, setGenre] = useState(`${book ? book.genre : ""}`);
  const [submit, setSubmit] = useState(false);

  const handleSubmit = async () => {
    try {
      const body = {
        title,
        author,
        isbn,
        stock: parseInt(stock),
        published_date: date,
        genre,
      };
      setSubmit(true);
      toast.loading("Sending...");
      let result;
      if (isEdit && book) {
        result = await editBook({ id: book.id, book: body });
        dispatch(setChanged(true));
      } else {
        result = await newBook(body);
      }
      if (result.data) {
        toast.dismiss();
        toast.success("Operation completed!!");
        navigate(`/books/${result.data.id}`);
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Error Occured!");
    }
  };

  return (
    <StyledForm gap={4}>
      <Typography variant="h6">New Book</Typography>
      <Stack
        direction="row"
        justifyContent={"space-evenly"}
        alignItems={"center"}
        gap={2}
      >
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
      </Stack>
      <Stack
        direction="row"
        justifyContent={"space-evenly"}
        alignItems={"center"}
        gap={2}
      >
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
      </Stack>
      <Stack
        direction="row"
        justifyContent={"space-evenly"}
        alignItems={"center"}
        gap={2}
      >
        <Box sx={{ display: "flex" }}>
          <Typography>Published Date:</Typography>
          <TextField
            type="date"
            hiddenLabel
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Box>
        <TextField
          fullWidth
          label="Genre"
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
      </Stack>

      <Button variant="contained" disabled={submit} onClick={handleSubmit}>
        Add
      </Button>
    </StyledForm>
  );
};
