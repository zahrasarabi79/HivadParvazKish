import React from "react";
import { Pagination } from "@mui/material";
export interface PaginationComponent {
  TotalPaginationPage: number;
  rowsPerPage: number;
  page: number;
  handleChangePage: (event: React.ChangeEvent<unknown> | null, newPage: number) => void;
}

const PaginationComponent: React.FC<PaginationComponent> = ({ TotalPaginationPage, rowsPerPage, page, handleChangePage }) => {
  return (
    <Pagination
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        "& .MuiPaginationItem-icon ": { bgcolor: "rgb(255, 255, 255) !important", borderRadius: "50%", color: "black" },
        "& .MuiButtonBase-root.MuiPaginationItem-root.Mui-selected": { bgcolor: "#Dbead9", color: "black" },
      }}
      count={Math.ceil(TotalPaginationPage / rowsPerPage)} // Calculate the total number of pages
      page={page}
      onChange={handleChangePage}
    />
  );
};

export default PaginationComponent;
