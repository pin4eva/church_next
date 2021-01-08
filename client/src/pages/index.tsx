import { ArrowDownward } from "@material-ui/icons";
import HomeBanner from "components/home/BannerSlides";
import ContactComp from "components/home/ContactComp";
import { NextPage, NextPageContext } from "next";
import PropTypes from "prop-types";
import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import { Grid } from "theme-ui";
import { initializeApollo } from "../apollo";
import { GET_SERMONS } from "../apollo/queries/sermonQuery";
import AboutSection from "../components/home/AboutSection";
import RecentSermon from "../components/home/RecentSermon";
import Front from "../layout/Front";
import { fellowshipCards } from "../utils/home";
import Image from "next/image";

const HomePage = ({ sermons }): JSX.Element => {
  // const sermons = props?.sermons;
  // const sermons = useRecoilValue(SermonAtom);

  return (
    <Front>
      <Wrapper id="home_page">
        <section className="hero-section">
          <HomeBanner sermons={sermons} />
        </section>
        <section className="recent_sermons container">
          <div className=" my-4">
            <div className="d-md-flex wrapper">
              <div className="left item_list flex-grow-1">
                <h2 className="text-center">Recent Sermons</h2>
                {sermons.slice(0, 3).map((sermon) => (
                  <RecentSermon sermon={sermon} key={sermon._id} />
                ))}

                <div className="my-4 text-center  ">
                  <ArrowDownward />
                </div>
              </div>
              <div className=" right d-none d-md-flex">
                <div className="text_content container mb-4">
                  <p className="display-4">Daily Bible Reading</p>
                  <button className="btn btn-secondary">Subscribe</button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="prayer">
          <div className="container ">
            <div className="row">
              <div className="col-md-4 p-2 text-center text-light">
                <h3 className="display-3 font-weight-bold">Need Prayers ?</h3>
                <button className="btn btn-primary">Request</button>
              </div>
            </div>
          </div>
        </section>

        <section className="fellowship">
          <div className="container">
            <Grid columns={[1, null, 2]} gap={3}>
              {fellowshipCards.map((card, i) => (
                <div
                  className="grid_item "
                  style={{
                    background: `url(${card.image})`,
                  }}
                  key={i + 1}
                >
                  <div className="text-content ">
                    <h3 className="display-2 font-weight-bolder text-light">
                      {card.name}
                    </h3>
                  </div>
                </div>
              ))}
            </Grid>
          </div>
        </section>
        <section className="testimony">
          <div className="wrapper ">
            <img
              src="/onyi.jpeg"
              alt=""
              height="190"
              width="190"
              className="rounded-pill"
            />
            <div className="text_content ml-0 ml-md-3 text-center mt-3 mt-md-0">
              <p className="">
                I want to testify what God did for me,it all started December
                4th, 2020 when I felt sick, I bled in my brain and pass out. I
                was rushed to the hospital unconscious and I thought I was dead
                but God had mercy on me and brought me back. Such thing when it
                happened to some people they either become paralyzed or they
                died instantly during that time I was in the hospital thinking
                am gone my daddy (Apostle Edirhin Eta) prayed for me and I
                became well again and now am completely heal, am not paralyzed
                nor dead, no more headache or pain. So I came back to say
                there's God in Joint heirs Assembly, glory to God.
              </p>
              <p>
                <strong>Onyinyechi Oboh</strong>
              </p>
            </div>
          </div>
        </section>
        <AboutSection />
        <ContactComp />
      </Wrapper>
    </Front>
  );
};

HomePage.propTypes = {
  sermons: PropTypes.array,
};

const Wrapper = styled.section`
  font-family: Montserrat;
  overflow-x: hidden;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .contact_details {
    display: flex;
    align-items: center;

    .location {
      li {
        display: flex;
        align-items: center;
        .right {
          margin: 0.5rem 1rem;
        }
      }
    }
  }
  .carousel-wrapper {
    background: red;

    .single-carousel {
      /* background-color: green; */
      /* width: 100%; */
    }
  }
  .carousel-indicators {
    position: static;
  }
`;
export default HomePage;

HomePage.getInitialProps = async (ctx: NextPageContext) => {
  const apollo = initializeApollo(null, ctx);
  try {
    const { data } = await apollo.query({
      query: GET_SERMONS,
    });
    const sermons = data?.getSermons;

    return { sermons };
  } catch (error) {
    console.log(error);
    return { sermons: null };
  }
};
