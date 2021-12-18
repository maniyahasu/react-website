import React from "react";
import { PropTypes } from 'prop-types';

const Loader = (props) => {
  const { height } = props;
  const heightObject = {
    height: height,
    width: '100%'
  }
  return (
    <div className={`d-flex align-items-center justify-content-center`} style={heightObject}>
      <div className="spinner-border spinner-border-md" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <span className="pl-2">Loading</span>
    </div>
  );
};
export default Loader;

Loader.propTypes = {
  height: PropTypes.string.isRequired
}
