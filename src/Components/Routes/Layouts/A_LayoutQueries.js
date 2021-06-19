import { gql } from "apollo-boost";

export const GET_USER_LOGIN_RESULT_FOR_ADMIN = gql`
  query getUserLoginResultForAdmin($userId: String!, $userPassword: String!) {
    getUserLoginResultForAdmin(userId: $userId, userPassword: $userPassword)
  }
`;
