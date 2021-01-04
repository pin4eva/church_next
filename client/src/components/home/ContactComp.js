import {
  Facebook,
  LocationOn,
  Mail,
  PhoneIphone,
  Twitter,
  WhatsApp,
  YouTube,
} from "@material-ui/icons";
import React from "react";
// import { FaGoogle, FaYoutube } from "react-icons/fa";
import styled from "styled-components";

const ContactComp = () => {
  return (
    <Wrapper>
      <div className="image">
        <h3 className="display-4 font-weight-bolder text-light">Contact Us</h3>
      </div>
      <div className="contact-form container">
        <h4 className="text-center text-uppercase mt-2 mb-4">Send a message</h4>
        <form>
          <div className="form-row mb-3">
            <div className="col">
              <label>Name</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col">
              <label>Email</label>
              <input type="text" className="form-control" />
            </div>
          </div>
          <div className="form-row mb-3">
            <div className="col">
              <label>Phone</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col">
              <label>Location</label>
              <input type="text" className="form-control" />
            </div>
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea className="form-control" rows="5"></textarea>
          </div>
        </form>
      </div>
      <div className="contact-details   ">
        <div className="container px-4 ">
          <ul className="location">
            <li className="text-center">
              <h2 className="text-primary font-weight-bold ">
                Head quarters Port Harcourt
              </h2>
              <p></p>
            </li>
            <li className="d-flex align-items-center">
              <LocationOn className="text-primary" />{" "}
              <div className="ml-3">
                22 Ordu Avenue, Rumuodara Port Harcourt
              </div>
            </li>
            <li className="d-flex align-items-center my-3">
              <PhoneIphone className="text-primary" />{" "}
              <div className="ml-3">
                <ul>
                  <li>+234 803 671 0528</li>
                  <li>+234 706 227 5085</li>
                </ul>
              </div>
            </li>
            <li className="d-flex align-items-center my-3">
              <Mail className="text-primary" />
              <a href="mailto:info@jointheirsassembly.org" className="ml-3">
                info@jointheirsassembly.org
              </a>
            </li>
          </ul>
          <ul className="socials d-flex justify-content-center">
            <li className="d-flex align-items-center mx-3">
              <a href="https://www.youtube.com/channel/UCQU4k6TC7FdU8KbCS2f60Pw">
                <YouTube className="text-danger" />
              </a>
            </li>
            <li className="d-flex align-items-center mx-3">
              <a href="https://twitter.com/jointheirsng">
                <Twitter className="" style={{ color: "#4D9CEB" }} />
              </a>
            </li>
            <li className="d-flex align-items-center mx-3">
              <a href="https://facebook.com/jointheirsng">
                <Facebook className="" style={{ color: "#4064AC" }} />
              </a>
            </li>
            <li className="d-flex align-items-center mx-3">
              <WhatsApp className="" style={{ color: "#65CC64" }} />
            </li>
          </ul>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(9, 10vh);

  .form-control {
    border: none;
    border-radius: 0;
    border-bottom: 1px solid gray;
    &:active,
    &:focus {
      border: none;
      border-radius: 0;
      outline: none;
      border-bottom: 1px solid gray;
    }
  }

  .image {
    background: url("/contact.png") no-repeat;
    background-position: center;
    background-size: cover;
    grid-column: 1/6;
    display: flex;
    align-items: center;
    justify-content: center;
    grid-row: 1/4;
  }
  .contact-form {
    grid-column: 1/6;

    max-width: 560px;
  }
  .contact-details {
    //#f2f2f2;
    grid-column: 1/6;
    display: none;
  }
  @media screen and (min-width: 768px) {
    .contact-form {
      grid-column: 1/4;
      grid-row: 4/8;
      width: 100%;
      max-width: 560px;
    }
    /* #F8F9FA */
    .contact-details {
      //#f2f2f2;
      grid-column: 4/6;
      grid-row: 3 / span 5;
      display: flex;
      align-items: center;
      background-color: #f8f9fa;
      /* place-content: center; */
      .container {
        /* background-color: yellow; */
        height: 60%;
      }
    }
  }
`;

export default ContactComp;
