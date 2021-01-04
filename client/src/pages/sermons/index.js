import { SermonAtom } from "atoms/sermonAtom";
import FrontHeader from "components/FrontHeader";
import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import moment from "moment";
import Link from "next/link";
import { Fragment } from "react";
import Head from "next/head";

const SermonListPage = () => {
  const sermons = useRecoilValue(SermonAtom);
  return (
    <Fragment>
      <Head>
        <meta
          name="description"
          content="View Recent Sermons of Apostle Edirhin Eta"
        />
        <title>Sermons</title>
      </Head>
      <Wrapper>
        <div className="sermon-header">
          <div className="nav-overlay">
            <FrontHeader />
          </div>
          <div className="banner container">
            <div className="text-center">
              <h1>
                Sermon <br /> Readings
              </h1>
            </div>
          </div>
        </div>
        <div className="container main">
          <h4 className="font-weight-bold mb-4">Recent Sermon</h4>

          {sermons.map((sermon, i) => (
            <div className="sermon-list mb-3" key={i}>
              <Link href="/sermons/[slug]" as={`/sermons/${sermon.slug}`}>
                <a>
                  {" "}
                  <h6>{sermon.topic}</h6>
                </a>
              </Link>
              <p className="my-0 text-muted">{sermon.author}</p>
              <small className="font-italic text-muted ">
                {moment(sermon.preachedOn).format("LL")}
              </small>
              <div className="mt-2">{sermon.excerpt}</div>
            </div>
          ))}
        </div>
      </Wrapper>
    </Fragment>
  );
};

const Wrapper = styled.div`
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
export default SermonListPage;
