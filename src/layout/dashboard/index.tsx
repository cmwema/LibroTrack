import { Box, colors } from "@mui/material";
import { Outlet } from "react-router-dom";
import { SideBar } from "../../components/sidebar";
import { Header } from "../../components/header";

export const DashboardLayout = (): React.ReactNode => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: colors.grey[50],
        display: "grid",
        gridTemplateColumns: "15rem 1fr",
        gridTemplateRows: "5rem 1fr",
        gridTemplateAreas: `
        "sidebar header"
        "sidebar main"
        `,
      }}
    >
      <SideBar />
      <Header />
      <Box
        sx={{
          gridArea: "main",
          width: "100%",
          height: "100%",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
