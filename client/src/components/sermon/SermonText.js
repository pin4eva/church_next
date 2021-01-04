import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import moment from "moment";
import ReactMarkDown from "react-markdown/with-html";

const SermonTextComp = ({ sermon }) => {
  return (
    <Wrapper>
      <h3 className="font-weight-bold">{sermon?.topic}</h3>
      <small className="font-italic">
        {moment(sermon?.preachedOn).format("LL")}
      </small>
      <hr />
      <div className="body">
        <ReactMarkDown source={sermon?.body} />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

SermonTextComp.propTypes = { sermon: PropTypes.object };

export default SermonTextComp;
