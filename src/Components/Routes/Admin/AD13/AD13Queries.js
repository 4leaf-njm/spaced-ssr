import { gql } from "apollo-boost";

export const GET_USERS_BY_EXIT = gql`
  query getUsersByExit($searchValue: String!) {
    getUsersByExit(searchValue: $searchValue) {
      _id
      userId
      userPassword
      username
      zoneCode
      address
      detailAddress
      tel
      mobile
      email
      exitedAt
      isAgreement1
      isAgreement2
    }
  }
`;
