import { useMemo, useState } from "react";
import { members } from "../../utils/members";
import { Box, Stack, TextField, Typography } from "@mui/material";
import DataTable, { TableColumn } from "react-data-table-component";

interface DataRow {
  id: number;
  name: string;
  email: string;
  phone: string;
  outstanding_debt: string;
}

const columns: TableColumn<DataRow>[] = [
  {
    name: "Name",
    selector: (row: DataRow) => row.name,
  },
  {
    name: "Email",
    selector: (row: DataRow) => row.email,
  },
  {
    name: "Phone",
    selector: (row: DataRow) => row.phone,
  },
  {
    name: "Published Date",
    selector: (row: DataRow) => row.outstanding_debt,
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
export const MembersList = () => {
  const [filterText, setFilterText] = useState("");

  const filteredItems = members.filter(
    (item) =>
      item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
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
        <Typography variant="h5">All Members</Typography>
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
