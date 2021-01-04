"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var crypto_1 = __importDefault(require("crypto"));
var config_1 = __importDefault(require("../../utils/config"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var User_1 = __importDefault(require("../../models/User"));
var nanoid_1 = require("nanoid");
var mail_1 = __importDefault(require("@sendgrid/mail"));
var authentication_1 = require("../../utils/authentication");
var __1 = require("../..");
mail_1.default.setApiKey(process.env.SENDGRID_API_KEY);
var LOGGED_IN = "LOGGED_IN";
var templates = {
    email_confirmation: "d-a01f0e1906d74fc6bebe6ba10af98642",
};
var BASE_URL = process.env.NODE_ENV === "production"
    ? "https://jointheirs-server-724077.us1.kinto.io"
    : "http://localhost:8000";
exports.default = {
    Query: {
        getUsers: function () { return __awaiter(void 0, void 0, void 0, function () {
            var users, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, User_1.default.find()];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, users];
                    case 2:
                        error_1 = _a.sent();
                        throw new Error(error_1);
                    case 3: return [2 /*return*/];
                }
            });
        }); },
    },
    Mutation: {
        signup: function (_, _a) {
            var input = _a.input;
            return __awaiter(void 0, void 0, void 0, function () {
                var email, password, username, firstName, lastName, user, info, mailOptions, data, error_2;
                var _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            email = input.email, password = input.password, username = input.username, firstName = input.firstName, lastName = input.lastName;
                            if (!email || !password)
                                throw new Error("Fill all input");
                            return [4 /*yield*/, User_1.default.findOne({ email: email })];
                        case 1:
                            user = _c.sent();
                            // user = await User.findOne({ username });
                            if (user)
                                throw new Error("User with same email or username already exist");
                            _c.label = 2;
                        case 2:
                            _c.trys.push([2, 7, , 8]);
                            _b = {
                                username: username,
                                email: email,
                                name: firstName + " " + lastName
                            };
                            return [4 /*yield*/, bcryptjs_1.default.hash(password, 10)];
                        case 3:
                            info = (_b.password = _c.sent(),
                                _b.firstName = firstName,
                                _b.lastName = lastName,
                                _b.token = nanoid_1.nanoid(4),
                                _b);
                            mailOptions = {
                                from: "info@jointheirsng.org",
                                to: info.email,
                                subject: "Please confirm your email",
                                // html: `<h2 align="center">Thank you for registering with Joint Heirs Assembly</h2> <p>Please <a href="${BASE_URL}/verify/${info.token}">verify</a> your account to gain access to our platform</p> <p> or</> <p style="text-align:center;"> copy your verification code <b >${info.token}</b></p>`,
                                templateId: templates.email_confirmation,
                                dynamic_template_data: {
                                    verification_url: BASE_URL + "/verify/" + info.token,
                                    name: info.firstName,
                                },
                            };
                            return [4 /*yield*/, mail_1.default.send(mailOptions)];
                        case 4:
                            data = _c.sent();
                            if (!data) return [3 /*break*/, 6];
                            return [4 /*yield*/, User_1.default.create(info)];
                        case 5:
                            user = _c.sent();
                            _c.label = 6;
                        case 6: return [2 /*return*/, user];
                        case 7:
                            error_2 = _c.sent();
                            throw new Error(error_2);
                        case 8: return [2 /*return*/];
                    }
                });
            });
        },
        login: function (_, _a, _b) {
            var email = _a.email, password = _a.password;
            var res = _b.res;
            return __awaiter(void 0, void 0, void 0, function () {
                var user, isMatch, payload, token, error_3;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!email || !password)
                                throw new Error("Fill the email and password");
                            return [4 /*yield*/, User_1.default.findOne({ email: email })];
                        case 1:
                            user = _c.sent();
                            if (!user)
                                throw new Error("No record found");
                            isMatch = bcryptjs_1.default.compareSync(password, user.password);
                            if (!isMatch)
                                throw Error("Incorrect password");
                            payload = {
                                _id: user._id,
                            };
                            if (!user.isActive) {
                                throw new Error("Your account is pending activation");
                            }
                            _c.label = 2;
                        case 2:
                            _c.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, jsonwebtoken_1.default.sign(payload, config_1.default.SECRET, {
                                    expiresIn: "1d",
                                })];
                        case 3:
                            token = _c.sent();
                            if (!user.token) {
                                res.cookie("token", token, {
                                    expires: new Date(Date.now() + 8 * 360000),
                                    httpOnly: process.env.NODE_ENV === " production " ? true : false,
                                    secure: process.env.NODE_ENV === " production " ? true : false,
                                });
                            }
                            __1.pubSub.publish(LOGGED_IN, { user: user });
                            return [2 /*return*/, {
                                    user: user,
                                    token: token,
                                }];
                        case 4:
                            error_3 = _c.sent();
                            throw new Error(error_3);
                        case 5: return [2 /*return*/];
                    }
                });
            });
        },
        verify: function (_, _a) {
            var token = _a.token;
            return __awaiter(void 0, void 0, void 0, function () {
                var user, error_4;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, User_1.default.findOne({ token: token })];
                        case 1:
                            user = _b.sent();
                            if (!user) {
                                throw new Error("Invalid token");
                            }
                            _b.label = 2;
                        case 2:
                            _b.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, User_1.default.findOneAndUpdate({ token: token }, { $set: { token: "" } }, { new: true })];
                        case 3:
                            user = _b.sent();
                            return [2 /*return*/, user];
                        case 4:
                            error_4 = _b.sent();
                            throw new Error(error_4);
                        case 5: return [2 /*return*/];
                    }
                });
            });
        },
        checkEmail: function (_, _a) {
            var email = _a.email;
            return __awaiter(void 0, void 0, void 0, function () {
                var user, error_5;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, User_1.default.findOne({ email: email })];
                        case 1:
                            user = _b.sent();
                            if (!user)
                                throw new Error("Unknown email");
                            _b.label = 2;
                        case 2:
                            _b.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, User_1.default.findOneAndUpdate({ _id: user._id }, { $set: { token: crypto_1.default.randomBytes(64).toString("hex") } }, { new: true })];
                        case 3:
                            user = _b.sent();
                            return [2 /*return*/, user];
                        case 4:
                            error_5 = _b.sent();
                            throw new Error(error_5);
                        case 5: return [2 /*return*/];
                    }
                });
            });
        },
        forgotPassword: function (_, _a) {
            var token = _a.token, password = _a.password;
            return __awaiter(void 0, void 0, void 0, function () {
                var user, error_6;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, User_1.default.findOne({ token: token })];
                        case 1:
                            user = _b.sent();
                            if (!user)
                                throw new Error("Invalid or expired token");
                            _b.label = 2;
                        case 2:
                            _b.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, User_1.default.findOneAndUpdate({ token: token }, {
                                    token: "",
                                    password: bcryptjs_1.default.hashSync(password, 10),
                                }, { new: true })];
                        case 3:
                            user = _b.sent();
                            return [2 /*return*/, user];
                        case 4:
                            error_6 = _b.sent();
                            throw new Error(error_6);
                        case 5: return [2 /*return*/];
                    }
                });
            });
        },
        changePassword: function (_, _a, context) {
            var password = _a.password;
            return __awaiter(void 0, void 0, void 0, function () {
                var token, user, error_7;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            token = context.token;
                            return [4 /*yield*/, authentication_1.authentication(token)];
                        case 1:
                            user = _b.sent();
                            _b.label = 2;
                        case 2:
                            _b.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, User_1.default.findOneAndUpdate({ _id: user._id }, {
                                    password: bcryptjs_1.default.hashSync(password, 10),
                                }, { new: true })];
                        case 3:
                            user = _b.sent();
                            return [2 /*return*/, user];
                        case 4:
                            error_7 = _b.sent();
                            throw new Error(error_7);
                        case 5: return [2 /*return*/];
                    }
                });
            });
        },
        deleteUser: function (_, _a) {
            var _id = _a._id;
            return __awaiter(void 0, void 0, void 0, function () {
                var user, error_8;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, User_1.default.findOne({ _id: _id })];
                        case 1:
                            user = _b.sent();
                            if (!user)
                                throw new Error("No record found");
                            user.remove();
                            return [2 /*return*/, user];
                        case 2:
                            error_8 = _b.sent();
                            throw new Error(error_8);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        },
        updateUser: function (_, _a) {
            var input = _a.input;
            return __awaiter(void 0, void 0, void 0, function () {
                var user, error_9;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!input)
                                throw Error("NO data sent");
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, User_1.default.findOneAndUpdate({ _id: input._id }, input, {
                                    new: true,
                                })];
                        case 2:
                            user = _b.sent();
                            return [2 /*return*/, user];
                        case 3:
                            error_9 = _b.sent();
                            throw new Error(error_9);
                        case 4: return [2 /*return*/];
                    }
                });
            });
        },
    },
    Subscription: {
        loggedIn: {
            subscribe: function () { return __1.pubSub.asyncIterator(LOGGED_IN); },
        },
    },
};
