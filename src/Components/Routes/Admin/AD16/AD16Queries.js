import { gql } from "apollo-boost";

export const GET_BUSERS_BY_BLACK = gql`
  query getBUsersByBlack($searchValue: String!) {
    getBUsersByBlack(searchValue: $searchValue) {
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
export const EXIT_BUSER = gql`
  mutation exitBUser($id: String!) {
    exitBUser(id: $id)
  }
`;

export const BLACK_BUSER = gql`
  mutation blackBUser($id: String!) {
    blackBUser(id: $id)
  }
`;

export const CANCEL_BLACK_BUSER = gql`
  mutation cancelblackBUser($id: String!) {
    cancelblackBUser(id: $id)
  }
`;
