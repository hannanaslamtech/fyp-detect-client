import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {
  Container,
  IconButton,
  TableFooter,
  TablePagination,
} from "@material-ui/core";
import Axios from "axios";
import TablePaginationActions from "@material-ui/core/TablePagination/TablePaginationActions";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import ToastComp from "../../../../components/Toast/Toast_Comp";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  root: {
    height: "100%",
    paddingTop: "30px",
  },
});

const ReceptionistTable = () => {
  const classes = useStyles();
  const [toast, setToast] = useState(false);
  const [data, setData] = useState([]);
  const history=useHistory();
  const userList = async () => {
    const user = await Axios.get("https://detect-fyp-server.vercel.app/users/receptionist",{
        headers:{
            "Authorization":"Bearer "+localStorage.getItem("auth_token")
        }
    })
    setData(user.data.receptionistInfo)
   // console.log(user.data.teacherInfo)
  };
  const deleteUser = async (id)=> {
    const user= await Axios.get(`https://detect-fyp-server.vercel.app/users/delete/${id}`,{
    })
    if(user){
      console.log("deleted successfully")
      setToast(true); 
      userList();
    }
    else{
      console.log("something went wrong")
    }
  }
  const editUser = async (user)=>{
    history.push({
      pathname: "/edit-staff",
      state:{
        user:user
      }
    });
  }
  useEffect(() => {
    userList()
  }, []);

  //   const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <Container className={classes.root}>
      <ToastComp
          setToast={setToast}
          renderToast={toast}
          msg="User Deleted Succesfully"
        />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow style={{ background: 'linear-gradient(to right, #dfe4e7, #909497)'}}>
            <TableCell
              align="center" style={{ color: 'black',fontWeight: 'bold',textDecoration: 'bold', }}
              >
                Id
              </TableCell>
              <TableCell
              align="center" style={{ color: 'black',fontWeight: 'bold',textDecoration: 'bold', }}
              >
                Receptionists
              </TableCell>
              <TableCell
              align="center" style={{ color: 'black',fontWeight: 'bold',textDecoration: 'bold', }}
              >
                Email
              </TableCell>
              
              <TableCell
              align="center" style={{ color: 'black',fontWeight: 'bold',textDecoration: 'bold', }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : data
            ).map((row) => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row" align="center">
                  {row._id}
                </TableCell>

                <TableCell align="center">{row.userName}</TableCell>
                <TableCell align="center">
                {row.email}
                </TableCell>
                <TableCell className="" align="center">
                  <IconButton onClick={()=>editUser(row)}>  
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton onClick = {()=>deleteUser(row._id)}>
                    <DeleteIcon style={{ color: "red" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 7, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ReceptionistTable;
