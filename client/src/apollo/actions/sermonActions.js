import { initializeApollo } from "../index";

import { GET_SERMON } from "../queries/sermonQuery";

export const getSermon = async (slug) => {
  const apollo = initializeApollo();

  let { data } = await apollo.query({
    query: GET_SERMON,
    variables: { slug },
  });

  data = data?.getSermon;
  data = {
    ...data,
    _id: data._id.toString(),
  };

  return data || {};
};
