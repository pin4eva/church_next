import User from "apollo/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "apollo/config";
import crypto from "crypto";
import { authentication } from "apollo/authentication";

import sgMail from "@sendgrid/mail";
import { nanoid } from "nanoid";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * TODO:
 *
 * 1. [*] Forgot password
 * 2. [*] Change password
 * 3. [*] Email confirmation
 * 4. [] User role and permission
 * 5. [] Upload profile picture
 * 6. [] Change email service
 */

const templates = {
  email_confirmation: "d-a01f0e1906d74fc6bebe6ba10af98642",
};

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://jointheirs-server-724077.us1.kinto.io"
    : "http://localhost:8000";

export default {
  Query: {
    getUsers: async () => {
      // await authentication(token);

      try {
        let users = await User.find();

        return users;
      } catch (error) {
        throw new Error(error);
      }
    },

    me: async (_, { token }) => {
      // if (!token) return null;
      try {
        const data = await jwt.verify(token, config.SECRET);
        const user = await User.findOne({ _id: data._id }, { password: 0 });
        return user;
      } catch (error) {
        throw new Error(error);
      }
    },
    auth: async (_, args, { token }) => {
      if (!token) return null;
      const user = await authentication(token);
      try {
        if (!user) return null;
        return user;
      } catch (error) {
        throw new Error(error);
      }
    },
    getUser: async (_, { _id }, { token }) => {
      await authentication(token);
      try {
        const user = await User.findOne({ _id });
        return user;
      } catch (error) {
        throw new Error(error);
      }
    },
  },

  Mutation: {
    signup: async (_, { input }) => {
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
    login: async (_, { email, password }, { res }) => {
      if (!email || !password) throw new Error("Fill the email and password");
      let user = await User.findOne({ email });
      if (!user) throw new Error("No record found");
      let isMatch = await bcrypt.compareSync(password, user.password);
      if (!isMatch) throw Error("Incorrect password");
      let payload = {
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

        return { user, token };
      } catch (error) {
        throw new Error(error);
      }
    },
    verify: async (_, { token }) => {
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
    checkEmail: async (_, { email }) => {
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
    forgotPassword: async (_, { token, password }) => {
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
    changePassword: async (_, { password }, { token }) => {
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

    deleteUser: async (_, { _id }) => {
      try {
        let user = await User.findOne({ _id });
        if (!user) throw new Error("No record found");

        user.remove();
        return user;
      } catch (error) {
        throw new Error(error);
      }
    },
    updateUser: async (_, { input }) => {
      if (!input) throw Error("NO data sent");
      try {
        let user = await User.findOneAndUpdate({ _id: input._id }, input, {
          new: true,
        });

        return user;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
