import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import BPText from "../common/BPText";
import BPButton from "../common/BPButton";
import DialogTitle from "@material-ui/core/DialogTitle";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

export default function AddVehicleDialog(props) {
  const [vehicleCC, setVehicleCC] = React.useState(
    props.fields.vehicle_cc || ""
  );
  const [status, setStatus] = React.useState("Active");

  const onChangeStatus = e => {
    setStatus(e.target.value);
  };

  const onChangeCC = e => {
    setVehicleCC(e.target.value);
  };

  const submit = () => {
    if (vehicleCC === "" || vehicleCC === undefined) {
      props.showToast("Please fill Vehicle CC");
    } else {
      if (props.fields) {
        const fields = {
          data: {
            vehicle_cc: vehicleCC,
            status: status === "Active" ? true : false
          }
        };
        props.update(fields, props.fields._id);
      } else {
        const fields = {
          data: {
            vehicle_cc: vehicleCC
          }
        };
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
        <DialogTitle id="form-dialog-title">
          {props.fields ? "Edit Vehicle" : "Add Vehicle"}
        </DialogTitle>
        <DialogContent>
          <BPText
            onChange={e => onChangeCC(e)}
            id="cc"
            value={vehicleCC}
            label="Vehicle CC"
            type="text"
          />
          {props.fields && (
            <Select
              autoFocus
              onChange={onChangeStatus}
              value={status}
              style={{
                width: "100%",
                marginTop: "12px"
              }}
              inputProps={{
                name: "max-width",
                id: "max-width"
              }}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="InActive">InActive</MenuItem>
            </Select>
          )}
        </DialogContent>
        <DialogActions>
          <BPButton onClick={props.closeModal} label={"Cancel"} />
          <BPButton
            loading={props.btnLoading}
            onClick={() => submit()}
            label={props.fields ? "Edit Vehicle" : "Add Vehicle"}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
}
