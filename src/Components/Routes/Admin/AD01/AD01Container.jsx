import React, { useEffect, useState } from "react";
import AD01Presenter from "./AD01Presenter";
import { useQuery } from "@apollo/react-hooks";
import {
  GET_ACEEPTRECORD,
  GET_ACEEPTRECORD_BY_MONTH,
  GET_ACEEPTRECORD_BY_DATE,
  GET_ACCEPTRECORD_ALL_YEAR,
} from "./AD01Queries.js";
import { toast } from "react-nextjs-toast";

export default () => {
  ////////////// - USE STATE- ///////////////
  const [currentTab, setCurrentTab] = useState(0);
  const [yearCnt, setYearCnt] = useState(null);
  const [monthCnt, setMonthCnt] = useState(null);
  const [todayCnt, setTodayCnt] = useState(null);
  const [graphDatum, setGraphDatum] = useState(null);
  const [viewGraphDatum, setViewGraphDatum] = useState(null);

  ////////////// - USE REF- ////////////////

  ////////////// - VARIABLE- ////////////////
  const currentYear = new Date().getFullYear();
  let currentMonth = new Date().getMonth() + 1;
  let currentDate = new Date().getDate();

  currentMonth = ("0" + currentMonth).slice(-2);
  currentDate = ("0" + currentDate).slice(-2);

  ////////////// - USE QUERY- ///////////////
  const { data: yearData, refetch: yearRefetch } = useQuery(GET_ACEEPTRECORD, {
    variables: {
      currentYear: `${currentYear}`,
    },
  });

  const { data: monthData, refetch: monthRefetch } = useQuery(
    GET_ACEEPTRECORD_BY_MONTH,
    {
      variables: {
        currentMonth: `${currentYear}${currentMonth}`,
      },
    }
  );

  const { data: dateData, refetch: dateRefetch } = useQuery(
    GET_ACEEPTRECORD_BY_DATE,
    {
      variables: {
        currentDate: `${currentYear}${currentMonth}${currentDate}`,
      },
    }
  );

  const { data: allDatum, refetch: allRefetch } = useQuery(
    GET_ACCEPTRECORD_ALL_YEAR,
    {
      variables: {
        year: `${currentYear}`,
      },
    }
  );

  ///////////// - USE MUTATION- /////////////

  ///////////// - EVENT HANDLER- ////////////

  ////////////// - USE EFFECT- //////////////
  useEffect(() => {
    yearRefetch();
    monthRefetch();
    dateRefetch();
    allRefetch();
  }, []);

  useEffect(() => {
    if (yearData) {
      if (yearCnt === null) {
        setYearCnt(yearData.getAcceptRecord.length);
      }
    }
  }, [yearData]);

  useEffect(() => {
    if (monthData) {
      if (monthCnt === null) {
        setMonthCnt(monthData.getAcceptRecordByMonth.length);
      }
    }
  }, [monthData]);

  useEffect(() => {
    if (dateData) {
      if (todayCnt === null) {
        setTodayCnt(dateData.getAcceptRecordByDate.length);
      }
    }
  }, [dateData]);

  useEffect(() => {
    if (allDatum) {
      const graphArr = Array.from({ length: 12 }, () => 0);

      if (!graphDatum) {
        allDatum.getAcceptRecordAllYear.map((data) => {
          for (let i = 0; i < graphArr.length; i++) {
            const month = ("0" + (i + 1)).slice(-2);

            const regExp = new RegExp(`${currentYear}${month}.*`, "gi");

            const match = regExp.test(data.date);

            match && graphArr[i]++;
          }
        });

        setGraphDatum(graphArr);
      }
    }
  }, [allDatum]);

  useEffect(() => {
    let totalCnt = 0;

    if (graphDatum) {
      graphDatum.map((data) => {
        totalCnt += data;
      });

      graphDatum.map((cnt, idx) => {
        graphDatum[idx] = Math.floor((cnt / totalCnt) * 100);
      });
      setViewGraphDatum([...graphDatum]);
    }
  }, [graphDatum]);

  return (
    <AD01Presenter
      currentTab={currentTab}
      setCurrentTab={setCurrentTab}
      yearCnt={yearCnt}
      monthCnt={monthCnt}
      todayCnt={todayCnt}
      //
      currentYear={currentYear}
      currentMonth={currentMonth}
      currentDate={currentDate}
      //
      monthGraphDatum={viewGraphDatum}
    />
  );
};
