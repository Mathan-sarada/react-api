import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import BPText from "../common/BPText";
import BPButton from "../common/BPButton";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";

export default function AddVendorDialog(props) {
  const [name, setName] = React.useState(props.fields.vendor_name || "");
  const [mobile, setMobile] = React.useState(props.fields.mobile || "");
  const [email, setEmail] = React.useState(props.fields.email || "");
  const [location, setLocation] = React.useState(props.fields.location || "");
  const [emailError, setEmailError] = React.useState(false);

  const onChangeName = e => {
    setName(e.target.value);
  };

  const onChangeMobile = e => {
    if (e.target.value.length <= 10) {
      setMobile(e.target.value);
    }
  };

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

  const onChangeLocation = e => {
    setLocation(e.target.value);
  };

  const submit = () => {
    if (
      name === "" ||
      name === undefined ||
      email === "" ||
      email === undefined ||
      mobile === "" ||
      mobile === undefined ||
      location === "" ||
      location === undefined
    ) {
      props.showToast("Please fill all the fields");
    } else {
      const fields = {
        data: {
          vendor_name: name,
          email: email,
          mobile: mobile,
          location: location
        }
      };
      if (props.fields) {
        props.update(fields, props.fields._id);
      } else {
        props.submit(fields);
      }
    }
  };

  return (
    <div>
      <Dialog
        open={true}
        // onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Vendor</DialogTitle>
        <DialogContent>
          <BPText
            autoFocus={true}
            onChange={e => onChangeName(e)}
            id="name"
            value={name}
            label="Vendor Name"
            type="text"
          />
          <BPText
            onChange={e => onChangeMobile(e)}
            id="mobile"
            value={mobile}
            inputmode="numeric"
            type="number"
            pattern="[0-9]*"
            label="Mobile Number"
          />
          <BPText
            onChange={e => onChangeEmail(e)}
            onBlur={onBlurEmail}
            id="email"
            value={email}
            label="Email Address"
            type="email"
          />
          {emailError && (
            <Typography style={{ color: "red", fontSize: "12px" }}>
              Enter a valid Email
            </Typography>
          )}
          <BPText
            onChange={e => onChangeLocation(e)}
            id="location"
            value={location}
            label="Location"
            type="text"
          />
        </DialogContent>
        <DialogActions>
          <BPButton onClick={props.closeModal} label={"Cancel"} />
          <BPButton
            onClick={() => submit()}
            loading={props.btnLoading}
            label={props.fields ? "Edit Vendor" : "Add Vendor"}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
}
