import { Button, Stack, Typography, colors } from "@mui/material";
import { useLocation } from "react-router-dom";
import { BreadCrumbs } from "./breadcrumbs";

export const Header = () => {
  const location = useLocation();

  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{
        gridArea: "header",
        width: "100%",
        height: "100%",
        borderBottom: "2px solid",
        borderColor: colors.grey[100],
        paddingX: "1rem",
      }}
    >
      <BreadCrumbs items={location.pathname.split("/")} />
      <Stack direction={"row"} gap={2}>
        <Typography variant="h6" color={colors.grey[700]}>
          {new Date().toLocaleDateString()}
        </Typography>
        <Typography variant="h6" color={colors.grey[700]}>
          Caleb Mwema
        </Typography>

        <Button variant="outlined" color="error">
          Log Out
        </Button>
      </Stack>
    </Stack>
  );
};
