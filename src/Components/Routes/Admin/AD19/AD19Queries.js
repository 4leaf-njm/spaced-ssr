import { gql } from "apollo-boost";

export const GET_DIRECTREQUEST = gql`
  query getDirectRequest($isComplete: Boolean!) {
    getDirectRequest(isComplete: $isComplete) {
      _id
      name
      email
      memo
      mobile
      description
      isComplete
      createdAt
      completedAt
    }
  }
`;

export const MODIFY_DIRECTREQUEST_COMPLETE = gql`
  mutation modifyDirectRequestComplete($id: String!, $memo: String!) {
    modifyDirectRequestComplete(id: $id, memo: $memo)
  }
`;
