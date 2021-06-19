import { gql } from "apollo-boost";

export const GET_MAINBANNER_ALL = gql`
  query getMainBannerAll {
    getMainBannerAll {
      _id
      title
      thumbnailPath
      description
      link
    }
  }
`;

export const GET_MOBILEBANNER_ALL = gql`
  query getMobileMainBannerAll {
    getMobileMainBannerAll {
      _id
      title
      thumbnailPath
      description
      link
    }
  }
`;

export const ADD_ACCEPT_RECORD = gql`
  mutation addAcceptRecord($date: String!) {
    addAcceptRecord(date: $date)
  }
`;
