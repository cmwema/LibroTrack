import { useEffect, useMemo, useState } from "react";
import { Box, Stack, TextField } from "@mui/material";
import DataTable, { TableColumn } from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { useMembersListQuery } from "../../store/api-slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setChanged } from "../../store/crud-slice";

interface DataRow {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  debt: number;
}

const columns: TableColumn<DataRow>[] = [
  {
    name: "First Name",
    selector: (row: DataRow) => row.first_name,
  },
  {
    name: "Last Name",
    selector: (row: DataRow) => row.last_name,
  },
  {
    name: "Email",
    selector: (row: DataRow) => row.email,
  },
  {
    name: "Outstanding Debt",
    selector: (row: DataRow) => row.debt,
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
    navigate(`/members/${row.id}`);
  };
  const [filterText, setFilterText] = useState("");
  const { data, isSuccess, isLoading, refetch } = useMembersListQuery({});
  const dispatch = useDispatch();
  const changed = useSelector((state: RootState) => state.crud.changed);

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
          placeholder="Search"
          variant="outlined"
          label="Search"
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
          padding: "4rem",
          backgroundColor: "white",
          borderRadius: "1rem",
        }}
      >
        Loading...
      </Box>
    );
  }
  if (isSuccess) {
    const filteredItems = data.filter(
      (item: DataRow) =>
        item.first_name.toLowerCase().includes(filterText.toLowerCase()) ||
        item.last_name.toLowerCase().includes(filterText.toLowerCase()) ||
        item.email.toLowerCase().includes(filterText.toLowerCase())
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
