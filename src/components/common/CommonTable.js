import React, { Fragment } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Table, TextField } from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Autocomplete from "@material-ui/lab/Autocomplete";
import BPButton from "./BPButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import "./styles.css";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#3f94b5",
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  button: {
    display: "block",
    marginTop: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  label: {
    fontSize: "12px"
  }
}));

function Row(props) {
  const { row, classes } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDetail, setOpenDetail] = React.useState(false);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleRowClick = (event, mobile) => {
    setAnchorEl(null);
    props.Update(mobile);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const header1 = [
    "Vehicle Owner Name",
    "Vehicle No",
    "Modal Year",
    "Brand",
    "Address",
    "Location",
    "Mobile Number"
  ];

  const header2 = ["Brand", "Address", "Location", "Mobile Number"];

  return (
    <Fragment>
      <StyledTableRow key={row._id}>
        <Fragment>
          <StyledTableCell component="th" scope="row">
            {props.service.find(x => x._id == row.service_id).service_name}
          </StyledTableCell>
          <StyledTableCell>{row.category_name}</StyledTableCell>
          <StyledTableCell component="th" scope="row">
            {row.category_name == "bike service"
              ? row.service_details.vehicle_cc
              : "null"}
          </StyledTableCell>
          <StyledTableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpenDetail(!openDetail)}
            >
              {openDetail ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}{" "}
            </IconButton>
            Details
          </StyledTableCell>
          <StyledTableCell>{row.price}</StyledTableCell>
          <StyledTableCell>{row.status ? row.status : ""}</StyledTableCell>
          <StyledTableCell>{row.created_date}</StyledTableCell>
          <StyledTableCell
            aria-controls="simple-menu"
            aria-haspopup="true"
            style={{
              textDecoration: "underLine",
              color: "#3f94b5",
              cursor: "pointer"
            }}
            className={classes.button}
          >
            {props.index == 0 ? (
              <div>
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                  classes={{ label: classes.label }}
                  style={{ marginTop: "-18px", marginLeft: "-25px" }}
                >
                  Assign To Vendor
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  {props.vendor &&
                    props.vendor.length &&
                    props.vendor.map(x => {
                      return (
                        <MenuItem
                          value={x.mobile}
                          onClick={(e, mobile) => handleRowClick(e, x.mobile)}
                        >{`${x.vendor_name}-${x.location}-${x.mobile}`}</MenuItem>
                      );
                    })}
                </Menu>
              </div>
            ) : (
              ""
            )}
          </StyledTableCell>
        </Fragment>
      </StyledTableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={openDetail} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Order Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    {row.category_name == "bike service"
                      ? header1.map(row => (
                          <StyledTableCell key={row}>{row}</StyledTableCell>
                        ))
                      : header2.map(row => (
                          <StyledTableCell key={row}>{row}</StyledTableCell>
                        ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <StyledTableRow key={row._id}>
                    {row.category_name == "bike service" && (
                      <Fragment>
                        <StyledTableCell>
                          {row.service_details.vehicle_owner_name}
                        </StyledTableCell>
                        <StyledTableCell>
                          {row.service_details.vehicle_no}
                        </StyledTableCell>
                        <StyledTableCell>
                          {row.service_details.model_year}
                        </StyledTableCell>
                      </Fragment>
                    )}
                    <StyledTableCell>{row.brand}</StyledTableCell>
                    <StyledTableCell>{row.address}</StyledTableCell>
                    <StyledTableCell>{row.location}</StyledTableCell>
                    <StyledTableCell>{row.mobile_number}</StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

const CommonTable = props => {
  const [openDetail, setOpenDetail] = React.useState(false);
  const [orderDetail, setorderDetail] = React.useState(false);

  const view = orderId => {
    setOpenDetail(false);
    props.view(orderId);
  };

  const classes = useStyles();
  return !props.loading ? (
    <React.Fragment>
      {props.buttonLabel && (
        <div style={{ display: "flex" }}>
          {props.page !== "service" && (
            <BPButton label={props.buttonLabel} onClick={props.onClick} />
          )}
          <form className={classes.root} noValidate autoComplete="off">
            {props.filterOption && (
              <Autocomplete
                id="free-solo-demo"
                freeSolo
                style={{ width: "170px", marginTop: "-15px" }}
                onChange={props.onchangeOption}
                options={props.filterOption.map(option => option)}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Search..."
                    margin="normal"
                    size="small"
                    variant="outlined"
                  />
                )}
              />
            )}
          </form>
        </div>
      )}
      <TableContainer component={Paper} style={{ marginBottom: "20px" }}>
        <Table style={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {props.Header.map(row => (
                <StyledTableCell key={row}>{row}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data &&
              props.data.length > 0 &&
              props.data.map(row => (
                <StyledTableRow key={row._id}>
                  {props.buttonLabel === "Add Category" && (
                    <Fragment>
                      <StyledTableCell component="th" scope="row">
                        {row.category_name}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.status ? "Active" : "InActive"}
                      </StyledTableCell>
                    </Fragment>
                  )}
                  {props.buttonLabel === "Add Vendor" && (
                    <Fragment>
                      <StyledTableCell component="th" scope="row">
                        {row.vendor_name}
                      </StyledTableCell>
                      <StyledTableCell>{row.mobile}</StyledTableCell>
                      <StyledTableCell>{row.email}</StyledTableCell>
                      <StyledTableCell>{row.location}</StyledTableCell>
                    </Fragment>
                  )}
                  {props.buttonLabel === "Add Service" && (
                    <Fragment>
                      <StyledTableCell component="th" scope="row">
                        {row.service_name}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {row.category_id.category_name}
                      </StyledTableCell>
                      {row.service_type === "bike service" && (
                        <StyledTableCell>
                          {row.vehicle_id.vehicle_cc}
                        </StyledTableCell>
                      )}
                      <StyledTableCell>{row.description}</StyledTableCell>
                      <StyledTableCell>{row.price}</StyledTableCell>
                      <StyledTableCell>
                        {row.status == true ? "Active" : "InActive"}
                      </StyledTableCell>
                    </Fragment>
                  )}
                  {props.buttonLabel === "Add Vehicle" && (
                    <Fragment>
                      <StyledTableCell>{row.vehicle_cc}</StyledTableCell>
                      <StyledTableCell>
                        {row.status ? "Active" : "InActive"}
                      </StyledTableCell>
                    </Fragment>
                  )}
                  {props.buttonLabel === "Add Location" && (
                    <Fragment>
                      <StyledTableCell>{row.location}</StyledTableCell>
                      <StyledTableCell>
                        {row.status ? "Active" : "InActive"}
                      </StyledTableCell>
                    </Fragment>
                  )}
                  {props.page === "orders" && (
                    <Fragment>
                      <StyledTableCell component="th" scope="row">
                        {row.mobile_number}
                      </StyledTableCell>
                      <StyledTableCell>{row.category_name}</StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {row.location}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.status
                          ? row.status == true
                            ? "Active"
                            : "InActive"
                          : ""}
                      </StyledTableCell>
                      <StyledTableCell>{row.created_date}</StyledTableCell>
                    </Fragment>
                  )}

                  {props.page === "orders" && (
                    <StyledTableCell
                      style={{
                        textDecoration: "underLine",
                        color: "#3f94b5",
                        cursor: "pointer"
                      }}
                      onClick={id => view(row.orderId)}
                    >
                      View
                    </StyledTableCell>
                  )}
                  {props.buttonLabel && (
                    <StyledTableCell
                      style={{
                        textDecoration: "underLine",
                        color: "#3f94b5",
                        cursor: "pointer"
                      }}
                      onClick={() => props.Update(row)}
                    >
                      Edit
                    </StyledTableCell>
                  )}
                </StyledTableRow>
              ))}
            {props.viewData &&
              props.viewData.length > 0 &&
              props.viewData.map((row, index) => (
                <Row
                  service={props.service}
                  key={row.name}
                  vendor={props.vendor}
                  row={row}
                  index={index}
                  classes={classes}
                  Update={props.Update}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  ) : (
    <div className="preloader">
      <img
        src="http://i.imgur.com/KUJoe.gif"
        className="rotate"
        width="70"
        alt=""
        height="70"
      />
    </div>
  );
};

export default CommonTable;
