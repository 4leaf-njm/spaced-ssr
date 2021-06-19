import React from "react";
import {
  WholeWrapper,
  Wrapper,
  TableWrapper,
  TableHeadColumn,
  GraphName,
  GraphBar,
} from "../../../../Components/AdminCommonComponents";
import dynamic from "next/dynamic";
const Title = dynamic(import("../Components/Title"));
const Tabs = dynamic(import("../Components/Tabs"));
const Fade = dynamic(import("react-reveal/Fade"));

const tabs = ["접속자통계"];

export default ({
  currentTab,
  setCurrentTab,
  yearCnt,
  monthCnt,
  todayCnt,
  //
  currentYear,
  currentMonth,
  currentDate,
  //
  monthGraphDatum,
}) => {
  return (
    <WholeWrapper minWidth={`1000px`} al={`flex-start`} ju={`flex-start`}>
      <Fade right>
        <Title text="접속자 통계" />
        <Tabs
          tabs={tabs}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      </Fade>

      <Wrapper>
        <TableWrapper>
          <TableHeadColumn width={`33%`}>
            {currentYear}년도 전체 접속자
          </TableHeadColumn>
          <TableHeadColumn width={`33%`}>
            {currentYear}년 {currentMonth}월 전체 접속자
          </TableHeadColumn>
          <TableHeadColumn isToday={true} width={`33%`}>
            {currentYear}년 {currentMonth}월 {currentDate}일
          </TableHeadColumn>
        </TableWrapper>

        <TableWrapper isData={true}>
          <TableHeadColumn isData={true} width={`33%`}>
            {yearCnt === null ? `-` : yearCnt} 명
          </TableHeadColumn>
          <TableHeadColumn isData={true} width={`33%`}>
            {monthCnt === null ? `-` : monthCnt} 명
          </TableHeadColumn>
          <TableHeadColumn isData={true} width={`33%`}>
            {todayCnt === null ? `-` : todayCnt} 명
          </TableHeadColumn>
        </TableWrapper>
      </Wrapper>

      <Wrapper dr={`row`} height={`580px`} al={`flex-end`} ju={`space-around`}>
        {monthGraphDatum &&
          monthGraphDatum.map((data, idx) => {
            return (
              <Wrapper key={idx}>
                <Fade bottom delay={idx * 50}>
                  <Wrapper width={`40px`} height={`500px`} ju={`flex-end`}>
                    <GraphBar height={data + `%`}>{data}</GraphBar>
                    <GraphName>{data}%</GraphName>
                    <GraphName>{idx + 1}월</GraphName>
                  </Wrapper>
                </Fade>
              </Wrapper>
            );
          })}
      </Wrapper>
    </WholeWrapper>
  );
};
