import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import BPText from "../common/BPText";
import BPButton from "../common/BPButton";
import DialogTitle from "@material-ui/core/DialogTitle";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

export default function AddLocationDialog(props) {
  const [location, setLocation] = React.useState(props.fields.location || "");
  const [status, setStatus] = React.useState("Active");

  const onChangeLocation = e => {
    setLocation(e.target.value);
  };

  const onChangeStatus = e => {
    setStatus(e.target.value);
  };

  const submit = () => {
    if (location !== "" && location !== undefined) {
      if (props.fields) {
        const fields = {
          data: {
            location: location,
            status: status === "Active" ? true : false
          }
        };
        props.update(fields, props.fields._id);
      } else {
        const fields = {
          data: {
            location: location,
            status: status === "Active" ? true : false
          }
        };
        props.submit(fields);
      }
    } else {
      props.showToast("Please enter location.");
    }
  };

  return (
    <div>
      <Dialog open={true} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          {props.fields ? "Edit Location" : "Add Location"}
        </DialogTitle>
        <DialogContent>
          <BPText
            onChange={e => onChangeLocation(e)}
            id="location"
            value={location}
            label="Location"
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
            onClick={() => submit()}
            loading={props.btnLoading}
            label={props.fields ? "Edit Location" : "Add Location"}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
}
