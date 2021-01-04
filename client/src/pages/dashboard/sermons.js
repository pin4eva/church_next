import AddSermonModal from "components/Dashboard/AddSermonModal";
import DashboardLayout from "components/DashboardLayout";
import { VideoList } from "components/video-components/list-preview-card";
import React, { useState } from "react";
import styled from "styled-components";
import { withAuth } from "utils/withAuth";
import PropTypes from "prop-types";

const DashboardSermonHome = ({ props }) => {
  const [view, setView] = useState(false);

  const handleAddSuccess = () => {
    setView(0);
  };

  return (
    <DashboardLayout user={props.user}>
      <Wrapper>
        <div className="text-right my-3">
          <button className="btn btn-warning" onClick={() => setView(!view)}>
            {!view ? "Add" : "Cancel"}
          </button>
        </div>
        {!view ? (
          <div className="card ">
            {/* <div className="sermon-month d-flex align-items-end">
                <h6 className="my-0 mr-4 font-weight-bold ">January</h6>
                <div className="line flex-grow-1 bg-dark"></div>
              </div> */}

            <VideoList />
          </div>
        ) : (
          <div className="card">
            <AddSermonModal onSuccess={handleAddSuccess} />
          </div>
        )}
      </Wrapper>
    </DashboardLayout>
  );
};

const Wrapper = styled.div`
  .line {
    height: 3px;
  }
`;

DashboardSermonHome.propTypes = {
  props: PropTypes.any,
  user: PropTypes.object,
};

export default withAuth(DashboardSermonHome);
