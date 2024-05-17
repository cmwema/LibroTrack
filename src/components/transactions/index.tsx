import { useMemo, useState } from "react";
import { transactions } from "../../utils/transactions";
import { Box, TextField } from "@mui/material";
import DataTable, { TableColumn } from "react-data-table-component";
import { useNavigate } from "react-router-dom";

interface DataRow {
  id: number;
  book: string;
  member: string;
  issue_date: string;
  due_date: string;
  return_date: string;
  fee_charged: string;
}

const columns: TableColumn<DataRow>[] = [
  {
    name: "Book",
    selector: (row: DataRow) => row.book,
  },
  {
    name: "Member",
    selector: (row: DataRow) => row.member,
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
    selector: (row: DataRow) => row.fee_charged,
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

  const filteredItems = transactions.filter(
    (item) =>
      item.member &&
      item.member.toLowerCase().includes(filterText.toLowerCase())
  );

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
};
