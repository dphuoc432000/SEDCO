import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function BasicPagination(props) {
  return (
    <Stack spacing={2}>
      <Pagination count={props.count} color="primary" onChange={(event, value) => {props.handleChangePage(value)}} />
    </Stack>
  );
}
