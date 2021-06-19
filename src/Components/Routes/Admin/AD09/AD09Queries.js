import { gql } from "apollo-boost";

export const GET_EVENTBOARD_LIST = gql`
  query getEventBoardList {
    getEventBoardList {
      _id
      title
      createdAt
      thumbnail
      eventTerm
      description
      isDelete
      deletedAt
      hit
    }
  }
`;

export const MODIFY_EVENTBOARD = gql`
  mutation modifyEventBoard($id: String!, $description: String!) {
    modifyEventBoard(id: $id, description: $description)
  }
`;

export const MODIFY_EVENTBOARD_BASIC = gql`
  mutation modifyEventBoardBasic(
    $id: String!
    $title: String!
    $eventTerm: String!
    $thumbnail: String!
  ) {
    modifyEventBoardBasic(
      id: $id
      title: $title
      eventTerm: $eventTerm
      thumbnail: $thumbnail
    )
  }
`;

export const DELETE_EVNET = gql`
  mutation deleteEvent($id: String!) {
    deleteEvent(id: $id)
  }
`;
