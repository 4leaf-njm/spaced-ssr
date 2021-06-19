import React from "react";
import {
  CommonButton,
  Content,
  TableHeadColumn,
  TableWrapper,
  TextInput,
  WholeWrapper,
  Wrapper,
  CheckInput,
  StatusButton,
  InfoText,
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
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Editor from "../../../../Components/editor/Editor.jsx";
import { AiOutlineSearch } from "react-icons/ai";

const tabs = ["사용자 리스트"];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default ({
  currentTab,
  setCurrentTab,
  isLoading,
  openDialog,
  currentData,
  //
  uDatum,
  //
  searchName,
  dialogToggle,
  blackListHandler,
  exitHandler,
}) => {
  return (
    <WholeWrapper al={`flex-start`} ju={`flex-start`}>
      <Fade right>
        <Title text="사용자 관리" />
        <Tabs
          tabs={tabs}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      </Fade>

      <Wrapper
        isSearchBox={true}
        dr={`row`}
        al={`center`}
        ju={`flex-start`}
        margin={`0px 0px 10px 0px`}
        padding={`5px`}
      >
        <Wrapper isSearchBox={true} width={`300px`}>
          <TextInput
            width={`300px`}
            height={`25px`}
            padding={`0 30px 0 8px`}
            type="text"
            placeholder={`사용자명...`}
            {...searchName}
          />
          <AiOutlineSearch />
        </Wrapper>
      </Wrapper>

      <TableWrapper>
        <TableHeadColumn width={`5%`}>번호</TableHeadColumn>
        <TableHeadColumn width={`20%`}>사용자명</TableHeadColumn>
        <TableHeadColumn width={`20%`}>아이디</TableHeadColumn>
        <TableHeadColumn width={`25%`}>이메일</TableHeadColumn>
        <TableHeadColumn width={`15%`}>가입일</TableHeadColumn>
        <TableHeadColumn width={`10%`}>권한</TableHeadColumn>
        <TableHeadColumn width={`5%`}>상세</TableHeadColumn>
      </TableWrapper>

      <Wrapper
        height={`630px`}
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
                <Fade key={idx} delay={idx * 40}>
                  <TableWrapper isData={true}>
                    <TableHeadColumn isData={true} width={`5%`}>
                      {idx + 1}
                    </TableHeadColumn>
                    <TableHeadColumn isData={true} width={`20%`}>
                      {data.username}
                    </TableHeadColumn>
                    <TableHeadColumn isData={true} width={`20%`}>
                      {data.userId}
                    </TableHeadColumn>
                    <TableHeadColumn isData={true} width={`25%`}>
                      {data.email}
                    </TableHeadColumn>
                    <TableHeadColumn isData={true} width={`15%`}>
                      {data.createdAt}
                    </TableHeadColumn>
                    <TableHeadColumn isData={true} width={`10%`}>
                      {data.right.rightName}
                    </TableHeadColumn>
                    <TableHeadColumn isData={true} width={`5%`}>
                      <CommonButton
                        width={`100%`}
                        height={`25px`}
                        onClick={() => dialogToggle(data)}
                      >
                        상세보기
                      </CommonButton>
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

      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => dialogToggle()}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        fullWidth={true}
        maxWidth={`lg`}
      >
        <DialogTitle id="alert-dialog-slide-title">
          {`사용자 상세정보`}
        </DialogTitle>
        <DialogContent>
          <Wrapper dr={`row`} margin={`10px 0px`}>
            <Wrapper dr={`row`}>
              <Content>아이디</Content>
              <TextInput
                type="text"
                readOnly={true}
                width={`300px`}
                value={currentData ? currentData.userId : ``}
              />
            </Wrapper>
            <Wrapper dr={`row`}>
              <Content>사용자명</Content>
              <TextInput
                type="text"
                readOnly={true}
                width={`300px`}
                value={currentData ? currentData.username : ``}
              />
            </Wrapper>
          </Wrapper>

          <Wrapper dr={`row`} margin={`10px 0px`}>
            <Wrapper dr={`row`}>
              <Content>연락처</Content>
              <TextInput
                type="text"
                readOnly={true}
                width={`300px`}
                value={currentData ? currentData.tel : ``}
              />
            </Wrapper>
            <Wrapper dr={`row`}>
              <Content>모바일</Content>
              <TextInput
                type="text"
                readOnly={true}
                width={`300px`}
                value={currentData ? currentData.mobile : ``}
              />
            </Wrapper>
          </Wrapper>

          <Wrapper dr={`row`} margin={`10px 0px`}>
            <Wrapper dr={`row`}>
              <Content>이메일</Content>
              <TextInput
                type="text"
                readOnly={true}
                width={`300px`}
                value={currentData ? currentData.email : ``}
              />
            </Wrapper>
            <Wrapper dr={`row`}>
              <Content>가입일</Content>
              <TextInput
                type="text"
                readOnly={true}
                width={`300px`}
                value={currentData ? currentData.createdAt : ``}
              />
            </Wrapper>
          </Wrapper>

          <Wrapper dr={`row`} margin={`10px 0px`}>
            <Wrapper dr={`row`}>
              <Content>권한</Content>
              <TextInput
                type="text"
                readOnly={true}
                width={`300px`}
                value={currentData ? currentData.right.rightName : ``}
              />
            </Wrapper>
            <Wrapper dr={`row`}></Wrapper>
          </Wrapper>

          <Wrapper dr={`row`} margin={`10px 0px`}>
            <Wrapper dr={`row`}>
              <Content>우편번호</Content>
              <TextInput
                type="text"
                readOnly={true}
                width={`300px`}
                value={currentData ? currentData.zoneCode : ``}
              />
            </Wrapper>
            <Wrapper dr={`row`}></Wrapper>
          </Wrapper>
          <Wrapper dr={`row`} margin={`10px 0px`}>
            <Wrapper dr={`row`}>
              <Content>기본주소</Content>
              <TextInput
                type="text"
                readOnly={true}
                width={`916px`}
                value={currentData ? currentData.address : ``}
              />
            </Wrapper>
          </Wrapper>
          <Wrapper dr={`row`} margin={`10px 0px`}>
            <Wrapper dr={`row`}>
              <Content>상세주소</Content>
              <TextInput
                type="text"
                readOnly={true}
                width={`916px`}
                value={currentData ? currentData.detailAddress : ``}
              />
            </Wrapper>
          </Wrapper>

          <Wrapper height={`120px`} isBorder={true} margin={`15px 0px 0px 0px`}>
            <Wrapper dr={`row`} margin={`0px 0px 10px 0px`}>
              <Wrapper dr={`row`}>
                <Content>가입 시 동의_1</Content>
                <CheckInput
                  type="checkbox"
                  checked={(currentData && currentData.isAgreement1) || false}
                  readOnly={true}
                />
              </Wrapper>
              <Wrapper dr={`row`}>
                <Content>가입 시 동의_2</Content>
                <CheckInput
                  type="checkbox"
                  checked={(currentData && currentData.isAgreement2) || false}
                  readOnly={true}
                />
              </Wrapper>
            </Wrapper>

            <Wrapper dr={`row`} margin={`0px 0px 10px 0px`}>
              <Wrapper dr={`row`}>
                <Content>가입 시 동의_3</Content>
                <CheckInput
                  type="checkbox"
                  checked={(currentData && currentData.isAgreement3) || false}
                  readOnly={true}
                />
              </Wrapper>
              <Wrapper dr={`row`}>
                <Content>가입 시 동의_4</Content>
                <CheckInput
                  type="checkbox"
                  checked={(currentData && currentData.isAgreement4) || false}
                  readOnly={true}
                />
              </Wrapper>
            </Wrapper>
          </Wrapper>

          <Wrapper
            margin={`20px 0px 0px 0px`}
            al={`flex-start`}
            ju={`flex-start`}
          >
            <Wrapper
              dr={`row`}
              al={`center`}
              ju={`flex-start`}
              margin={`0px 0px 10px 0px`}
            >
              <StatusButton
                margin={`8px 0px`}
                status={currentData && currentData.isBlack}
                margin={`0px 10px 0px 0px`}
                onClick={() =>
                  blackListHandler(currentData && currentData.isBlack)
                }
              >
                정지회원
              </StatusButton>

              <InfoText width={`500px`}>
                {currentData && currentData.blackAt}
              </InfoText>
            </Wrapper>
            <Wrapper
              dr={`row`}
              al={`center`}
              ju={`flex-start`}
              margin={`0px 0px 10px 0px`}
            >
              <StatusButton
                margin={`8px 0px`}
                status={currentData && currentData.isExit}
                margin={`0px 10px 0px 0px`}
                onClick={() => exitHandler(currentData && currentData.isExit)}
              >
                탈퇴회원
              </StatusButton>
              <InfoText width={`500px`}>
                {currentData && currentData.exitedAt}
              </InfoText>
            </Wrapper>
          </Wrapper>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => dialogToggle()} color="secondary">
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </WholeWrapper>
  );
};
