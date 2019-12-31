import React from "react";
import NewOrder from "./NewOrder";

function New(props) {
  return (
    <div
      className="main"
      style={{
        width: "60%",
        display: "flex",
        flexDirection: "column",
        marginTop: "1em"
      }}
    >
      <NewOrder location={props.location} user={props.user} />
    </div>
  );
}

export default New;
