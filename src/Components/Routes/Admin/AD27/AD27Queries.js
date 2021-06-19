import { gql } from "apollo-boost";

export const GET_MOBILEMAINBANNER_ONE = gql`
  query getMobileMainBannerOne($id: String!) {
    getMobileMainBannerOne(id: $id) {
      _id
      title
      link
      thumbnailPath
      description
      isDelete
      createdAt
      deletedAt
      updatedAt
    }
  }
`;

export const MODIFY_MOBILEMAINBANNER = gql`
  mutation modifyMobileMainBanner(
    $id: String!
    $title: String!
    $link: String!
    $desc: String!
    $thumbnail: String!
  ) {
    modifyMobileMainBanner(
      id: $id
      title: $title
      link: $link
      desc: $desc
      thumbnail: $thumbnail
    )
  }
`;
