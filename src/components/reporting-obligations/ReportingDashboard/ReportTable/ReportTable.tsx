import { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";

const ReportTable = ({ reports, searchTerm, statusFilter }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;

  const filteredReports = reports.filter(
    (report) =>
      report.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === "" || report.status === statusFilter)
  );

  const totalPages = Math.ceil(filteredReports.length / rowsPerPage);
  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const pageNumbers = [];
  const maxPagesToShow = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <Box>
      <Table
        sx={{
          border: "1px solid #E5E7EB",
          borderRadius: "10px",
        }}
      >
        <TableHead>
          <TableRow>
            {[
              "REPORT NAME",
              "FREQUENCY",
              "NEXT DUE DATE",
              "STATUS",
              "ACTION",
            ].map((header) => (
              <TableCell
                key={header}
                sx={{ fontWeight: 500, color: "#4B465C" }}
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedReports.map((report, index) => (
            <TableRow key={index}>
              <TableCell>{report.name}</TableCell>
              <TableCell>{report.frequency}</TableCell>
              <TableCell>{report.dueDate}</TableCell>
              <TableCell>
                <Box
                  sx={{
                    bgcolor:
                      report.status === "Overdue"
                        ? "rgba(181, 69, 69, 0.16)"
                        : report.status === "Completed"
                        ? "rgba(0, 255, 136, 0.16)"
                        : "rgba(0, 122, 255, 0.16)",
                    color:
                      report.status === "Overdue"
                        ? "#B54545"
                        : report.status === "Completed"
                        ? "#3CA676"
                        : "#675DD8",
                    p: 0.5,
                    borderRadius: 1,
                    textAlign: "center",
                  }}
                >
                  {report.status}
                </Box>
              </TableCell>
              <TableCell>
                <Button variant="text" sx={{ minWidth: "auto", p: 0 }}>
                  <img
                    src="/assets/images/icons/dots-vertical.svg"
                    alt="Actions"
                    style={{ width: "24px", height: "24px" }}
                  />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Typography sx={{ color: "#6B7280", fontSize: "14px" }}>
          Showing 1 to{" "}
          {Math.min(currentPage * rowsPerPage, filteredReports.length)} of{" "}
          {filteredReports.length} entries
        </Typography>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Button
            variant="text"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            sx={{
              minWidth: "auto",
              p: 1,
              "&:disabled": { opacity: 0.5 },
            }}
          >
            <img
              src="/assets/images/icons/chevron-left.svg"
              alt="Previous"
              style={{ width: "24px", height: "24px" }}
            />
          </Button>
          {pageNumbers.map((page) => (
            <Button
              key={page}
              // variant={page === currentPage ? "contained" : "text"}
              onClick={() => handlePageClick(page)}
              sx={{
                minWidth: "32px",
                height: "32px",
                borderRadius: "50%",
                bgcolor: page === currentPage ? "#0A38F5" : "transparent",
                color: page === currentPage ? "#FFFFFF" : "#4B5563",
                fontSize: "14px",

                "&:hover": {
                  bgcolor: page === currentPage ? "#0A38F5" : "#E5E7EB", // light gray on hover
                  color: page === currentPage ? "#FFFFFF" : "#111827", // darker text
                },
              }}
            >
              {page}
            </Button>
          ))}
          <Button
            variant="text"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            sx={{
              minWidth: "auto",
              p: 1,
              "&:disabled": { opacity: 0.5 },
            }}
          >
            <img
              src="/assets/images/icons/chevron-right.svg"
              alt="Next"
              style={{ width: "24px", height: "24px" }}
            />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ReportTable;
