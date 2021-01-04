import { useMutation } from "@apollo/client";
import { UPDATE_SERMON } from "apollo/queries/sermonQuery";
import { SermonAtom } from "atoms/sermonAtom";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import ReactMde from "react-mde";
import { useRecoilState } from "recoil";
import { Converter } from "showdown";
import { preachers } from "utils/exports";

const converter = new Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

export const UpdateSermonModal = ({ sermon, show, onHide }) => {
  const [view, setView] = useState(0);
  const [selectedTab, setSelectedTab] = useState("write");
  const [videos, setVideos] = useRecoilState(SermonAtom);
  const [info, setInfo] = useState({
    ...sermon,
  });
  const [body, setBody] = useState(sermon.body);
  const [excerpt, setExcerpt] = useState(sermon.excerpt);
  const [updateSermon, { loading }] = useMutation(UPDATE_SERMON);

  useEffect(() => {
    if (info.author === "Others") {
      setView(1);
    }
  }, [info.author]);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { __typename, ...rest } = info;
    const sermonData = {
      ...rest,
      excerpt,
      body,
    };
    try {
      console.log(sermonData);
      const { data } = await updateSermon({ variables: { input: sermonData } });

      setVideos(
        videos.map((video) =>
          video._id === data.updateSermon._id
            ? (video = data.updateSermon)
            : video
        )
      );

      // onSuccess(data.updateSermon);
      onHide();
      alert("SUCCESS !");
    } catch (error) {
      console.log(error);
      if (error?.networkError) {
        alert("NETWORK ERROR");
      } else if (error?.graphQLErrors) {
        error.graphQLErrors.forEach((err) => alert(err.message));
      } else {
        alert("Something went wrong!, try again later");
      }
      // onError(error)
    }
  };

  return (
    <Modal size="lg" show={show} onHide={onHide}>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <h5 className="text-center text-uppercase font-weight-bold">
            Add new sermon
          </h5>
          <div className="form-group">
            <label>Topic</label>
            <input
              type="text"
              name="topic"
              value={info.topic}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>Video Link</label>
            <input
              type="text"
              name="videoUrl"
              value={info.videoUrl}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>Audio Link</label>
            <input
              type="text"
              name="audioUrl"
              value={info.audioUrl}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Scriptural references</label>
            <input
              type="text"
              name="scriptures"
              value={info.scriptures}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Author</label>
            {view === 0 ? (
              <select
                className="form-control"
                name="author"
                value={info.author}
                onChange={handleChange}
              >
                <option>{info.author}</option>
                {preachers.map((pastor, i) => (
                  <option key={i}>{pastor}</option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={info.author}
                name="author"
                onChange={handleChange}
                className="form-control"
              />
            )}
          </div>
          <div className="form-group">
            <label>Sermon date</label>
            <input
              type="date"
              name="preachedOn"
              value={info.preachedOn}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Excerpt</label>
            <ReactMde
              name="respondent"
              value={excerpt}
              onChange={setExcerpt}
              toolbarCommands={[]}
            />
          </div>
          <div className="form-group">
            <label>Body</label>
            <ReactMde
              name="respondent"
              value={body}
              onChange={setBody}
              selectedTab={selectedTab}
              onTabChange={setSelectedTab}
              generateMarkdownPreview={(markdown) =>
                Promise.resolve(converter.makeHtml(markdown))
              }
            />
          </div>
          <div className="text-center">
            <button className="btn btn-warning" disabled={loading}>
              {loading ? "Adding sermon" : "Add Sermon"}
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

UpdateSermonModal.propTypes = {
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  sermon: PropTypes.object,
  show: PropTypes.bool,
  onHide: PropTypes.func,
};
