import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import SermonTextComp from "components/sermon/SermonText";
import FrontHeader from "components/FrontHeader";
import { getSermon } from "apollo/actions/sermonActions";
import { LocalLibrary, Videocam } from "@material-ui/icons";
import { motion } from "framer-motion";
import { SingleVideo } from "components/video-components/list-preview-card";

const SermonPage = ({ sermon }) => {
  const [view, setView] = useState("Text");
  return (
    <Wrapper>
      <div className="sermon-header">
        <div className="nav-overlay">
          <FrontHeader></FrontHeader>
        </div>
        <div className="banner container">
          <div className="text-center">
            <h1>
              Sermon <br /> Readings
            </h1>
          </div>
        </div>
      </div>
      <div className="container icon-wrapper mt-4">
        <div className="inner">
          <motion.div className="icons" onClick={() => setView("Text")}>
            <LocalLibrary className={view === "Text" && "text-primary"} />
          </motion.div>
          <div className="icons" onClick={() => setView("Video")}>
            <Videocam className={view === "Video" && "text-primary"} />
          </div>
        </div>
      </div>
      <div className="container main">
        {sermon && (
          <div>
            {view === "Text" && <SermonTextComp sermon={sermon} />}
            {view === "Video" && <SingleVideo sermon={sermon} />}
          </div>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .icon-wrapper {
    .inner {
      display: grid;
      place-content: center;
      grid-column-gap: 1rem;
      grid-template-columns: repeat(2, auto);
    }
    .icons {
      display: grid;
      place-content: center;
      width: 3rem;
      height: 3rem;
      cursor: pointer;
      svg {
        font-size: 2.5rem;
      }
    }
  }
  .sermon-header {
    background: url("/sermon-bg.png") no-repeat;
    background-position: center;
    background-size: cover;
    .banner {
      h1 {
        color: white;
        font-weight: bold;
      }
    }
    @media screen and (min-width: 768px) {
      height: 24rem;
      .banner {
        height: inherit;
        max-height: 70%;

        display: flex;
        align-items: center;
        justify-content: center;
        h1 {
          font-size: 4rem;
          color: white;
          font-weight: 700;
        }
      }
    }
  }
`;

SermonPage.propTypes = { sermon: PropTypes.object };

export default SermonPage;

export const getServerSideProps = async ({ params }) => {
  try {
    const data = await getSermon(params.slug);

    return {
      props: {
        sermon: data,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};
