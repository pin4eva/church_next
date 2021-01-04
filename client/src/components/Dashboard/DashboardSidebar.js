import { DashboardSharp, LocalLibrary, Settings } from "@material-ui/icons";
import { SidebarAtom } from "atoms/SidebarAtom";
import Link from "next/link";
import PropTypes from "prop-types";
import React from "react";
import { FaCross, FaPodcast, FaUsers } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { jscookie } from "utils/exports";

const DashboardSidebar = ({ user }) => {
  const [open, setOpen] = useRecoilState(SidebarAtom);
  const { role } = user;
  const logout = () => {
    jscookie.removeToken();
  };

  const handleNav = () => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      setOpen(false);
    }
  };
  return (
    <Wrapper>
      <div className="container">
        <ul className="nav flex-column">
          <li className="nav-item" onClick={handleNav}>
            <Link href="/dashboard">
              <a className="nav-link text-light">
                <DashboardSharp /> Dashboard
              </a>
            </Link>
          </li>
          <li className="nav-item" onClick={handleNav}>
            <Link href="/dashboard/sermons">
              <a className="nav-link text-light">
                <FaPodcast /> Sermon
              </a>
            </Link>
          </li>
          <li className="nav-item" onClick={handleNav}>
            <Link href="/dashboard">
              <a className="nav-link text-light">
                <FaCross /> Prayer
              </a>
            </Link>
          </li>
          {role === "Admin" && (
            <li className="nav-item" onClick={handleNav}>
              <Link href="/dashboard">
                <a className="nav-link text-light">
                  <FaUsers /> Users
                </a>
              </Link>
            </li>
          )}
          <li className="nav-item" onClick={handleNav}>
            <Link href="/dashboard">
              <a className="nav-link text-light">
                <LocalLibrary /> Devotional
              </a>
            </Link>
          </li>{" "}
          <li className="nav-item" onClick={handleNav}>
            <Link href="/dashboard">
              <a className="nav-link text-light">
                <Settings /> Settings
              </a>
            </Link>
          </li>
          <li className="nav-item ">
            <a className="nav-link text-warning " onClick={logout}>
              <FiLogOut /> Logout
            </a>
          </li>
        </ul>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .nav {
    margin-top: 3rem;
    li {
      .nav-link {
        font-size: 1.3rem;
        font-weight: 600;
        margin: 1rem 0;
        cursor: pointer;
        svg {
          font-size: inherit;
          font-weight: inherit;
        }
      }
    }
  }
`;

DashboardSidebar.propTypes = {
  user: PropTypes.object,
};
export default DashboardSidebar;
