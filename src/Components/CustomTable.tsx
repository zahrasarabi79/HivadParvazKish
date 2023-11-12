import { ReactNode } from "react";
import { StyledTableCell, StyledTableRow } from "@/style/StyleComponents/TableStyle";
import { Paper, Table, TableBody, TableContainer, TableHead, TableRow, useTheme } from "@mui/material";
import React from "react";
import { usePathname } from "next/navigation";

export interface ICustomTable {
  tableData: (string | ReactNode)[][];
  headers: string[];
  headerWidths?: string[];
  page: number;
  paginationFetchData: Record<string, number>;
}
const CustomTable: React.FC<ICustomTable> = ({ tableData, headers, headerWidths, page, paginationFetchData }) => {
  const emptyRows = page > 0 ? Math.max(0, paginationFetchData.limitPerPage - tableData.length) : 0;
  const currentpath = usePathname();

  return (
    <TableContainer dir="rtl" sx={{ boxShadow: "none" }} component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <StyledTableCell
                colSpan={header === "عملیات" ? 3 : 0}
                key={index}
                align={typeof header !== "object" && header === "عملیات" ? "center" : "left"}
                style={{ width: `${headerWidths?.[index] || "auto"}` }}
              >
                {header}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row, rowIndex) => (
            <StyledTableRow key={rowIndex}>
              <StyledTableCell component="th" scope="row" align="left">
                {rowIndex + 1 + (page > 1 ? paginationFetchData.limitPerPage * (page - 1) : 0)}
              </StyledTableCell>
              {row.map((cell, cellIndex) => (
                <StyledTableCell
                  key={cellIndex}
                  align={typeof cell !== "string" && currentpath !== "/systemlog" ? "center" : "left"}
                  sx={{ ["&.MuiTableCell-root"]: { padding: typeof cell !== "string" && currentpath !== "/systemlog" ? "0px 8px 0px 0px" : "6px 16px" } }}
                >
                  {cell}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
          {emptyRows > 0 && (
            <StyledTableRow
              style={{
                height: 50 * emptyRows,
                backgroundColor: "transparent",
              }}
            >
              <StyledTableCell colSpan={6} />
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
