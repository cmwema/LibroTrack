import { useEffect, useMemo, useState } from "react";
import { Box, TextField } from "@mui/material";
import DataTable, { TableColumn } from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { useTransactionsListQuery } from "../../store/api-slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setChanged } from "../../store/crud-slice";

interface DataRow {
  id: string;
  member_name: string;
  book_title: string;
  issue_date: string;
  due_date: string;
  return_date: string;
  fee: string;
  paid: boolean;
  book: string;
  member: string;
}

const columns: TableColumn<DataRow>[] = [
  {
    name: "Book",
    selector: (row: DataRow) => row.book_title,
  },
  {
    name: "Member",
    selector: (row: DataRow) => row.member_name,
  },
  {
    name: "Issue Date",
    selector: (row: DataRow) => row.issue_date,
  },
  {
    name: "Due Date",
    selector: (row: DataRow) => row.due_date,
  },
  {
    name: "Return Date",
    selector: (row: DataRow) => row.return_date,
  },
  {
    name: "Fee",
    selector: (row: DataRow) => row.fee,
  },
  {
    name: "Paid",
    selector: (row: DataRow) => `${row.paid ? "Yes" : "No"}`,
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

export const TransactionsList = () => {
  const navigate = useNavigate();
  const handleRowClicked = (row: DataRow) => {
    navigate(`/transactions/${row.id}`);
  };
  const [filterText, setFilterText] = useState("");
  const { data, isSuccess, isLoading, refetch } = useTransactionsListQuery({});
  const changed = useSelector((state: RootState) => state.crud.changed);
  const dispatch = useDispatch();

  useEffect(() => {
    refetch();
    dispatch(setChanged(false));
  }, [changed]);
  const subHeaderComponent = useMemo(() => {
    return (
      <TextField
        sx={{ height: "max-content" }}
        placeholder="Search"
        variant="outlined"
        label="Search"
        onChange={(e) => setFilterText(e.target.value)}
        value={filterText}
      />
    );
  }, [filterText]);
  if (isLoading) {
    return (
      <Box
        sx={{ padding: "4rem", backgroundColor: "white", borderRadius: "1rem" }}
      >
        Loading...
      </Box>
    );
  }
  if (isSuccess) {
    const filteredItems = data.filter(
      (item: DataRow) =>
        item.member_name.toLowerCase().includes(filterText.toLowerCase()) ||
        item.book_title.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
      <Box
        sx={{ padding: "10px", backgroundColor: "white", borderRadius: "1rem" }}
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
