import { gql } from "apollo-boost";

export const GET_FAQTYPE = gql`
  query getFaqType {
    getFaqType {
      _id
      typeName
    }
  }
`;

// export const GET_FAQ = gql`
//   query getFaqDetail($typeName: String!) {
//     getFaqDetail(typeName: $typeName) {
//       _id
//       sort
//       type
//       question
//       answer
//     }
//   }
// `;

export const GET_FAQ = gql`
  query getFaqDetail(
    $typeName: String!
    $searchValue: String!
    $limit: Int!
    $currentPage: Int!
  ) {
    getFaqDetail(
      typeName: $typeName
      searchValue: $searchValue
      limit: $limit
      currentPage: $currentPage
    ) {
      _id
      sort
      type
      question
      answer
    }
  }
`;

export const GET_FAQ_TOTALPAGE = gql`
  query getFaqTotalPage(
    $typeName: String!
    $searchValue: String!
    $limit: Int!
  ) {
    getFaqTotalPage(
      typeName: $typeName
      searchValue: $searchValue
      limit: $limit
    )
  }
`;
