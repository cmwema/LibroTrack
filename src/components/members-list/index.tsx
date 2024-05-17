import { useMemo, useState } from "react";
import { members } from "../../utils/members";
import { Box, Stack, TextField, Typography } from "@mui/material";
import DataTable, { TableColumn } from "react-data-table-component";
import { useNavigate } from "react-router-dom";

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
    name: "Outstanding Debt",
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

export const MembersList = () => {
  const navigate = useNavigate();
  const handleRowClicked = (row: DataRow) => {
    console.log("Row clicked:", row);
    navigate(`/members/${row.id}`);
  };
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
        }}
      >
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
    <Box
      sx={{ padding: "1.5rem", backgroundColor: "white", borderRadius: "1rem" }}
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
