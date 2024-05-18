import { Button, Stack, Typography, colors } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BreadCrumbs } from "./breadcrumbs";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { routesEnum } from "../../utils/routesEnum";

export const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate(routesEnum.LOGIN);
  };

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
      <Stack direction={"row"} gap={2}>
        <Button variant="text" onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </Button>
        <BreadCrumbs items={location.pathname.split("/")} />
      </Stack>
      <Stack direction={"row"} gap={2}>
        <Typography variant="h6" color={colors.grey[700]}>
          {new Date().toLocaleDateString()}
        </Typography>

        <Button variant="outlined" color="error" onClick={handleLogout}>
          Log Out
        </Button>
      </Stack>
    </Stack>
  );
};
