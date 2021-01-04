import React from "react";
import styled from "styled-components";

const AboutSection = () => {
  return (
    <Wrapper>
      <section className="about_us">
        <div className="wrapper">
          <div className="bg-primary main_div">
            <div className="text-content text-center ">
              <h2 className="text-center text-light font-weight-bold">
                Our Vision
              </h2>
              <p className="lead text-light">
                Connecting people to their divine heritage in Christ
              </p>
              <div className="line text-center"></div>
            </div>
          </div>
          <div className=" secondary_div ">
            <div className="card flex-row item d-md-flex justify-content-between">
              <div className=" text_area ">
                <div className="text-content container p-2">
                  <h2 className="text-center font-weight-bolder">
                    Our Mission
                  </h2>
                  <ul className="text-center">
                    <li className="my-2">
                      To reach out and reconcile the people to God through
                      Christ{" "}
                    </li>
                    <li className="my-2">
                      To reach in and develop the people to spiritual,
                      emotional, and social maturity{" "}
                    </li>
                    <li className="my-2">
                      To reach up in intercession for the people and the nation{" "}
                    </li>
                    <li className="my-2">
                      To reach down in love and help those in need
                    </li>
                  </ul>
                </div>
              </div>
              <div className=" image_area">
                <img src="/daddynmummy.jpg" alt="about" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .about_us {
    .wrapper {
      display: grid;
      grid-template-columns: 1fr 80vw 1fr;
      grid-template-rows: 10vh 5em 5em auto;
    }

    .main_div {
      position: relative;
      height: 20rem;
      width: 100%;
      grid-column: 1/4;

      .text-content {
        height: 100%;
        width: 568px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: auto;
        .display-4 {
          font-weight: 500;
          font-size: 2rem;
          // padding: 0.5rem;
        }
        .line {
          display: inline-block;
          width: 40px;
          height: 1px;
          background-color: white;
          margin-top: 0;
        }
      }
      @media screen and (max-width: $sm) {
        .text-content {
          width: 310px;
          margin: auto;
          .display-4 {
            font-size: 1.5rem;
          }
        }
      }
    }
    .secondary_div {
      z-index: 1;
      grid-column: 2/3;
      grid-row: 4/6;
      /* box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5); */
      .item {
        height: inherit;
        width: 100%;

        margin: auto;

        .text_area {
          display: grid;
          height: 100%;
          margin: auto;
        }
        .image_area {
          width: 100%;
          max-width: 560px;

          img {
            width: 100%;
          }
        }
        p {
          font-size: large;
        }
      }
    }
  }
`;

export default AboutSection;
