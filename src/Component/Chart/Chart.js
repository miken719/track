import { Button, FormControlLabel, FormGroup, Switch } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const ChartBar = () => {
  const [show, hide] = useState(false)
  const userExpanse = useSelector((state) => state.expanse.user);
  return (
    <div style={{margin: "10px"}}>
      <FormGroup>
  <FormControlLabel  onClick={() =>hide(show ? false : true)} control={<Switch defaultChecked = {false} />} label="Graph" />
</FormGroup>
      {show ?   <LineChart
        width={900}
        height={300}
        data={userExpanse}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <>
          <Line type="monotone" dataKey={"amount"}  stroke="#8884d8" />
          <Line type="monotone" dataKey={"title"}  stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey={"date"} />
          <YAxis />

          <Tooltip />
        </>
      </LineChart> : null}
    
    </div>
  );
};

export default ChartBar;
