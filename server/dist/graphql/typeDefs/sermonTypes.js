"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SermonTypes = void 0;
var apollo_server_express_1 = require("apollo-server-express");
exports.SermonTypes = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Sermon {\n    _id: ID\n    topic: String\n    preachedOn: Date\n    author: String\n    videoUrl: String\n    audioUrl: String\n    scriptures: String\n    excerpt: String\n    body: String\n    slug: String\n  }\n\n  extend type Query {\n    getSermons: [Sermon]\n    getSermon(slug: String): Sermon\n  }\n\n  extend type Mutation {\n    createSermon(input: SermonInput): Sermon\n    updateSermon(input: SermonInput): Sermon\n    deleteSermon(_id: ID): Sermon\n  }\n\n  input SermonInput {\n    _id: ID\n    topic: String!\n    preachedOn: Date\n    author: String!\n    videoUrl: String!\n    excerpt: String!\n    body: String!\n    audioUrl: String\n    scriptures: String\n    slug: String\n  }\n"], ["\n  type Sermon {\n    _id: ID\n    topic: String\n    preachedOn: Date\n    author: String\n    videoUrl: String\n    audioUrl: String\n    scriptures: String\n    excerpt: String\n    body: String\n    slug: String\n  }\n\n  extend type Query {\n    getSermons: [Sermon]\n    getSermon(slug: String): Sermon\n  }\n\n  extend type Mutation {\n    createSermon(input: SermonInput): Sermon\n    updateSermon(input: SermonInput): Sermon\n    deleteSermon(_id: ID): Sermon\n  }\n\n  input SermonInput {\n    _id: ID\n    topic: String!\n    preachedOn: Date\n    author: String!\n    videoUrl: String!\n    excerpt: String!\n    body: String!\n    audioUrl: String\n    scriptures: String\n    slug: String\n  }\n"])));
var templateObject_1;
