import React from "react";

function Success() {
  // setTimeout(() => (window.location.href = "/all"), 2500);
  return (
    <div
      style={{
        minHeight: "calc(100vh - 5em)",
        marginTop: "-5em",
        display: "flex",
        flexDirection: "column",
        marginLeft: "2em",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <h1 className="ui centered"> Order Created Successfully </h1>{" "}
      {(localStorage.dataLoaded = undefined)} <p> Redirecting to home... </p>
    </div>
  );
}

export default Success;
