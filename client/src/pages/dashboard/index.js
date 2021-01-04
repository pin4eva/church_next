import DashboardLayout from "components/DashboardLayout";
import React from "react";
import { withAuth } from "utils/withAuth";
import PropTypes from "prop-types";

const DashboardHome = ({ props }) => {
  return (
    <DashboardLayout user={props.user}>
      <div className="container">
        <h2>Home index</h2>
      </div>
    </DashboardLayout>
  );
};

DashboardHome.propTypes = {
  props: PropTypes.any,
  user: PropTypes.object,
};

export default withAuth(DashboardHome);
