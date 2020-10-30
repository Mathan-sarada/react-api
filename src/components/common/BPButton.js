import React from "react";
import { Button, CircularProgress } from "@material-ui/core";
import * as ColorPallette from "../theme/colors";

let Colors = ColorPallette.primaryColors;

const BPButton = ({ label, onClick, loading }) => {
  return (
    <Button
      style={{
        backgroundColor: Colors.primeBG,
        color: Colors.buttonBG,
        border: Colors.buttonBorder,
        marginBottom: "10px",
        height: "40px"
      }}
      variant="contained"
      color="primary"
      onClick={onClick}
    >
      {loading && <CircularProgress size={20} />}
      {label}
    </Button>
  );
};

export default BPButton;
