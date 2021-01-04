import { useMutation } from "@apollo/client";
import { DELETE_SERMON } from "apollo/queries/sermonQuery";
import { SermonAtom } from "atoms/sermonAtom";
import { UpdateSermonModal } from "components/Dashboard/UpdateSermon";
import MoreIcon from "components/MoreIcon";
import moment from "moment";
import { months } from "moment";
import PropTypes from "prop-types";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { Grid } from "theme-ui";

const VideoPreviewItem = ({ width, height, sermon, onDelete }) => {
  const { videoUrl, topic, preachedOn, author } = sermon;
  const [deleteSermon, { loading }] = useMutation(DELETE_SERMON);
  const [showUpdate, setShowUpdate] = useState(false);

  const handleDelete = async () => {
    try {
      const { data } = await deleteSermon({ variables: { _id: sermon._id } });
      onDelete(data.deleteSermon._id);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Wrapper>
      <UpdateSermonModal
        sermon={sermon}
        show={showUpdate}
        onHide={() => setShowUpdate(false)}
      />
      <ReactPlayer
        url={videoUrl}
        controls
        playbackRate={2}
        width="100%"
        height={height}
        style={{ width: "100%", maxWidth: width }}
      />

      <div className="d-flex title-wrapper justify-content-between">
        <p className="series-title font-weight-bold ">{topic}</p>
        <MoreIcon>
          <li onClick={handleDelete}>Delete</li>
          <li onClick={() => setShowUpdate(true)}>Edit</li>
        </MoreIcon>
        {/* <MoreVert /> */}
      </div>
      <small className="d-block font-weight-bold text-muted">{author}</small>
      <small className="d-block font-weight-bold text-muted">
        {moment(preachedOn).format("LL")}
      </small>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  font-family: Montserrat;
  width: 100%;
  max-width: 568px;
`;

VideoPreviewItem.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  sermon: PropTypes.object,
  onDelete: PropTypes.func,
};

VideoPreviewItem.defaultProps = {
  width: "568px",
  height: "auto",
};

export const VideoList = () => {
  const [videos, setVideos] = useRecoilState(SermonAtom);
  const [count, setCount] = useState(12);
  const handleDelete = (id) => {
    setVideos(videos.filter((video) => video._id !== id));
  };

  return (
    <ListWrapper className="item-list mt-4">
      <div className="row">
        {videos.slice(0, count).map((video, i) => (
          <div key={i} className="col-md-4 mb-3">
            <VideoPreviewItem sermon={video} onDelete={handleDelete} />
          </div>
        ))}
      </div>

      {videos.length > 12 && (
        <div className="my-4 text-center">
          <button
            className="btn btn-outline-warning"
            onClick={() => setCount(count + 12)}
          >
            View More
          </button>
        </div>
      )}
    </ListWrapper>
  );
};

const ListWrapper = styled.div``;

export const SingleVideo = ({ sermon }) => {
  return (
    <VideoWrapper>
      <div className="fullscreen">
        <ReactPlayer url={sermon.videoUrl} controls width="100%" />
        <p className="font-weight-bold my-2">{sermon.topic}</p>
        <p className="m-0">{sermon.author}</p>
        <small className="font-italic">
          {moment(sermon.preachedOn).format("LL")}
        </small>
      </div>
      {/* <div className="related-videos">
        <Grid columns={[1, null, 3]}>
          <ReactPlayer
            url={sermon.videoUrl}
            controls
            playbackRate={2}
            width="100%"
          />
        </Grid>
      </div> */}
    </VideoWrapper>
  );
};

const VideoWrapper = styled.div``;

SingleVideo.propTypes = {
  sermon: PropTypes.object,
};
export default VideoPreviewItem;
