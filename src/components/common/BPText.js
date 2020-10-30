import React from "react";
import { TextField } from "@material-ui/core";

const BPText = ({ label, id, type, autoFocus, onChange, value, onBlur }) => {
  return (
    <TextField
      autoFocus={autoFocus}
      margin="dense"
      id={id}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      label={label}
      type={type}
      fullWidth
    />
  );
};

export default BPText;
