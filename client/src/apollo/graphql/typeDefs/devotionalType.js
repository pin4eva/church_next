import { gql } from "apollo-server-micro";

export const DevotionalTypes = gql`
  type Devotional {
    _id: ID
    name: String
    preachedOn: Date
    author: String
    videoUrl: String
    excerpt: String
    body: String
  }

  extend type Query {
    getDevotionals: [Devotional]
    getDevotional(_id: ID): Devotional
  }

  extend type Mutation {
    createDevotional(input: DevotionalInput): Devotional
    updateDevotional(input: DevotionalInput): Devotional
    deleteDevotional(_id: ID): Devotional
  }

  input DevotionalInput {
    _id: ID
    name: String
    preachedOn: Date
    author: String
    videoUrl: String
    excerpt: String
    body: String
  }
`;
