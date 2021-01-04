import Sermon, { SermonI } from "../../models/Sermon";

export default {
  Query: {
    getSermons: async (): Promise<SermonI[]> => {
      try {
        const sermons = await Sermon.find().sort({ createdAt: -1 });
        return sermons;
      } catch (error) {
        throw new Error(error);
      }
    },
    getSermon: async (_, { slug }): Promise<SermonI> => {
      try {
        const sermon = await Sermon.findOne({ slug });

        return sermon;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    createSermon: async (_, { input }): Promise<SermonI> => {
      try {
        const sermon = await Sermon.create(input);
        return sermon;
      } catch (error) {
        throw new Error(error);
      }
    },
    updateSermon: async (_, { input }): Promise<SermonI> => {
      try {
        const sermon = await Sermon.findOneAndUpdate(
          { _id: input._id },
          { ...input },
          { new: true }
        );
        return sermon;
      } catch (error) {
        throw new Error(error);
      }
    },
    deleteSermon: async (_, { _id }): Promise<SermonI> => {
      try {
        const sermon = await Sermon.findOne({ _id });
        if (sermon) sermon.remove();
        return sermon;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
