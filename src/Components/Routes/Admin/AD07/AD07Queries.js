import { gql } from "apollo-boost";

export const GET_FAQTYPE = gql`
  query getFaqType {
    getFaqType {
      _id
      typeName
    }
  }
`;

export const GET_FAQ = gql`
  query getFaq {
    getFaq {
      _id
      sort
      type
      question
      answer
    }
  }
`;

export const CREATE_FAQTYPE = gql`
  mutation createFaqType($typeName: String!) {
    createFaqType(typeName: $typeName)
  }
`;

export const DELETE_FAQTYPE = gql`
  mutation deleteFaqType($id: String!) {
    deleteFaqType(id: $id)
  }
`;

export const CREATE_FAQ = gql`
  mutation createFaq(
    $question: String!
    $answer: String!
    $sort: Int!
    $type: String!
  ) {
    createFaq(question: $question, answer: $answer, sort: $sort, type: $type)
  }
`;

export const DELETE_FAQ = gql`
  mutation deleteFaq($id: String!) {
    deleteFaq(id: $id)
  }
`;

export const MODIFY_FAQ = gql`
  mutation modifyFaq($id: String!, $answer: String!) {
    modifyFaq(id: $id, answer: $answer)
  }
`;
