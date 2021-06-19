import React from "react";
import {
  Content,
  StatusText,
  TableHeadColumn,
  TableWrapper,
  TextInput,
  WholeWrapper,
  Wrapper,
  StatusButton,
  CommonButton,
  GuideBox,
  GuideContent,
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
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Editor from "../../../../Components/editor/Editor.jsx";
import { FiArrowDownCircle, FiArrowUpCircle } from "react-icons/fi";

const tabs = ["권한 관리"];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default ({
  currentTab,
  setCurrentTab,
  isLoading,
  currentRightName,
  currentisAdminLogin,
  openDialog,
  selectDefaultId,
  //
  rDatum,
  dData,
  //
  currentId,
  //
  clickRightHandler,
  adminToggleHandler,
  updateRightHandler,
  rightSortChange,
  userRightDelete,
  dialogToggle,
  createUserRight,
  modifyDefaultUserRight,
}) => {
  return (
    <WholeWrapper al={`flex-start`} ju={`flex-start`}>
      <Fade right>
        <Title text="권한 관리" />
        <Tabs
          tabs={tabs}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      </Fade>

      <Wrapper dr={`row`}>
        <Wrapper margin={`0px 5px 0px 0px`}>
          <TableWrapper>
            <TableHeadColumn width={`10%`}>번호</TableHeadColumn>
            <TableHeadColumn width={`50%`}>권한명</TableHeadColumn>
            <TableHeadColumn width={`20%`}>정렬</TableHeadColumn>
            <TableHeadColumn width={`20%`}>관리자 접속여부</TableHeadColumn>
          </TableWrapper>
          <Wrapper
            height={`400px`}
            isBorder={true}
            isScroll={true}
            al={`flex-start`}
            ju={`flex-start`}
          >
            {rDatum ? (
              rDatum.length === 0 ? (
                <TableWrapper isData={true}>
                  <TableHeadColumn isData={true} width={`100%`}>
                    조회 된 데이터가 없습니다.
                  </TableHeadColumn>
                </TableWrapper>
              ) : (
                rDatum.map((data, idx) => {
                  return (
                    <Fade key={data._id} delay={idx * 50}>
                      <TableWrapper
                        isData={true}
                        isActive={currentId === data._id}
                        onClick={() => clickRightHandler(data)}
                      >
                        <TableHeadColumn isData={true} width={`10%`}>
                          {idx + 1}
                        </TableHeadColumn>
                        <TableHeadColumn isData={true} width={`50%`}>
                          {data.rightName}
                        </TableHeadColumn>
                        <TableHeadColumn
                          isData={true}
                          width={`20%`}
                          isSvg={true}
                        >
                          <FiArrowDownCircle
                            onClick={() =>
                              rightSortChange(0, data.sort, data._id)
                            }
                          />
                          {data.sort}
                          <FiArrowUpCircle
                            onClick={() =>
                              rightSortChange(1, data.sort, data._id)
                            }
                          />
                        </TableHeadColumn>
                        <TableHeadColumn isData={true} width={`20%`}>
                          <StatusText status={!data.isAdminLogin}>
                            {data.isAdminLogin ? `가능` : `불가`}
                          </StatusText>
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
        </Wrapper>

        <Wrapper margin={`0px 5px 0px 0px`}>
          <TableWrapper>
            <TableHeadColumn width={`100%`}>권한 정보</TableHeadColumn>
          </TableWrapper>
          <Wrapper height={`400px`} isBorder={true}>
            {currentId !== "" ? (
              <>
                <Wrapper dr={`row`} margin={`20px`}>
                  <Content>권한명</Content>
                  <TextInput width={`300px`} {...currentRightName} />
                </Wrapper>
                <Wrapper dr={`row`} margin={`20px`}>
                  <Content></Content>
                  <StatusButton
                    status={true}
                    width={`300px`}
                    status={currentisAdminLogin.value}
                    onClick={adminToggleHandler}
                  >
                    관리자 로그인
                  </StatusButton>
                </Wrapper>

                <Wrapper
                  margin={`40px 0px 0px 0px`}
                  dr={`row`}
                  ju={`space-around`}
                >
                  <CommonButton
                    width={`120px`}
                    height={`25px`}
                    kindOf={`delete`}
                    onClick={() => userRightDelete(currentId)}
                  >
                    권한 삭제
                  </CommonButton>
                  <CommonButton
                    width={`120px`}
                    height={`25px`}
                    kindOf={`update`}
                    onClick={updateRightHandler}
                  >
                    정보 수정
                  </CommonButton>
                </Wrapper>
              </>
            ) : (
              <Wrapper>좌측 권한을 선택해주세요.</Wrapper>
            )}
          </Wrapper>
        </Wrapper>
      </Wrapper>

      <Wrapper
        dr={`row`}
        al={`flex-end`}
        ju={`flex-end`}
        margin={`10px`}
        padding={`10px 20px`}
      >
        <CommonButton
          onClick={dialogToggle}
          kindOf={`create`}
          width={`100px`}
          height={`25px`}
        >
          권한 추가
        </CommonButton>
      </Wrapper>

      <Wrapper margin={`20px 0px`}>
        <GuideBox padding={`5px`}>
          <GuideContent margin={`5px 0px 5px 0px`}>
            일반 사용자의 회원가입 시 기본적으로 설정되는 권한 입니다.
          </GuideContent>
          <GuideContent margin={`5px 0px 5px 0px`}>
            설정된 권한을 절대 삭제하지 마세요.
          </GuideContent>
        </GuideBox>

        <Wrapper
          dr={`row`}
          margin={`20px 0px`}
          al={`flex-start`}
          ju={`flex-start`}
        >
          <Content width={`120px`}>현재 초기 설정 값</Content>
          <TextInput
            type="text"
            readOnly={true}
            width={`300px`}
            value={(dData && dData.rightKey.rightName) || ``}
          />
        </Wrapper>
        <Wrapper
          dr={`row`}
          margin={`10px 0px`}
          al={`flex-start`}
          ju={`flex-start`}
        >
          <Content width={`120px`}>변경할 초기 값</Content>
          <Combo
            width={`300px`}
            margin={`0px 10px 0px 0px`}
            {...selectDefaultId}
          >
            <ComboOption value="">--선택--</ComboOption>
            {rDatum &&
              rDatum.map((data, idx) => {
                if (data.rightName === `개발사`) {
                  return;
                } else {
                  return (
                    <ComboOption key={idx} value={data._id}>
                      {data.rightName}
                    </ComboOption>
                  );
                }
              })}
          </Combo>
          <CommonButton
            kindOf={`update`}
            width={`100px`}
            onClick={modifyDefaultUserRight}
          >
            적용
          </CommonButton>
        </Wrapper>
      </Wrapper>

      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => dialogToggle()}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        fullWidth={true}
        // maxWidth={`lg`}
      >
        <DialogTitle id="alert-dialog-slide-title">
          {`권한 추가하기`}
        </DialogTitle>
        <DialogContent>
          <Wrapper padding={`30px 0px`}>
            <Wrapper dr={`row`} margin={`15px 0px`}>
              <Content>권한명</Content>
              <TextInput type="text" width={`300px`} {...currentRightName} />
            </Wrapper>

            <Wrapper dr={`row`} margin={`15px 0px`}>
              <Content></Content>
              <StatusButton
                status={true}
                width={`300px`}
                status={currentisAdminLogin.value}
                onClick={adminToggleHandler}
              >
                관리자 로그인
              </StatusButton>
            </Wrapper>
          </Wrapper>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => createUserRight()} color="primary">
            저장 후 닫기
          </Button>
          <Button onClick={() => dialogToggle()} color="secondary">
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </WholeWrapper>
  );
};
