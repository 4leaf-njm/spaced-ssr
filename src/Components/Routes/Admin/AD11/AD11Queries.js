import { gql } from "apollo-boost";

export const GET_ALL_BUSER = gql`
  query getAllBUser($searchName: String!) {
    getAllBUser(searchName: $searchName) {
      _id
      userId
      userPassword
      username
      b_name
      b_number
      b_chief
      b_asignment
      zoneCode
      address
      detailAddress
      tel
      mobile
      email
      secretCode
      createdAt
      updatedAt
      isDelete
      deletedAt
      isExit
      exitedAt
      isBlack
      blackAt
      isAgreement1
      isAgreement2
      isAgreement3
      isAgreement4
    }
  }
`;

export const MODIFY_EXIT_BUSER = gql`
  mutation modifyExitBUser($id: String!) {
    modifyExitBUser(id: $id)
  }
`;

export const MODIFY_BLACK_BUSER = gql`
  mutation modifyBlackBUser($id: String!) {
    modifyBlackBUser(id: $id)
  }
`;

export const MODIFY_ASSIGNMENT_BUSER = gql`
  mutation modifyAssignMentBUser($id: String!) {
    modifyAssignMentBUser(id: $id)
  }
`;
