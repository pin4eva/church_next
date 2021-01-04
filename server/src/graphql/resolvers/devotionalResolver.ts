import Devotional, { DevotionalInterface } from "../../models/Devotional";

export default {
  Query: {
    getDevotionals: async (): Promise<DevotionalInterface[]> => {
      try {
        const devotionals = await Devotional.find();
        return devotionals;
      } catch (error) {
        throw new Error(error);
      }
    },
    getDevotional: async (_, { _id }): Promise<DevotionalInterface> => {
      try {
        const devotional = await Devotional.findById(_id);
        return devotional;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    createDevotional: async (_, { input }): Promise<DevotionalInterface> => {
      try {
        const devotional = await Devotional.create(input);
        return devotional;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
