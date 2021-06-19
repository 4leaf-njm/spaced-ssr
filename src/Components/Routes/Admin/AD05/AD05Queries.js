import { gql } from "apollo-boost";

export const GET_NOTICEBOARD_TYPE = gql`
  query getNoticeBoardType {
    getNoticeBoardType {
      _id
      typeName
    }
  }
`;

export const CREATE_NOTICEBOARD_TYPE = gql`
  mutation createNoticeBoardType($value: String!) {
    createNoticeBoardType(value: $value)
  }
`;

export const DELETE_NOTICEBOARD_TYPE = gql`
  mutation deleteNoticeBoardType($id: String!) {
    deleteNoticeBoardType(id: $id)
  }
`;
