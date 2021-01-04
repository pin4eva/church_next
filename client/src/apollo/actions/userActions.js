import { AUTH } from "apollo/queries/userQuery";
import { initializeApollo } from "../index";

export const getAuth = async (token) => {
  const apollo = initializeApollo(null, token);

  try {
    let { data } = await apollo.query({
      query: AUTH,
    });
    return data.auth;
  } catch (error) {
    console.log(error);
    if (error?.graphQLErrors.length) {
      if (error?.graphQLErrors[0].message === "invalid signature") {
        console.log("Invalid token");
      }
    }
    return;
  }
};
