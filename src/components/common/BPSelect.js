import React, { Component } from "react";
import Select from "react-select";

export const BPSelect = props => (
  <Select
    options={props.options}
    onChange={props.onChange}
    value={props.value}
  />
);
