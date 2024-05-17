import { Stack, Typography, colors } from "@mui/material";
import React from "react";
interface LayoutProps {
  title: string;
  children: React.ReactNode;
  ButtonComponent: React.ComponentType;
}

export const Layout = ({ title, children, ButtonComponent }: LayoutProps) => {
  return (
    <Stack sx={{ padding: "1rem", gap: 4 }}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        sx={{
          height: "5rem",
          backgroundColor: "white",
          alignItems: "center",
          padding: "1rem",
          borderRadius: "1rem",
        }}
      >
        <Typography variant="h6">{title}</Typography>
        <ButtonComponent />
      </Stack>
      <Stack>{children}</Stack>
    </Stack>
  );
};
