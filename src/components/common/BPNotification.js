import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    color: "rgb(63, 148, 181)",
    fontSize: "15px",
    border: "1px solid rgb(63, 148, 181)",
    background: "#6e8ac80f"
  }
});

export default function BPSuccessNotification(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    open: false,
    vertical: "bottom",
    horizontal: "right"
  });

  const { vertical, horizontal } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <Snackbar
      className={classes.root}
      anchorOrigin={{ vertical, horizontal }}
      open={true}
      onClose={handleClose}
      message={props.message}
      key={vertical + horizontal}
    />
  );
}

export function BPErrorNotification(props) {
  const [state, setState] = React.useState({
    open: false,
    vertical: "bottom",
    horizontal: "right"
  });

  const { vertical, horizontal } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={true}
      onClose={handleClose}
      message={props.message}
      key={vertical + horizontal}
    />
  );
}
