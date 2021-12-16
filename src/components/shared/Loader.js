import React from "react";

const Loader = (props) => {
  return (
    <div className="d-flex align-items-center h-100 justify-content-center">
      <div className="spinner-border spinner-border-md" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <span className="pl-2">Loading</span>
    </div>
  );
};
export default Loader;
