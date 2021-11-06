import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux";
import { deletePost, updatePost } from "../../actions/posts";
import DeleteIcon from "@material-ui/icons/Delete";
import { Button, ButtonGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@material-ui/core';
import moment from 'moment';
import useStyles from "./styles";


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.common.black,
    height: 20
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.common.white,
    },
  },
}))(TableRow);

const PlayersList = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, posts?.length - page * rowsPerPage);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell>Participant name</StyledTableCell>
              <StyledTableCell align="center">Location</StyledTableCell>
              <StyledTableCell align="center">Date</StyledTableCell>
              <StyledTableCell align="center">Units</StyledTableCell>
              <StyledTableCell align="center">Type</StyledTableCell>
              <StyledTableCell align="center">Points</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.participant}
                </StyledTableCell>
                <StyledTableCell align="center">{row.location}</StyledTableCell>
                <StyledTableCell align="center">{moment(row.createdAt).format('DD/MM/YYYY')}</StyledTableCell>
                <StyledTableCell align="center">{row.units} km</StyledTableCell>
                <StyledTableCell align="center">{row.type}</StyledTableCell>
                <StyledTableCell align="center">
                  <ButtonGroup size="small" aria-label="small outlined button group">
                  <Button onClick={() => {
                      dispatch(updatePost(row._id, { ...row, points: row.points - 1 }))

                    }}>-</Button>
                    <Button >{row.points}</Button>
                    <Button onClick={() => {
                      dispatch(updatePost(row._id, { ...row, points: row.points + 1 }))

                    }}>+</Button>
                   
                  </ButtonGroup>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    size="small"
                    color="secondary"
                    onClick={() => dispatch(deletePost(row._id))}
                  >
                    <DeleteIcon fontSize="small" />
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <StyledTableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>

        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={posts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  );
}

export default PlayersList;

