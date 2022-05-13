import { Button, FormLabel, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { expanseSlice } from "../Store/UserSlice";
const InputExpanse = () => {
  const [userExpanseInput, setUserExpanseInput] = useState({
    title: "",
    amount: "",
    date: "",
  });
  // const loading = useSelector((state) => state.expanse.loading);
  const [show, hide] = useState(false)
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(userExpanseInput, "id");
    // dispatch(expanseSlice.loadingState(true));
    fetch("https://expense-a77a9-default-rtdb.firebaseio.com/expense.json", {
      method: "POST",
      body: JSON.stringify({
        title: userExpanseInput.title,
        amount: userExpanseInput.amount,
        date: userExpanseInput.date,
      }),
      headers: { "Content-type": "application/json" },
    })
    
      .then((response) => response.json() )
      .then((responseData) => {
        // const loadedData = [];
        // for (const key in responseData) {
        //   loadedData.push({
        //     key: key,
        //     title: responseData.title,
        //     amount: responseData.amount,
        //     date: responseData.date,
        //   });
        //   dispatch(expanseSlice.addExpanse(loadedData));
        //   dispatch(expanseSlice.loadingState(false))
        // }
        setUserExpanseInput(
         [responseData, ...userExpanseInput]
        )
        dispatch(expanseSlice.addExpanse(userExpanseInput));
     

       
      })

      .catch((err) => console.log(err));

    setUserExpanseInput({ title: "", amount: "", date: "" });
  };
const handleHide = () => {
  hide(show ? false : true)
}


  return (
    <div className="input">
        
              {
          show ?  
          <>
      <div className="inputField">
        {/* <FormLabel>Date</FormLabel> */}
      

          <TextField
          type="date"
          placeholder="Date"
          value={userExpanseInput.date}
          onChange={(event) => {
            setUserExpanseInput({
              ...userExpanseInput,
              date: event.target.value,
            });
          }}
          required ={true}
        ></TextField>
      </div>
      <div className="inputField">
        {/* <FormLabel>Title</FormLabel> */}
        <TextField
          placeholder="Title"
          value={userExpanseInput.title}
          onChange={(event) => {
            setUserExpanseInput({
              ...userExpanseInput,
              title: event.target.value,
            });
          }}
          required ={true}
        ></TextField>
      </div>

      <div className="inputField">
        {/* <FormLabel>Amount</FormLabel> */}
        <TextField
          placeholder="Amount"
          value={userExpanseInput.amount}
          onChange={(event) => {
            setUserExpanseInput({
              ...userExpanseInput,
              amount: event.target.value,
            });
          }}
          required ={true}
        ></TextField>
      </div>
      <Button
        variant="contained"
        style = {{height: "30px", margin: "10px"}}
        onClick={handleSubmit}
      >
        Submit
      </Button>
      </>
     : null }
     <Button variant="contained" onClick={handleHide} style = {{height: "30px", margin: "10px" }}>{show ?  "Cancel" : "Add Transaction"}</Button>
    </div>
   
  );
};

export default InputExpanse;
