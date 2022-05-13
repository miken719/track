import { Box } from "@mui/material";
import React from "react";
import ChartBar from "./Chart/Chart";
import ExpanseDetails from "./ExpanseDetails";
import Header from "./Header";
import InputExpanse from "./InputExpanse";

const UserContainer = () => {
  return (
    <div>
      <Header></Header>
      <Box
        sx={{
          width: "100%",
          height: 300,
          alignItems: "center",
          // border: "2px solid",
        }}
      >
        <InputExpanse></InputExpanse>
        <ExpanseDetails></ExpanseDetails>
        <ChartBar></ChartBar>
      </Box>
    </div>
  );
};

export default UserContainer;
