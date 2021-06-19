import { gql } from "apollo-boost";

export const GET_MAINBANNER = gql`
  query getMainBanner($searchName: String!) {
    getMainBanner(searchName: $searchName) {
      _id
      title
      thumbnailPath
      description
      link
      isDelete
      createdAt
      deletedAt
      updatedAt
    }
  }
`;

export const DELETE_MAINBANNER = gql`
  mutation deleteMainBanner($id: String!) {
    deleteMainBanner(id: $id)
  }
`;
