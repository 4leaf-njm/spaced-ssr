import { gql } from "apollo-boost";

export const GET_ALL_FOOTER_INFO = gql`
  query getAllFooterInfo {
    getAllFooterInfo {
      _id
      title
      content
    }
  }
`;

export const CREATE_FOOTERLIST = gql`
  mutation createFooterList($title: String!, $content: String!) {
    createFooterList(title: $title, content: $content)
  }
`;

export const DELETE_FOOTERLIST = gql`
  mutation deleteFooterList($id: String!) {
    deleteFooterList(id: $id)
  }
`;

export const UPDATE_FOOTERLIST = gql`
  mutation updateFooterList($id: String!, $title: String!, $content: String!) {
    updateFooterList(id: $id, title: $title, content: $content)
  }
`;
