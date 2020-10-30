import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import BPText from "../common/BPText";
import BPButton from "../common/BPButton";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: "400px",
    margin: "auto",
    padding: "10px"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

export default function LogIn(props) {
  const classes = useStyles();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [adminId, setAdminId] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);

  const onChangeEmail = e => {
    setEmail(e.target.value);
  };

  const onBlurEmail = e => {
    var pattern = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g);
    if (!pattern.test(e.target.value)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const onChangePassword = e => {
    setPassword(e.target.value);
  };

  const onChangeAdminId = e => {
    setAdminId(e.target.value);
  };

  const submit = () => {
    const fields = {
      data: {
        email: email,
        password: password
      }
    };
    props.submit(fields, adminId);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          SignIn
        </Typography>
        <BPText
          label="Email"
          type="email"
          value={email}
          onBlur={onBlurEmail}
          onChange={onChangeEmail}
        />
        {emailError && (
          <Typography style={{ color: "red", fontSize: "12px" }}>
            Enter a valid Email
          </Typography>
        )}
        <BPText
          label="Password"
          type="password"
          value={password}
          onChange={onChangePassword}
        />
        <BPText
          label="Admin Id"
          type="number"
          value={adminId}
          onChange={onChangeAdminId}
        />
      </CardContent>
      <CardActions style={{ float: "right" }}>
        <BPButton
          loading={props.btnLoading}
          style={{ marginRight: "6px" }}
          onClick={() => submit()}
          label={"Sign In"}
        />
      </CardActions>
    </Card>
  );
}
