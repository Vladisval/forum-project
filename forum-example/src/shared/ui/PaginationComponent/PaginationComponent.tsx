import { Box, Pagination } from "@mui/material";

interface PaginationComponentProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PaginationComponent = ({ pageCount, currentPage, onPageChange}: PaginationComponentProps) => {

  const handlePageChange = (_ :any, value: number) => {
    onPageChange(value);
  };

  return (
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: "10px 0" }}>
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
  );
};

export default PaginationComponent;