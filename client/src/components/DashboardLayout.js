import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { NotificationsActive } from "@material-ui/icons";
import DashboardSidebar from "./Dashboard/DashboardSidebar";
import MoreIcon from "./MoreIcon";
import { FaBars } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { SidebarAtom } from "atoms/SidebarAtom";
import { Spinner } from "theme-ui";

const DashboardLayout = ({ children, user }) => {
  const [isOpen, setIsOpen] = useRecoilState(SidebarAtom);
  if (!user)
    return (
      <div
        className="d-flex justify-content-center align-items-center "
        style={{ height: 500 }}
      >
        <Spinner />
      </div>
    );
  return (
    <Wrapper id="dashboard-layout">
      <aside
        className={`left-aside d-none d-md-block ${
          isOpen ? "d-block" : "d-none"
        }`}
      >
        <DashboardSidebar user={user} />
      </aside>
      <main>
        <div className="container-fluid main-container">
          <div className="main-left">
            <div id="top-heading" className="card  mb-3">
              <FaBars
                size="2rem"
                className="d-block d-md-none"
                onClick={() => setIsOpen(!isOpen)}
              />
              <h5 className="">Home 2</h5>
            </div>
            {children}
          </div>
          <aside className="right-aside">
            <div className="container">
              <div className="card  ">
                <div className="d-flex justify-content-between">
                  <NotificationsActive />
                  <div className="current-user">
                    <ul className="nav">
                      <li>{user.firstName}</li>
                      <MoreIcon>
                        <li>Settings </li>
                        <li>Logout</li>
                      </MoreIcon>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="container"></div>
          </aside>
        </div>
      </main>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  #top-heading {
    flex-direction: row;
    h5 {
      flex: 1;
      text-align: center;
    }
  }
`;

DashboardLayout.propTypes = {
  children: PropTypes.any,
  user: PropTypes.object,
};
export default DashboardLayout;
