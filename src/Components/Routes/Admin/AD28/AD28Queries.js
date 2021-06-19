import { gql } from "apollo-boost";

export const REGISTER_MOBILEMAINBANNER = gql`
  mutation registerMobileMainBanner(
    $title: String!
    $link: String!
    $thumbnailPath: String!
    $description: String!
  ) {
    registerMobileMainBanner(
      title: $title
      link: $link
      thumbnailPath: $thumbnailPath
      description: $description
    )
  }
`;
