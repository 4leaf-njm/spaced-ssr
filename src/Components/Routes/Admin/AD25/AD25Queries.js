import { gql } from "apollo-boost";

export const REGISTER_POPUP = gql`
  mutation registerPopup($title: String!, $thumbnailPath: String!) {
    registerPopup(title: $title, thumbnailPath: $thumbnailPath)
  }
`;
