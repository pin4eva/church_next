import { gql } from "@apollo/client";

export const SERMON_FRAGMENT = gql`
  fragment SermonFragment on Sermon {
    _id
    topic
    videoUrl
    audioUrl
    scriptures
    excerpt
    body
    author
    preachedOn
    slug
  }
`;

export const GET_SERMONS = gql`
  query {
    getSermons {
      ...SermonFragment
    }
  }
  ${SERMON_FRAGMENT}
`;

export const GET_SERMON = gql`
  query($slug: String) {
    getSermon(slug: $slug) {
      ...SermonFragment
    }
  }
  ${SERMON_FRAGMENT}
`;

export const CREATE_SERMON = gql`
  mutation CreateSermon($input: SermonInput) {
    createSermon(input: $input) {
      ...SermonFragment
    }
  }
  ${SERMON_FRAGMENT}
`;

export const UPDATE_SERMON = gql`
  mutation UpdateSermon($input: SermonInput) {
    updateSermon(input: $input) {
      ...SermonFragment
    }
  }
  ${SERMON_FRAGMENT}
`;

export const DELETE_SERMON = gql`
  mutation($_id: ID) {
    deleteSermon(_id: $_id) {
      _id
      topic
    }
  }
`;
