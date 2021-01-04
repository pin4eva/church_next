import { MoreVert } from "@material-ui/icons";
import PropTypes from "prop-types";
import React from "react";
import { Dropdown } from "react-bootstrap";
import styled from "styled-components";

const MoreIcon = (props) => {
  const { children, varraint } = props;
  return (
    <Wrapper {...props}>
      <Dropdown>
        <MoreVert
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        />
        {/* <i
          className={`fas fa-ellipsis-${varraint ? "h" : "v"}`}
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        ></i> */}
        <div className="dropdown-menu mr-4">{children}</div>
      </Dropdown>
    </Wrapper>
  );
};

const Wrapper = styled.span`
  cursor: pointer;
  .dropdown-menu {
    li {
      padding: 0.5rem 0.9rem;
      cursor: pointer;
      &:hover {
        background: ${(props) => props.theme.colors.primary};
        color: white;
      }
    }
  }
`;

MoreIcon.propTypes = {
  children: PropTypes.any,
  varraint: PropTypes.bool,
};

export default MoreIcon;
