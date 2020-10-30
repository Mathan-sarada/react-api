import React from "react";
import PropTypes from "prop-types";
import Mainbar from "./Mainbar";

const DefaultLayout = ({ children, noNavbar }) => (
  <div>
    <Mainbar children={children} />
  </div>
);

DefaultLayout.propTypes = {
  noNavbar: PropTypes.bool,
  noFooter: PropTypes.bool
};

DefaultLayout.defaultProps = {
  noNavbar: false,
  noFooter: false
};

export default DefaultLayout;
