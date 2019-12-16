import React, { Component } from "react";
import NewOrder from "./NewOrder";

class New extends Component {
  render() {
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
        <NewOrder location={this.props.location} user={this.props.user} />
      </div>
    );
  }
}

export default New;
