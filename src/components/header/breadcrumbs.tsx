import { Breadcrumbs, Typography } from "@mui/material";

interface BreadCrumbsProps {
  items: string[];
}

export const BreadCrumbs = ({ items }: BreadCrumbsProps) => {
  const filteredItems = items.filter((item) => item !== "");
  return (
    <Breadcrumbs aria-label="breadcrumb" separator="›">
      {filteredItems.map((item, index) => (
        <Typography
          variant="h6"
          sx={{ textTransform: "capitalize" }}
          key={index}
        >
          {item}
        </Typography>
      ))}
    </Breadcrumbs>
  );
};
