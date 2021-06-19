import { gql } from "apollo-boost";

export const GET_POPUP_ALL = gql`
  query getPopupAll {
    getPopupAll {
      _id
      title
      thumbnailPath
    }
  }
`;
