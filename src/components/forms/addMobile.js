import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import BPButton from "../common/BPButton";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function AddMobileDialog(props) {
  const submit = () => {
    const fields = {
      data: {
        mobile_number: props.mobile
      }
    };
    props.submit(fields);
  };

  return (
    <div>
      <Dialog open={true} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Assign To Vendor</DialogTitle>
        <DialogContent>
          Are you sure you want to assign to this vendor?
        </DialogContent>
        <DialogActions style={{ padding: "18px" }}>
          <BPButton onClick={props.closeModal} label={"Cancel"} />
          <BPButton
            loading={props.btnLoading}
            onClick={() => submit()}
            label={"Assign To Vendor"}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
}
