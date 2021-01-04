import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Link from "next/link";
import { router } from "next";
import { navList } from "utils/exports";
import { FaBars } from "react-icons/fa";

const FrontHeader = (props) => {
  const [activePath, setActivePath] = useState("/");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (router.route === "/sermons/[slug]") {
        setActivePath("/sermons");
      } else {
        setActivePath(router.route);
      }
    }
  }, []);

  return (
    <Wrapper className="navbar navbar-expand-lg container align-items-center">
      <Link href="/">
        <a className="navbar-brand text-light">
          <img src="/logo1.png" alt="logo" />
          <div className="text-content">
            <p className="p1">Joint Heirs Assembly</p>
            <p className="p2">International</p>
          </div>
        </a>
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon text-light">
          <FaBars />
        </span>
      </button>

      <div className="collapse navbar-collapse " id="navbarSupportedContent">
        <ul className="navbar-nav justify-content-end">
          {navList.map((nav, i) => (
            <li className="nav-item active" key={i}>
              <Link href={nav.link}>
                <a className="nav-link text-light">
                  {nav.name} <span className="sr-only">(current)</span>
                </a>
              </Link>
              <div
                className={nav.link === activePath ? "active-line" : ""}
              ></div>
            </li>
          ))}

          <li className="nav-item">
            <Link href="/auth">
              <a className="nav-link text-secondary">Join us</a>
            </Link>
          </li>
        </ul>
      </div>
    </Wrapper>
  );
};

FrontHeader.propTypes = {};

export default FrontHeader;

const Wrapper = styled.nav`
  .navbar-collapse {
    justify-content: flex-end;
  }
  li {
    text-transform: uppercase;
    a {
      font-weight: 500;
    }
  }
  .active-line {
    height: 3px;
    display: block;
    width: 30%;
    background-color: ${(props) => props.theme.colors.secondary};
    transition: 0.5s all ease-in-out;
    @media screen and (min-width: 768px) {
      width: 100%;
      max-width: 70%;
      margin: auto;
    }
  }
  .navbar-brand {
    display: flex;
    align-items: center;
    img {
      width: 3rem;
      height: 3rem;
    }
    .text-content {
      margin-left: 0.5rem;
      p {
        margin: 0;
        padding: 0;
        line-height: 1.2rem;
      }
      .p1 {
        font-weight: 500;
      }
    }
  }
  @media screen and (max-width: 600px) {
    .navbar-brand {
      font-size: 1rem;
      img {
        width: inherit;
        max-width: 2rem;
        height: 2rem;
      }
    }
    .navbar-collapse {
      li {
        .nav-link {
          font-size: 90%;
        }
      }
    }
  }
`;
