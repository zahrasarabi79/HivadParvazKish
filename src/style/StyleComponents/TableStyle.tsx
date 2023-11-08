import { TableCell, TableRow, styled, tableCellClasses } from "@mui/material";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#434255",
    color: theme.palette.common.white,
    padding: "6px 16px",
  

    // borderBottom: "1px solid white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: "13px 16px",
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.background.paper,
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  },
  "&:nth-of-type(odd)": {
    backgroundColor: "#2e2c42",
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  },
}));
