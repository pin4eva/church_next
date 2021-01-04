"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sermonResolver_1 = __importDefault(require("./sermonResolver"));
var userResolver_1 = __importDefault(require("./userResolver"));
exports.default = {
    Query: __assign(__assign({}, userResolver_1.default.Query), sermonResolver_1.default.Query),
    Mutation: __assign(__assign({}, userResolver_1.default.Mutation), sermonResolver_1.default.Mutation),
    Subscription: __assign({}, userResolver_1.default.Subscription),
};
