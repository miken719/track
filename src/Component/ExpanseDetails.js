import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import userExpanseSlice, { expanseSlice } from "../Store/UserSlice";
import { Button, CircularProgress, LinearProgress } from "@mui/material";
import { Delete } from "@mui/icons-material";

const ExpanseDetails = ({ data }) => {
  const userExpanse = useSelector((state) => state.expanse.user);
  const loading = useSelector((state) => state.expanse.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    //  dispatch(expanseSlice.loadingState(true))
    fetch("https://expense-a77a9-default-rtdb.firebaseio.com/expense.json")
      .then((response) => response.json())
      .then((responseData) => {
        const loadedData = [];
        for (const key in responseData) {
          loadedData.push({
            id: key,
            title: responseData[key].title,
            amount: responseData[key].amount,
            date: responseData[key].date,
          });
          dispatch(expanseSlice.addExpanse(loadedData));
          // dispatch(expanseSlice.loadingState(false))
        }
      });
  },[]);

  const handleRemove = (value) => {
    dispatch(expanseSlice.loadingState(true))
      fetch(`https://expense-a77a9-default-rtdb.firebaseio.com/expense/${value}.json`, {
       method : 'DELETE',
      }).then((response) => response.json()).catch(
        err => console.log("error", err)
      )
      dispatch(expanseSlice.removeTask(value))
    dispatch(expanseSlice.loadingState(false))
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          {loading ? <CircularProgress style={{float : "right"}}></CircularProgress> : userExpanse.map((items) => (
            <TableBody key={items.id}>
              <TableCell key={items.id}>{items.title}</TableCell>
              <TableCell>{items.amount} &#x20b9;</TableCell>
              <TableCell>{items.date}</TableCell>
              <Button variant="contained" onClick={()=>handleRemove(items.id)} style={{background: "#c80000c7", left: "-250px"} }>  Delete <Delete style={{color: "white "}}></Delete></Button>
            </TableBody>
        
          ))}
          
        </Table>
      </TableContainer>
    </div>
  );
};

export default ExpanseDetails;
