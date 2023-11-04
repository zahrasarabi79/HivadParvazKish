import React from "react";
import { Pagination, useMediaQuery, useTheme } from "@mui/material";
export interface PaginationComponent {
  TotalPaginationPage: number;
  rowsPerPage: number;
  page: number;
  handleChangePage: (event: React.ChangeEvent<unknown> | null, newPage: number) => void;
}

const PaginationComponent: React.FC<PaginationComponent> = ({ TotalPaginationPage, rowsPerPage, page, handleChangePage }) => {
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Pagination
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        "& .MuiPaginationItem-icon ": { bgcolor: "rgb(255, 255, 255) !important", borderRadius: "50%", color: "black" },
        "& .MuiButtonBase-root.MuiPaginationItem-root.Mui-selected": { bgcolor: "#Dbead9", color: "black" },
      }}
      size={mdDown ? "small" : "large"}
      count={Math.ceil(TotalPaginationPage / rowsPerPage)} // Calculate the total number of pages
      page={page}
      onChange={handleChangePage}
    />
  );
};

export default PaginationComponent;
