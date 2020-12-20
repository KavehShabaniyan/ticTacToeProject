import React from "react";
import { Button } from "@material-ui/core";
export default function Sq(props) {
  return (
    <Button
      variant="contained"
      color="primary"
      style={{ width: 100, height: 100 }}
      onClick={props.onClick}
    >
      {props.value}
    </Button>
  );
}
