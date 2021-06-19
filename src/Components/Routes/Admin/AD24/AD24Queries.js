import { gql } from "apollo-boost";

export const GET_POPUP_ONE = gql`
  query getPopupOne($id: String!) {
    getPopupOne(id: $id) {
      _id
      title
      thumbnailPath
      isDelete
      createdAt
      deletedAt
      updatedAt
    }
  }
`;

export const MODIFY_POPUP = gql`
  mutation modifyPopup($id: String!, $title: String!, $thumbnail: String!) {
    modifyPopup(id: $id, title: $title, thumbnail: $thumbnail)
  }
`;
