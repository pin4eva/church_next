import { UserI } from "../../models/User.types";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import config from "../../utils/config";
import jwt from "jsonwebtoken";
import User from "../../models/User";
import { nanoid } from "nanoid";
import sgMail from "@sendgrid/mail";
import { authentication } from "../../utils/authentication";
import { pubSub } from "../..";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const LOGGED_IN = "LOGGED_IN";

const templates = {
  email_confirmation: "d-a01f0e1906d74fc6bebe6ba10af98642",
};

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://jointheirs-server-724077.us1.kinto.io"
    : "http://localhost:8000";

export default {
  Query: {
    getUsers: async (): Promise<UserI[]> => {
      try {
        const users = await User.find();
        return users;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    signup: async (_, { input }): Promise<UserI> => {
      const { email, password, username, firstName, lastName } = input;
      if (!email || !password) throw new Error("Fill all input");
      let user = await User.findOne({ email });
      // user = await User.findOne({ username });
      if (user)
        throw new Error("User with same email or username already exist");
      try {
        const info = {
          username,
          email,
          name: `${firstName} ${lastName}`,
          password: await bcrypt.hash(password, 10),
          firstName,
          lastName,
          token: nanoid(4),
        };
        const mailOptions = {
          from: "info@jointheirsng.org",
          to: info.email,
          subject: "Please confirm your email",
          // html: `<h2 align="center">Thank you for registering with Joint Heirs Assembly</h2> <p>Please <a href="${BASE_URL}/verify/${info.token}">verify</a> your account to gain access to our platform</p> <p> or</> <p style="text-align:center;"> copy your verification code <b >${info.token}</b></p>`,
          templateId: templates.email_confirmation,
          dynamic_template_data: {
            verification_url: `${BASE_URL}/verify/${info.token}`,
            name: info.firstName,
          },
        };
        const data = await sgMail.send(mailOptions);
        if (data) {
          user = await User.create(info);
        }

        return user;
      } catch (error) {
        throw new Error(error);
      }
    },
    login: async (
      _: never,
      { email, password }: { email: string; password: string },
      { res }
    ): Promise<{ user: UserI; token: string }> => {
      if (!email || !password) throw new Error("Fill the email and password");
      const user = await User.findOne({ email });
      if (!user) throw new Error("No record found");
      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) throw Error("Incorrect password");
      const payload = {
        _id: user._id,
      };
      if (!user.isActive) {
        throw new Error("Your account is pending activation");
      }
      try {
        const token = await jwt.sign(payload, config.SECRET, {
          expiresIn: "1d",
        });

        if (!user.token) {
          res.cookie("token", token, {
            expires: new Date(Date.now() + 8 * 360000),
            httpOnly: process.env.NODE_ENV === " production " ? true : false,
            secure: process.env.NODE_ENV === " production " ? true : false,
          });
        }
        pubSub.publish(LOGGED_IN, { user });

        return {
          user,
          token,
        };
      } catch (error) {
        throw new Error(error);
      }
    },
    verify: async (_, { token }): Promise<UserI> => {
      let user = await User.findOne({ token });
      if (!user) {
        throw new Error("Invalid token");
      }
      try {
        user = await User.findOneAndUpdate(
          { token },
          { $set: { token: "" } },
          { new: true }
        );
        return user;
      } catch (error) {
        throw new Error(error);
      }
    },
    checkEmail: async (_, { email }): Promise<UserI> => {
      let user = await User.findOne({ email });
      if (!user) throw new Error("Unknown email");
      try {
        user = await User.findOneAndUpdate(
          { _id: user._id },
          { $set: { token: crypto.randomBytes(64).toString("hex") } },
          { new: true }
        );

        return user;
      } catch (error) {
        throw new Error(error);
      }
    },
    forgotPassword: async (_, { token, password }): Promise<UserI> => {
      let user = await User.findOne({ token });
      if (!user) throw new Error("Invalid or expired token");
      try {
        user = await User.findOneAndUpdate(
          { token },
          {
            token: "",
            password: bcrypt.hashSync(password, 10),
          },
          { new: true }
        );

        return user;
      } catch (error) {
        throw new Error(error);
      }
    },

    changePassword: async (_, { password }, context): Promise<UserI> => {
      const token = context.token;
      let user = await authentication(token);
      try {
        user = await User.findOneAndUpdate(
          { _id: user._id },
          {
            password: bcrypt.hashSync(password, 10),
          },
          { new: true }
        );

        return user;
      } catch (error) {
        throw new Error(error);
      }
    },
    deleteUser: async (_, { _id }): Promise<UserI> => {
      try {
        const user = await User.findOne({ _id });
        if (!user) throw new Error("No record found");

        user.remove();
        return user;
      } catch (error) {
        throw new Error(error);
      }
    },
    updateUser: async (_, { input }): Promise<UserI> => {
      if (!input) throw Error("NO data sent");
      try {
        const user = await User.findOneAndUpdate({ _id: input._id }, input, {
          new: true,
        });

        return user;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Subscription: {
    loggedIn: {
      subscribe: () => pubSub.asyncIterator(LOGGED_IN),
    },
  },
};
