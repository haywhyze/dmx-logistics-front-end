import React from "react";
import NewOrder from "./NewOrder";
import NewOrderContainer from "./NewOrderContainer";

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
      {/* <NewOrder location={props.location} user={props.user} /> */}
      <NewOrderContainer />
    </div>
  );
}

export default New;
