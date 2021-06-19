import React from "react";
import {
  WholeWrapper,
  Wrapper,
  TableWrapper,
  TableHeadColumn,
  TextInput,
  CommonButton,
} from "../../../../Components/AdminCommonComponents";
import { Title, Tabs } from "../Components";
import Fade from "react-reveal/Fade";
import CircularIndeterminate from "../../../../Components/loading/CircularIndeterminate";
import styled from "styled-components";
import Theme from "../../../../Styles/Theme";
import { FiDelete } from "react-icons/fi";

const tabs = ["공지사항 유형"];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default ({
  currentTab,
  setCurrentTab,
  isLoading,
  //
  typeDatum,
  //
  typeValue,
  setTypeValue,
  //
  registerTypeHandler,
  keyDownHandler,
  typeDeleteHandler,
}) => {
  return (
    <WholeWrapper al={`flex-start`} ju={`flex-start`}>
      <Fade right>
        <Title text="공지사항 유형 관리" />
        <Tabs
          tabs={tabs}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      </Fade>

      <Wrapper>
        <TableWrapper>
          <TableHeadColumn width={`10%`}>번호</TableHeadColumn>
          <TableHeadColumn width={`70%`}>유형명</TableHeadColumn>
          <TableHeadColumn width={`20%`}>삭제</TableHeadColumn>
        </TableWrapper>
      </Wrapper>

      <Wrapper
        isBorder={true}
        height={`400px`}
        al={`flex-start`}
        ju={`flex-start`}
        isScroll={true}
      >
        {typeDatum ? (
          typeDatum.length === 0 ? (
            <TableWrapper isData={true}>
              <TableHeadColumn isData={true} width={`100%`}>
                조회 된 데이터가 없습니다.
              </TableHeadColumn>
            </TableWrapper>
          ) : (
            typeDatum.map((data, idx) => {
              return (
                <Fade key={data._id} delay={idx * 50}>
                  <TableWrapper isData={true}>
                    <TableHeadColumn isData={true} width={`10%`}>
                      {idx + 1}
                    </TableHeadColumn>
                    <TableHeadColumn isData={true} width={`70%`}>
                      {data.typeName}
                    </TableHeadColumn>
                    <TableHeadColumn isData={true} width={`20%`} isSvg={true}>
                      <FiDelete
                        size={20}
                        color={Theme.delete_B_C}
                        onClick={() => typeDeleteHandler(data._id)}
                      />
                    </TableHeadColumn>
                  </TableWrapper>
                </Fade>
              );
            })
          )
        ) : (
          <CircularIndeterminate />
        )}
      </Wrapper>

      <Wrapper dr={`row`} al={`flex-end`} ju={`flex-end`} margin={`20px 0px`}>
        <TextInput
          type="text"
          width={`240px`}
          margin={`0px 20px`}
          placeholder={`유형명...`}
          value={typeValue}
          onChange={(e) => setTypeValue(e.target.value)}
          maxLength={5}
          onKeyDown={keyDownHandler}
        />
        <CommonButton kindOf={`create`} onClick={registerTypeHandler}>
          신규유형 등록
        </CommonButton>
      </Wrapper>
    </WholeWrapper>
  );
};
