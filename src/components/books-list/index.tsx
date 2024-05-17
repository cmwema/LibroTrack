import { useMemo, useState } from "react";
import { books } from "../../utils/books";
import { Box, Stack, TextField, Typography } from "@mui/material";
import DataTable, { TableColumn } from "react-data-table-component";

interface DataRow {
  id: number;
  title: string;
  author: string;
  isbn: string;
  published_date: string;
  stock: number;
  genre: string;
  image: string;
}

const columns: TableColumn<DataRow>[] = [
  {
    name: "Title",
    selector: (row: DataRow) => row.title,
  },
  {
    name: "Author",
    selector: (row: DataRow) => row.author,
  },
  {
    name: "ISBN",
    selector: (row: DataRow) => row.isbn,
  },
  {
    name: "Published Date",
    selector: (row: DataRow) => row.published_date,
  },
  {
    name: "Stock",
    selector: (row: DataRow) => row.stock,
  },
  {
    name: "Genre",
    selector: (row: DataRow) => row.genre,
  },
];

const customStyles = {
  rows: {
    style: {
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#f5f5f5",
      },
    },
  },
};

const handleRowClicked = (row: DataRow) => {
  console.log("Row clicked:", row);
};
export const BooksList = () => {
  const [filterText, setFilterText] = useState("");

  const filteredItems = books.filter(
    (item) =>
      item.title && item.title.toLowerCase().includes(filterText.toLowerCase())
  );
  const subHeaderComponent = useMemo(() => {
    return (
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{
          width: "100%",
          padding: "1rem",
        }}
      >
        <Typography variant="h5">All Books</Typography>
        <TextField
          sx={{ height: "max-content" }}
          placeholder="Search Book"
          variant="outlined"
          label="Search Book"
          onChange={(e) => setFilterText(e.target.value)}
          value={filterText}
        />
      </Stack>
    );
  }, [filterText]);

  return (
    <Box sx={{ padding: "1.5rem", backgroundColor: "white" }}>
      <DataTable
        columns={columns}
        data={filteredItems}
        pagination
        fixedHeader
        subHeader
        onRowClicked={handleRowClicked}
        customStyles={customStyles}
        subHeaderComponent={subHeaderComponent}
      />
    </Box>
  );
};
