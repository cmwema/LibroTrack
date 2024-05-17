import { useMemo, useState } from "react";
import { transactions } from "../../utils/transactions";
import { Box, Stack, TextField, Typography } from "@mui/material";
import DataTable, { TableColumn } from "react-data-table-component";

interface DataRow {
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

const handleRowClicked = (row: DataRow) => {
  console.log("Row clicked:", row);
};

export const TransactionsList = () => {
  const [filterText, setFilterText] = useState("");

  const filteredItems = transactions.filter(
    (item) =>
      item.member &&
      item.member.toLowerCase().includes(filterText.toLowerCase())
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
        <Typography variant="h5">All Transactions</Typography>
        <TextField
          sx={{ height: "max-content" }}
          placeholder="Search"
          variant="outlined"
          label="Search"
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
