import { gql } from "apollo-boost";

export const GET_USERS_BY_BLACK = gql`
  query getUsersByBlack($searchValue: String!) {
    getUsersByBlack(searchValue: $searchValue) {
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
      blackAt
      isAgreement1
      isAgreement2
    }
  }
`;
export const EXIT_USER = gql`
  mutation exitUser($id: String!) {
    exitUser(id: $id)
  }
`;

export const BLACK_USER = gql`
  mutation blackBUser($id: String!) {
    blackUser(id: $id)
  }
`;

export const CANCEL_BLACK_USER = gql`
  mutation cancelblackUser($id: String!) {
    cancelblackUser(id: $id)
  }
`;
