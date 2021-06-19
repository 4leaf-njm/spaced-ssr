import { gql } from "apollo-boost";

export const GET_NOTICEBOARD = gql`
  query getNoticeBoardClient(
    $searchValue: String!
    $limit: Int!
    $currentPage: Int!
    $sort: String!
  ) {
    getNoticeBoardClient(
      searchValue: $searchValue
      limit: $limit
      currentPage: $currentPage
      sort: $sort
    ) {
      _id
      title
      createdAt
    }
  }
`;

export const GET_NOTICEBOARD_TOTALPAGE = gql`
  query getNoticeBoardTotalPageClient($searchValue: String!, $limit: Int!) {
    getNoticeBoardTotalPageClient(searchValue: $searchValue, limit: $limit)
  }
`;

export const GET_NOTICEBOARD_TOTALPAGE_ONLY_CNT = gql`
  query getNoticeBoardTotalPageOnlyCntClient($searchValue: String!) {
    getNoticeBoardTotalPageOnlyCntClient(searchValue: $searchValue)
  }
`;

export const GET_NOTICEBOARD_TYPE = gql`
  query getNoticeBoardType {
    getNoticeBoardType {
      _id
      typeName
    }
  }
`;
