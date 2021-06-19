import { gql } from "apollo-boost";

export const GET_BOARDTYPE = gql`
  query getBoardType {
    getBoardType {
      _id
      title
      type
      isDelete
      deletedAt
    }
  }
`;

export const CREATE_BOARDTYPE = gql`
  mutation createBoardType($title: String!, $type: String!) {
    createBoardType(title: $title, type: $type)
  }
`;

export const UPDATE_BOARDTYPE = gql`
  mutation updateBoardType($id: String!, $title: String!, $type: String!) {
    updateBoardType(id: $id, title: $title, type: $type)
  }
`;

export const DELETE_BOARDTYPE = gql`
  mutation deleteBoardType($id: String!) {
    deleteBoardType(id: $id)
  }
`;
