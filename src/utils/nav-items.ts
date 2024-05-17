import MenuBookIcon from "@mui/icons-material/MenuBook";
import PeopleIcon from "@mui/icons-material/People";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { routesEnum } from "./routesEnum";

export const navItems = [
  {
    title: "books",
    Icon: MenuBookIcon,
    link: routesEnum.BOOKS,
  },
  {
    title: "members",
    Icon: PeopleIcon,
    link: routesEnum.MEMBERS,
  },
  {
    title: "transactions",
    Icon: ReceiptIcon,
    link: routesEnum.TRANSACTIONS,
  },
];
