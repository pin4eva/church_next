import React from "react";
import Front from "../layout/Front";
import styled from "styled-components";

const IndexPage = () => {
  return (
    <Front>
      <Wrapper>
        <section className="hero-section">
          <div className="container">
            <div className="text-right">right</div>
            <div className="text-content">
              <div className="w-50">
                <div className="latest_sermon bg-dark">Latest Sermon</div>
                <h2 className="display-3">The Resurrection of Jesus</h2>
              </div>
              <ul className="d-flex">
                <li>
                  <button className="btn btn-primary">Watch sermon</button>
                </li>
                <li>
                  <button className="btn btn-primary">
                    <i className="fas fa-microphone"></i>
                  </button>
                </li>
                <li>
                  <button className="btn btn-primary">
                    <i className="fas fa-book-open"></i>
                  </button>
                </li>
                <li>
                  <button className="btn btn-outline-light">
                    View More sermon
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </Wrapper>
    </Front>
  );
};

export default IndexPage;

const Wrapper = styled.section`
  background: red;
  width: 100%;
`;
