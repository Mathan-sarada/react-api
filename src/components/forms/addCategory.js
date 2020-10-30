import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import BPText from "../common/BPText";
import MenuItem from "@material-ui/core/MenuItem";
import BPButton from "../common/BPButton";
import Select from "@material-ui/core/Select";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function AddCategoryDialog(props) {
  const [name, setName] = React.useState(props.fields.category_name || "");
  const [status, setStatus] = React.useState("Active");

  const onChangeName = e => {
    setName(e.target.value);
  };

  const onChangeStatus = e => {
    setStatus(e.target.value);
  };

  const submit = () => {
    if (name !== "" && name !== undefined) {
      if (props.fields) {
        const fields = {
          data: {
            category_name: name,
            status: status === "Active" ? true : false
          }
        };
        props.update(fields, props.fields._id);
      } else {
        const fields = {
          data: {
            category_name: name
          }
        };
        props.submit(fields);
      }
    } else {
      props.showToast("Please enter category name.");
    }
  };

  return (
    <div>
      <Dialog
        open={true}
        // onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Category</DialogTitle>
        <DialogContent>
          <BPText
            autoFocus={true}
            onChange={e => onChangeName(e)}
            id="name"
            value={name}
            label="Category Name"
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
        <DialogActions style={{ padding: "18px" }}>
          <BPButton onClick={props.closeModal} label={"Cancel"} />
          <BPButton
            onClick={() => submit()}
            loading={props.btnLoading}
            label={props.fields ? "Edit Category" : "Add Category"}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
}
