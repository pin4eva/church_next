import React from "react";
import styled from "styled-components";

const FrontFooter = () => {
  return (
    <Footer className="bg-dark " id="front_footer">
      <div className="container">
        <div className="text-center">
          <div className="d-flex brand text-light">
            <img src="/logo1.png" alt="" />
            <div className="pl-2">
              <h4>Joint Heirs Assembly </h4>
              <h4>International</h4>
            </div>
          </div>
        </div>
        <div className="text-center social-icons">
          <ul>
            <li>
              <a href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fab fa-youtube"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fab fa-whatsapp"></i>
              </a>
            </li>
          </ul>
        </div>
        <div className="navigation">
          <ul>
            <li>
              <button className="btn btn-outline-light">Prayer Request</button>
            </li>
            <li>
              <button className="btn btn-outline-light">Devotionals</button>
            </li>
            <li>
              <button className="btn btn-outline-light">Testimony</button>
            </li>
          </ul>
        </div>
      </div>
    </Footer>
  );
};

export default FrontFooter;

const Footer = styled.footer`
  width: 100%;
`;
