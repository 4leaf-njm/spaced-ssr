import { gql } from "apollo-boost";

export const GET_NEWS_DATA = gql`
  query getNewsData($isRequest: Boolean!) {
    getNewsData(isRequest: $isRequest) {
      title
    }
  }
`;
