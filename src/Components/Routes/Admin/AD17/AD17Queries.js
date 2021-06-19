import { gql } from "apollo-boost";

export const MODIFY_USER_CURRENT_RIGHT = gql`
  mutation modifyUserCurrentRight($userId: String!, $rightId: String!) {
    modifyUserCurrentRight(userId: $userId, rightId: $rightId)
  }
`;
