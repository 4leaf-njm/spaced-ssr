import { gql } from "apollo-boost";

export const CREATE_SNS = gql`
  mutation createSns($platform: String!, $url: String!) {
    createSns(platform: $platform, url: $url)
  }
`;

export const GET_ALL_SNS = gql`
  query getAllSns {
    getAllSns {
      _id
      platform
      url
    }
  }
`;

export const UPDATE_SNS = gql`
  mutation updateSns($id: String!, $platform: String!, $url: String!) {
    updateSns(id: $id, platform: $platform, url: $url)
  }
`;

export const DELETE_SNS = gql`
  mutation deleteSns($id: String!) {
    deleteSns(id: $id)
  }
`;
