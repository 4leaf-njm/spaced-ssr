import { gql } from "apollo-boost";

export const GET_MAINBANNER_ONE = gql`
  query getMainBannerOne($id: String!) {
    getMainBannerOne(id: $id) {
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

export const MODIFY_MAINBANNER = gql`
  mutation modifyMainBanner(
    $id: String!
    $title: String!
    $link: String!
    $desc: String!
    $thumbnail: String!
  ) {
    modifyMainBanner(
      id: $id
      title: $title
      link: $link
      desc: $desc
      thumbnail: $thumbnail
    )
  }
`;
