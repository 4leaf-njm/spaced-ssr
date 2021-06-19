import { gql } from "apollo-boost";

export const GET_EVENTBOARD = gql`
  query getEventBoard {
    getEventBoard {
      _id
      title
      eventTerm
      description
      thumbnail
      createdAt
      isDelete
      deletedAt
      hit
    }
  }
`;

export const CREATE_EVENTBOARD = gql`
  mutation createEventBoard(
    $thumbnail: String!
    $title: String!
    $description: String!
    $eventTerm: String!
  ) {
    createEventBoard(
      thumbnail: $thumbnail
      title: $title
      description: $description
      eventTerm: $eventTerm
    )
  }
`;
