"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevotionalTypes = void 0;
var apollo_server_express_1 = require("apollo-server-express");
exports.DevotionalTypes = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Devotional {\n    _id: ID\n    name: String\n    preachedOn: Date\n    author: String\n    videoUrl: String\n    excerpt: String\n    body: String\n  }\n\n  extend type Query {\n    getDevotionals: [Devotional]\n    getDevotional(_id: ID): Devotional\n  }\n\n  extend type Mutation {\n    createDevotional(input: DevotionalInput): Devotional\n    updateDevotional(input: DevotionalInput): Devotional\n    deleteDevotional(_id: ID): Devotional\n  }\n\n  input DevotionalInput {\n    _id: ID\n    name: String\n    preachedOn: Date\n    author: String\n    videoUrl: String\n    excerpt: String\n    body: String\n  }\n"], ["\n  type Devotional {\n    _id: ID\n    name: String\n    preachedOn: Date\n    author: String\n    videoUrl: String\n    excerpt: String\n    body: String\n  }\n\n  extend type Query {\n    getDevotionals: [Devotional]\n    getDevotional(_id: ID): Devotional\n  }\n\n  extend type Mutation {\n    createDevotional(input: DevotionalInput): Devotional\n    updateDevotional(input: DevotionalInput): Devotional\n    deleteDevotional(_id: ID): Devotional\n  }\n\n  input DevotionalInput {\n    _id: ID\n    name: String\n    preachedOn: Date\n    author: String\n    videoUrl: String\n    excerpt: String\n    body: String\n  }\n"])));
var templateObject_1;
