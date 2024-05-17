import { Box, List, Stack, Typography, colors } from "@mui/material";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import { navItems } from "../../utils/nav-items";
import { NavItem } from "./nav-item";
import { Link } from "react-router-dom";

export const SideBar = () => {
  return (
    <Stack
      justifyContent={"space-between"}
      sx={{
        gridArea: "sidebar",
        width: "100%",
        height: "100%",
        backgroundColor: colors.grey[50],
        padding: "1rem",
        borderRight: "1px solid",
        borderColor: colors.grey[100],
      }}
    >
      <Stack>
        <Box
          sx={{
            borderBottom: "1px solid",
            borderColor: colors.blueGrey[200],
            paddingY: "1rem",
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: colors.blue[300] }}
          >
            <LocalLibraryIcon /> LibroTrack
          </Typography>
        </Box>
        <List>
          {navItems.map((item) => (
            <NavItem title={item.title} Icon={item.Icon} link={item.link} />
          ))}
        </List>
      </Stack>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Link
          to={"https://github.com/cmwema"}
          style={{ textDecoration: "none", color: colors.blue[500] }}
        >
          <Typography>&copy; CMWEMA {new Date().getFullYear()}</Typography>
        </Link>
      </Box>
    </Stack>
  );
};
