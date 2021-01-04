import React from "react";
import PropTypes from "prop-types";

const Menu = ({ bg, size }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 63 63"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="31.5" cy="31.5" r="31.5" fill={bg} />
      <line
        x1="18.75"
        y1="19.6956"
        x2="44.0217"
        y2="19.6956"
        stroke="white"
        strokeWidth="3"
      />
      <line
        x1="25.3427"
        y1="26.2883"
        x2="44.0218"
        y2="26.2883"
        stroke="white"
        strokeWidth="3"
      />
      <line
        x1="25.3427"
        y1="33.9797"
        x2="44.0218"
        y2="33.9797"
        stroke="white"
        strokeWidth="3"
      />
      <line
        x1="30.8365"
        y1="40.5723"
        x2="44.0218"
        y2="40.5723"
        stroke="white"
        strokeWidth="3"
      />
    </svg>
  );
};

Menu.propTypes = {
  bg: PropTypes.string,
  size: PropTypes.string,
};

Menu.defaultProps = {
  bg: "#030CE0",
  size: "3rem",
};
export default Menu;
