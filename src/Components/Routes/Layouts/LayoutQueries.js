import { gql } from "apollo-boost";

export const GET_ALL_FOOTER_INFO = gql`
  query getAllFooterInfo {
    getAllFooterInfo {
      _id
      title
      content
    }
  }
`;
