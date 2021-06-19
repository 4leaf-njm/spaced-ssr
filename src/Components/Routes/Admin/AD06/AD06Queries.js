import { gql } from "apollo-boost";

export const GET_NOTICEBOARD = gql`
  query getNoticeBoard(
    $searchValue: String!
    $limit: Int!
    $currentPage: Int!
  ) {
    getNoticeBoard(
      searchValue: $searchValue
      limit: $limit
      currentPage: $currentPage
    ) {
      _id
      type
      title
      createdAt
      isDelete
      description
      deletedAt
    }
  }
`;

export const GET_NOTICEBOARD_TOTALPAGE = gql`
  query getNoticeBoardTotalPage($searchValue: String!, $limit: Int!) {
    getNoticeBoardTotalPage(searchValue: $searchValue, limit: $limit)
  }
`;

export const GET_NOTICEBOARD_TOTALPAGE_ONLY_CNT = gql`
  query getNoticeBoardTotalPageOnlyCnt($searchValue: String!, $limit: Int!) {
    getNoticeBoardTotalPageOnlyCnt(searchValue: $searchValue, limit: $limit)
  }
`;

export const DELETE_NOTICEBOARD = gql`
  mutation deleteNoticeBoard($id: String!) {
    deleteNoticeBoard(id: $id)
  }
`;

export const CREATE_NOTICEBOARD = gql`
  mutation createNoticeBoard(
    $title: String!
    $type: String!
    $description: String!
  ) {
    createNoticeBoard(title: $title, type: $type, description: $description)
  }
`;

export const MOODIFY_NOTICEBOARD = gql`
  mutation modifyNoticeBoard(
    $id: String!
    $title: String!
    $description: String!
  ) {
    modifyNoticeBoard(id: $id, title: $title, description: $description)
  }
`;
