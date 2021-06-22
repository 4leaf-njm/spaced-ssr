import { gql } from "apollo-boost";

export const GET_NEWS_DATA = gql`
  query getNewsData($isRequest: Boolean!) {
    getNewsData(isRequest: $isRequest) {
      title
    }
  }
`;

export const GET_FINEDUST_DATA = gql`
  query getFineDustData($lat: String!, $lon: String!) {
    getFineDustData(lat: $lat, lon: $lon) {
      pm10Value
      pm25Value
      pm10Grade
      pm25Grade
    }
  }
`;
