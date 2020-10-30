import React, { Fragment } from "react";
import { Dialog, FormControl, InputLabel } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import BPText from "../common/BPText";
import BPTextArea from "../common/BPTextArea";
import BPButton from "../common/BPButton";
import DialogTitle from "@material-ui/core/DialogTitle";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

export default function AddServiceDialog(props) {
  const [name, setName] = React.useState(
    (props.fields && props.fields.service_name) || ""
  );
  const [description, setDescription] = React.useState(
    props.fields.description || ""
  );
  const [price, setPrice] = React.useState(props.fields.price || "");
  const [category, setCategory] = React.useState("");
  const [vehicleCC, setVehicleCC] = React.useState("");
  const [showVehicleCC, setShowVehicleCC] = React.useState(false);
  const [status, setStatus] = React.useState("Active");

  const onChangeName = e => {
    setName(e.target.value);
  };

  const onChangeStatus = e => {
    setStatus(e.target.value);
  };

  const onChangeDescription = e => {
    setDescription(e.target.value);
  };

  const onChangePrice = e => {
    setPrice(e.target.value);
  };

  const onChangeCategory = e => {
    if (e.target.value == "bike service") {
      setShowVehicleCC(true);
    } else {
      setShowVehicleCC(false);
    }
    setCategory(e.target.value);
  };

  const onChangeVehicleCC = e => {
    setVehicleCC(e.target.value);
  };

  const submit = () => {
    if (
      name === "" ||
      name === undefined ||
      description === "" ||
      description === undefined ||
      price === "" ||
      price === undefined
    ) {
      props.showToast("Please fill all the fields");
    } else {
      if (props.fields) {
        const fields = {
          data: {
            service_name: name,
            description: description,
            price: price,
            status: status === "Active" ? true : false
          }
        };
        props.update(fields, props.fields._id);
      } else {
        let fields = {
          data: {
            service_name: name,
            category_name: category,
            description: description,
            price: price
          }
        };
        if (category == "bike service") {
          Object.assign(fields["data"], { vehicle_cc: vehicleCC });
        }
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
          {props.fields ? "Edit Service" : "Add Service"}
        </DialogTitle>
        <DialogContent>
          <BPText
            autoFocus={true}
            onChange={e => onChangeName(e)}
            id="name"
            value={name}
            label="Service Name"
            type="text"
          />
          {!props.fields && (
            <Fragment>
              <FormControl style={{ width: "100%", marginTop: "5px" }}>
                <InputLabel
                  shrink
                  id="demo-simple-select-placeholder-label-label"
                >
                  Service
                </InputLabel>
                <Select
                  autoFocus
                  onChange={onChangeCategory}
                  value={category}
                  placeholder={"Category"}
                  style={{
                    width: "100%",
                    marginTop: "12px"
                  }}
                  inputProps={{
                    name: "max-width",
                    id: "max-width"
                  }}
                >
                  {props.category &&
                    props.category.map(row => {
                      return (
                        <MenuItem key={row._id} value={row.category_name}>
                          {row.category_name}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
              {showVehicleCC && (
                <FormControl style={{ width: "100%", marginTop: "5px" }}>
                  <InputLabel
                    shrink
                    id="demo-simple-select-placeholder-label-label"
                  >
                    Vehicle CC
                  </InputLabel>
                  <Select
                    autoFocus
                    onChange={onChangeVehicleCC}
                    value={vehicleCC}
                    placeholder={"Vehicle CC"}
                    style={{
                      width: "100%",
                      marginTop: "12px"
                    }}
                    inputProps={{
                      name: "max-width",
                      id: "max-width"
                    }}
                  >
                    {props.vehicle &&
                      props.vehicle.map(row => {
                        return (
                          <MenuItem key={row._id} value={row.vehicle_cc}>
                            {row.vehicle_cc}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
              )}
            </Fragment>
          )}
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
          <BPTextArea
            onChange={e => onChangeDescription(e)}
            id="description"
            value={description}
            label="Description"
            type="text"
          />
          <BPText
            onChange={e => onChangePrice(e)}
            id="price"
            value={price}
            label="Price"
            type="text"
          />
        </DialogContent>
        <DialogActions>
          <BPButton onClick={props.closeModal} label={"Cancel"} />
          <BPButton
            onClick={() => submit()}
            loading={props.btnLoading}
            label={props.fields ? "Edit Service" : "Add Service"}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
}
