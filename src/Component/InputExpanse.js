import { Button, CircularProgress, FormLabel, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { expanseSlice } from "../Store/UserSlice";
const InputExpanse = () => {
  const [userExpanseInput, setUserExpanseInput] = useState({
    title: "",
    amount: "",
    date: "",
  });
  const loading = useSelector((state) => state.expanse.loading);
  const [show, hide] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.expanse.user);
  // console.log("datauser", userData)
  function validateForm() {
    var z = document.forms["myExpense"]["num"].value;
    if (!/^[0-9, -]+$/.test(z)) {
      alert("Invalid!!! enter numeric value");
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(userExpanseInput, "id");
    dispatch(expanseSlice.loadingState(true));
    fetch("https://expense-a77a9-default-rtdb.firebaseio.com/expense.json", {
      method: "POST",
      body: JSON.stringify({
        title: userExpanseInput.title,
        amount: userExpanseInput.amount,
        date: userExpanseInput.date,
      }),
      headers: { "Content-type": "application/json" },
    })
      .then((response) => response.json())
      .then((responseData) => {
        dispatch(
          expanseSlice.addExpanse([
            {
              id: responseData.name,
              title: userExpanseInput.title,
              amount: userExpanseInput.amount,
              date: userExpanseInput.date,
            },
            ...userData,
          ])
        );
        dispatch(expanseSlice.loadingState(false));
      })

      .catch((err) => console.log(err));
    validateForm();
    setUserExpanseInput({ title: "", amount: "", date: "" });
  };
  const handleHide = () => {
    hide(show ? false : true);
  };

  return (
    <div>
      <form name="myExpense" className="input" onSubmit={handleSubmit}>
        {show ? (
          <>
            <div className="inputField">
              <TextField
                required
                type="date"
                placeholder="Date"
                value={userExpanseInput.date}
                onChange={(event) => {
                  setUserExpanseInput({
                    ...userExpanseInput,
                    date: event.target.value,
                  });
                }}
              ></TextField>
            </div>
            <div className="inputField">
              <TextField
                required
                placeholder="Title"
                value={userExpanseInput.title}
                onChange={(event) => {
                  setUserExpanseInput({
                    ...userExpanseInput,
                    title: event.target.value,
                  });
                }}
              ></TextField>
            </div>

            <div className="inputField">
              <TextField
                // type="num"
                // name="num"
                placeholder="Amount"
                value={userExpanseInput.amount}
                onChange={(event) => {
                  setUserExpanseInput({
                    ...userExpanseInput,
                    amount: event.target.value,
                  });
                }}
                pattern="[0-9]*"
                inputmode="numeric"
                type="number"
              ></TextField>
            </div>
            <Button
              type="submit"
              variant="contained"
              style={{ height: "30px", margin: "10px" }}
              onSubmit={handleSubmit}
            >
              {" "}
              {loading ? (
                <CircularProgress
                  style={{ width: "20px", color: "white" }}
                ></CircularProgress>
              ) : (
                "Submit"
              )}
            </Button>
          </>
        ) : null}
        <Button
          variant="contained"
          onClick={handleHide}
          style={{ height: "30px", margin: "10px" }}
        >
          {show ? "Cancel" : "Add Transaction"}
        </Button>
      </form>{" "}
    </div>
  );
};

export default InputExpanse;
