import {
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  colors,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
interface NavItemProps {
  title: string;
  Icon: React.ComponentType;
  link: string;
}
export const NavItem = ({ title, Icon, link }: NavItemProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <ListItem>
      <ListItemButton
        onClick={() => navigate(link)}
        sx={{
          borderRadius: "1rem",
          backgroundColor: `${
            location.pathname === link ? colors.blue[100] : ""
          }`,
        }}
      >
        <ListItemAvatar>
          <Icon />
        </ListItemAvatar>
        <ListItemText>{title}</ListItemText>
      </ListItemButton>
    </ListItem>
  );
};
