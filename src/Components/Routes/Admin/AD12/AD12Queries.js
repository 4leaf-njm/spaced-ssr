import { gql } from "apollo-boost";

export const GET_USERRIGHT = gql`
  query getUserRight {
    getUserRight {
      _id
      rightName
      isAdminLogin
      sort
    }
  }
`;

export const MODIFY_RIGHT = gql`
  mutation modifyRight(
    $id: String!
    $rightName: String!
    $isAdminLogin: Boolean!
  ) {
    modifyRight(id: $id, rightName: $rightName, isAdminLogin: $isAdminLogin)
  }
`;

export const RIGHT_SORT_CHANGE = gql`
  mutation rightSortChange($id: String!, $sort: Int!) {
    rightSortChange(id: $id, sort: $sort)
  }
`;

export const DELETE_USERRIGHT = gql`
  mutation deleteUserRight($id: String!) {
    deleteUserRight(id: $id)
  }
`;

export const CREATE_USERRIGHT = gql`
  mutation createUserRight(
    $rightName: String!
    $isAdminLogin: Boolean!
    $sort: Int!
  ) {
    createUserRight(
      rightName: $rightName
      isAdminLogin: $isAdminLogin
      sort: $sort
    )
  }
`;

export const GET_DEFAULTUSERRIGHT = gql`
  query getDefaultUserRight {
    getDefaultUserRight {
      _id
      rightKey {
        rightName
      }
    }
  }
`;

export const MODIFY_DEFAULTUSERRIGHT = gql`
  mutation modifyDefaultUserRight($id: String!, $rightId: String!) {
    modifyDefaultUserRight(id: $id, rightId: $rightId)
  }
`;
