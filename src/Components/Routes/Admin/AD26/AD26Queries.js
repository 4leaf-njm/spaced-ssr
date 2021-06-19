import { gql } from "apollo-boost";

export const GET_MOBILEMAINBANNER = gql`
  query getMobileMainBanner($searchName: String!) {
    getMobileMainBanner(searchName: $searchName) {
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

export const DELETE_MOBILEMAINBANNER = gql`
  mutation deleteMobileMainBanner($id: String!) {
    deleteMobileMainBanner(id: $id)
  }
`;
