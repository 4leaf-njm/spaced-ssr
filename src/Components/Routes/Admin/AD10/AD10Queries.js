import { gql } from "apollo-boost";

export const GET_ALL_USER = gql`
  query getAllUser($searchName: String!) {
    getAllUser(searchName: $searchName) {
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
      createdAt
      updatedAt
      isDelete
      deletedAt
      isExit
      exitedAt
      isBlack
      blackAt
      right {
        rightName
      }
      isAgreement1
      isAgreement2
      isAgreement3
      isAgreement4
    }
  }
`;

export const MODIFY_EXIT_USER = gql`
  mutation modifyExitUser($id: String!) {
    modifyExitUser(id: $id)
  }
`;

export const MODIFY_BLACK_USER = gql`
  mutation modifyBlackUser($id: String!) {
    modifyBlackUser(id: $id)
  }
`;
