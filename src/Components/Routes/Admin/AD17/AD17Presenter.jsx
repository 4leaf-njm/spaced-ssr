import React from "react";
import {
  WholeWrapper,
  Wrapper,
  TableWrapper,
  TableHeadColumn,
  TextInput,
  InfoText,
  CommonButton,
  CheckInput,
  Combo,
  ComboOption,
} from "../../../../Components/AdminCommonComponents";
import { Title, Tabs } from "../Components";
import Fade from "react-reveal/Fade";
import CircularIndeterminate from "../../../../Components/loading/CircularIndeterminate";
import styled from "styled-components";
import Theme from "../../../../Styles/Theme";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { FiEdit } from "react-icons/fi";

const tabs = ["권한 변경"];

const SelectBtn = styled(CommonButton)`
  background-color: ${(props) =>
    props.isActive ? props.theme.basicTheme_C : props.theme.lightGrey_C};
`;

export default ({
  currentTab,
  setCurrentTab,
  isLoading,
  currentId,
  currentData,
  selectRight,
  searchName,
  //
  rDatum,
  uDatum,
  //
  userClickHandler,
  rightChangeHandler,
}) => {
  return (
    <WholeWrapper al={`flex-start`} ju={`flex-start`}>
      <Fade right>
        <Title text="회원 권한 변경" />
        <Tabs
          tabs={tabs}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      </Fade>

      <Wrapper
        margin={`5px 0px`}
        isSearchBox={true}
        isBorder={true}
        dr={`row`}
        ju={`flex-start`}
        padding={`0px 15px`}
        height={`40px`}
      >
        <TextInput
          width={`250px`}
          type="text"
          placeholder={`사용자명...`}
          {...searchName}
        />
      </Wrapper>

      <TableWrapper>
        <TableHeadColumn width={`5%`}>번호</TableHeadColumn>
        <TableHeadColumn width={`15%`}>사용자명</TableHeadColumn>
        <TableHeadColumn width={`15%`}>아이디</TableHeadColumn>
        <TableHeadColumn width={`25%`}>이메일</TableHeadColumn>
        <TableHeadColumn width={`15%`}>권한</TableHeadColumn>
        <TableHeadColumn width={`25%`}>가입일</TableHeadColumn>
      </TableWrapper>
      <Wrapper
        height={`400px`}
        al={`flex-start`}
        ju={`flex-start`}
        isBorder={true}
        isScroll={true}
      >
        {uDatum ? (
          uDatum.length === 0 ? (
            <TableWrapper isData={true}>
              <TableHeadColumn isData={true} width={`100%`}>
                조회 된 데이터가 없습니다.
              </TableHeadColumn>
            </TableWrapper>
          ) : (
            uDatum.map((data, idx) => {
              return (
                <Fade key={idx} delay={50 * idx}>
                  <TableWrapper
                    isData={true}
                    isActive={currentId === data._id}
                    onClick={() => userClickHandler(data)}
                  >
                    <TableHeadColumn isData={true} width={`5%`}>
                      {idx + 1}
                    </TableHeadColumn>
                    <TableHeadColumn isData={true} width={`15%`}>
                      {data.username}
                    </TableHeadColumn>
                    <TableHeadColumn isData={true} width={`15%`}>
                      {data.userId}
                    </TableHeadColumn>
                    <TableHeadColumn isData={true} width={`25%`}>
                      {data.email}
                    </TableHeadColumn>
                    <TableHeadColumn isData={true} width={`15%`}>
                      {data.right.rightName}
                    </TableHeadColumn>
                    <TableHeadColumn isData={true} width={`25%`}>
                      {data.createdAt}
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

      {currentData ? (
        <Wrapper al={`center`} ju={`flex-start`} padding={`20px`} dr={`row`}>
          현재 선택된 사용자 {currentData.userId}님의 권한을
          <Combo
            margin={`0px 10px`}
            width={`200px`}
            height={`25px`}
            {...selectRight}
          >
            <ComboOption value="">--선택--</ComboOption>
            {rDatum
              ? rDatum.map((data, idx) => {
                  if (
                    data.rightName === "개발사" ||
                    data.rightName === currentData.right.rightName
                  ) {
                    return;
                  }

                  return (
                    <ComboOption key={idx} value={data._id}>
                      {data.rightName}
                    </ComboOption>
                  );
                })
              : null}
          </Combo>
          (으)로 변경합니다.
          <CommonButton
            kinOf={`update`}
            width={`100px`}
            height={`25px`}
            margin={`0px 15px`}
            onClick={rightChangeHandler}
          >
            확인
          </CommonButton>
        </Wrapper>
      ) : null}
    </WholeWrapper>
  );
};
