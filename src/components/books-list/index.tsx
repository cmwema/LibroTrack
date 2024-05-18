import { useEffect, useMemo, useState } from "react";
import { Box, Stack, TextField } from "@mui/material";
import DataTable, { TableColumn } from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { useBooksListQuery } from "../../store/api-slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/index";
import { setChanged } from "../../store/crud-slice";

interface DataRow {
  id: number;
  title: string;
  author: string;
  isbn: string;
  published_date: string;
  stock: number;
  genre: string;
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

export const BooksList = () => {
  const navigate = useNavigate();
  const handleRowClicked = (row: DataRow) => {
    navigate(`/books/${row.id}`);
  };
  const { data, isSuccess, isLoading, refetch } = useBooksListQuery({});
  const [filterText, setFilterText] = useState("");
  const changed = useSelector((state: RootState) => state.crud.changed);
  const dispatch = useDispatch();

  useEffect(() => {
    refetch();
    dispatch(setChanged(false));
  }, [changed]);
  const subHeaderComponent = useMemo(() => {
    return (
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{
          width: "100%",
        }}
      >
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

  if (isLoading) {
    return (
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "1rem",
          padding: "4rem",
        }}
      >
        Loading...
      </Box>
    );
  }
  if (isSuccess) {
    const filteredItems = data.filter(
      (item: DataRow) =>
        item.title &&
        (item.title.toLowerCase().includes(filterText.toLowerCase()) ||
          item.author.toLowerCase().includes(filterText.toLowerCase()) ||
          item.genre.toLowerCase().includes(filterText.toLowerCase()))
    );

    return (
      <Box
        sx={{
          padding: "1.5rem",
          backgroundColor: "white",
          borderRadius: "1rem",
        }}
      >
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
  }
};
