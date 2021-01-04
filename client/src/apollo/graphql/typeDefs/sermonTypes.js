import { gql } from "apollo-server-micro";

export const SermonTypes = gql`
  type Sermon {
    _id: ID
    topic: String
    preachedOn: Date
    author: String
    videoUrl: String
    audioUrl: String
    scriptures: String
    excerpt: String
    body: String
    slug: String
  }

  extend type Query {
    getSermons: [Sermon]
    getSermon(slug: String): Sermon
  }

  extend type Mutation {
    createSermon(input: SermonInput): Sermon
    updateSermon(input: SermonInput): Sermon
    deleteSermon(_id: ID): Sermon
  }

  input SermonInput {
    _id: ID
    topic: String!
    preachedOn: Date
    author: String!
    videoUrl: String!
    excerpt: String!
    body: String!
    audioUrl: String
    scriptures: String
    slug: String
  }
`;
