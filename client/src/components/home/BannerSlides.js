import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import { LocalLibrary, Mic, Videocam } from "@material-ui/icons";
import styled from "styled-components";
import Link from "next/link";

const HomeBanner = ({ sermons }) => {
  const [index, setIndex] = useState(0);

  return (
    <Wrapper>
      <div className="container">
        <div className="text-content">
          {sermons.slice(0, 3).map((sermon, i) => (
            <div className="wrapper" key={i}>
              <AnimatePresence exitBeforeEnter>
                {index === i && <BannerSlideText sermon={sermon} />}
              </AnimatePresence>
            </div>
          ))}

          <ul className="carousel-indicators ">
            {sermons.slice(0, 3).map((_, i) => (
              <li key={i} onClick={() => setIndex(i)}></li>
            ))}
          </ul>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: inherit;
  .container {
    height: 100%;
    width: 100%;
    /* background-color: yellow; */
    position: relative;
    display: flex;
    align-items: flex-end;
    .text-content {
      width: 100%;
      max-width: 720px;
      margin-bottom: 1.5rem;
    }

    .wrapper {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 20%;
      width: 100%;
      max-width: 720px;

      display: flex;
      align-items: flex-end;
    }
    .single-carousel {
      margin-top: 2rem;
      .btn {
        cursor: pointer !important;
      }
      .latest_sermon {
        font-weight: 500;
        display: inline-block;
        border-radius: 10px;
        padding: 0.5% 3%;
        color: #fff;
      }
      .display-3 {
        font-weight: 700;
        color: #fff;
        font-size: 4rem;
        margin: 1.5rem 0;
      }
      @media screen and (max-width: 768px) {
        .display-3 {
          font-size: 2rem;
        }
        .btn {
          font-size: 14px !important;
        }
      }
    }
  }
`;

HomeBanner.propTypes = {
  sermons: PropTypes.array,
};

export default HomeBanner;

export const BannerSlideText = ({ sermon }) => {
  return (
    <motion.div
      initial={{ x: "100vw" }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 120 }}
      exit={{ x: -1800, speed: 0 }}
      className="single-carousel"
    >
      <div className="latest_sermon bg-gray">Latest Sermon</div>
      <h1 className=" display-3  ">{sermon.topic}</h1>
      <motion.ul
        className="d-flex sermon-btns"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <li>
          <Link href="/sermons/[slugs]" as={`/sermons/${sermon.slug}`}>
            <a className="btn btn-primary mr-2">
              <Videocam />
            </a>
          </Link>
        </li>
        <li>
          <Link href="/sermons/[slugs]" as={`/sermons/${sermon.slug}`}>
            <a className="btn btn-primary mr-2">
              <Mic />
            </a>
          </Link>
        </li>
        <li>
          <Link href="/sermons/[slugs]" as={`/sermons/${sermon.slug}`}>
            <a className="btn btn-primary mr-2">
              <LocalLibrary />
            </a>
          </Link>
        </li>
        <li>
          <Link href="/sermons">
            <a className="btn btn-outline-light">View More</a>
          </Link>
        </li>
      </motion.ul>
    </motion.div>
  );
};

BannerSlideText.propTypes = {
  sermon: PropTypes.object,
};
