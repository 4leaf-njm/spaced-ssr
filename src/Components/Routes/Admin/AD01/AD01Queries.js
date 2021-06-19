import { gql } from "apollo-boost";

export const GET_ACEEPTRECORD = gql`
  query getAcceptRecord($currentYear: String!) {
    getAcceptRecord(currentYear: $currentYear) {
      _id
      date
    }
  }
`;

export const GET_ACEEPTRECORD_BY_MONTH = gql`
  query getAcceptRecordByMonth($currentMonth: String!) {
    getAcceptRecordByMonth(currentMonth: $currentMonth) {
      _id
      date
    }
  }
`;

export const GET_ACEEPTRECORD_BY_DATE = gql`
  query getAcceptRecordByDate($currentDate: String!) {
    getAcceptRecordByDate(currentDate: $currentDate) {
      _id
      date
    }
  }
`;

export const GET_ACCEPTRECORD_ALL_YEAR = gql`
  query getAcceptRecordAllYear($year: String!) {
    getAcceptRecordAllYear(year: $year) {
      date
    }
  }
`;
