import React from "react";
import {
  WholeWrapper,
  Wrapper,
  TableWrapper,
  TableHeadColumn,
  TextInput,
  InfoText,
  CommonButton,
  Pagenation,
  PagenationBtn,
  PagenationWrapper,
  Combo,
  ComboOption,
} from "../../../../Components/AdminCommonComponents";
import { Title, Tabs } from "../Components";
import Fade from "react-reveal/Fade";
import CircularIndeterminate from "../../../../Components/loading/CircularIndeterminate";
import styled from "styled-components";
import Theme from "../../../../Styles/Theme";
import { FiDelete } from "react-icons/fi";
import {
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
  AiOutlineRight,
  AiOutlineLeft,
} from "react-icons/ai";
import Editor from "../../../../Components/editor/Editor.jsx";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { AiOutlineSearch } from "react-icons/ai";

const tabs = ["공지사항 리스트", "공지사항 등록"];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default ({
  currentTab,
  setCurrentTab,
  isLoading,
  pageArr,
  limit,
  editContent,
  setEditContent,
  currentTitle,
  setCurrentTitle,
  currentType,
  setCurrentType,
  openDialog,
  detailTitle,
  setDetailTitle,
  detailType,
  detailCreatedAt,
  detailDescription,
  setDetailDescription,
  //
  searchValue,
  setSearchValue,
  //
  totalPage,
  totalAllPage,
  currentPage,
  setCurrentPage,
  //
  noticeDatum,
  typeDatum,
  //
  changePageHandler,
  prevAndNextPageChangeHandler,
  boardDeleteHandler,
  createNoticeHandler,
  dialogToggle,
  noticeModifyHandler,
}) => {
  return (
    <WholeWrapper al={`flex-start`} ju={`flex-start`}>
      <Fade right>
        <Title text="공지사항 관리" />
        <Tabs
          tabs={tabs}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      </Fade>

      {currentTab === 0 && (
        <>
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
                height={`25px`}
                width={`300px`}
                type="text"
                placeholder={`제목...`}
                margin={`0px 5px 0px 0px`}
                value={searchValue}
                onChange={(e) => {
                  setCurrentPage(0);
                  setSearchValue(e.target.value);
                }}
              />
              <AiOutlineSearch />
            </Wrapper>
          </Wrapper>
          <Wrapper>
            <TableWrapper>
              <TableHeadColumn width={`5%`}>번호</TableHeadColumn>
              <TableHeadColumn width={`10%`}>유형</TableHeadColumn>
              <TableHeadColumn width={`40%`}>제목</TableHeadColumn>
              <TableHeadColumn width={`10%`}>작성자</TableHeadColumn>
              <TableHeadColumn width={`15%`}>작성일</TableHeadColumn>
              <TableHeadColumn width={`5%`}>삭제</TableHeadColumn>
              <TableHeadColumn width={`15%`}>삭제여부</TableHeadColumn>
            </TableWrapper>
          </Wrapper>
          <Wrapper isBorder={true} height={`407px`} ju={`flex-start`}>
            {noticeDatum ? (
              noticeDatum.length === 0 ? (
                <TableWrapper isData={true}>
                  <TableHeadColumn isData={true} width={`100%`}>
                    조회 된 데이터가 없습니다.
                  </TableHeadColumn>
                </TableWrapper>
              ) : (
                noticeDatum.map((data, idx) => {
                  return (
                    <Fade key={data._id} delay={idx * 20}>
                      <TableWrapper isData={true} isDelete={data.isDelete}>
                        <TableHeadColumn isData={true} width={`5%`}>
                          {totalAllPage &&
                            totalAllPage - idx - limit * currentPage}
                        </TableHeadColumn>
                        <TableHeadColumn isData={true} width={`10%`}>
                          {data.type}
                        </TableHeadColumn>
                        <TableHeadColumn
                          isData={true}
                          width={`40%`}
                          onClick={() =>
                            data.isDelete
                              ? null
                              : dialogToggle(
                                  data._id,
                                  data.title,
                                  data.type,
                                  data.createdAt,
                                  data.description
                                )
                          }
                        >
                          {data.title}
                        </TableHeadColumn>
                        <TableHeadColumn isData={true} width={`10%`}>
                          관리자
                        </TableHeadColumn>
                        <TableHeadColumn isData={true} width={`15%`}>
                          {data.createdAt}
                        </TableHeadColumn>
                        <TableHeadColumn
                          isData={true}
                          width={`5%`}
                          isSvg={true}
                        >
                          <FiDelete
                            size={20}
                            color={Theme.delete_B_C}
                            onClick={() => boardDeleteHandler(data._id)}
                          />
                        </TableHeadColumn>
                        <TableHeadColumn isData={true} width={`15%`}>
                          {data.isDelete ? data.deletedAt : ``}
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
          <PagenationWrapper>
            <PagenationBtn onClick={() => changePageHandler(0)}>
              <AiOutlineDoubleLeft />
            </PagenationBtn>
            <PagenationBtn
              onClick={() => prevAndNextPageChangeHandler(currentPage - 1)}
            >
              <AiOutlineLeft />
            </PagenationBtn>
            {pageArr &&
              pageArr.map((data) => {
                return (
                  <Pagenation
                    className={data === currentPage ? `active` : ``}
                    key={data}
                    onClick={() => changePageHandler(data)}
                  >
                    {data + 1}
                  </Pagenation>
                );
              })}
            <PagenationBtn
              onClick={() => prevAndNextPageChangeHandler(currentPage + 1)}
            >
              <AiOutlineRight />
            </PagenationBtn>
            <PagenationBtn onClick={() => changePageHandler(totalPage - 1)}>
              <AiOutlineDoubleRight />
            </PagenationBtn>
          </PagenationWrapper>
        </>
      )}

      {currentTab === 1 && (
        <Wrapper>
          <Wrapper
            dr={`row`}
            al={`flex-start`}
            ju={`flex-start`}
            margin={`0px 0px 10px 0px`}
          >
            <InfoText width={`70px`} margin={`0px 10px 0px 0px`}>
              제목
            </InfoText>
            <TextInput
              type="text"
              value={currentTitle}
              onChange={(e) => setCurrentTitle(e.target.value)}
            />
          </Wrapper>

          <Wrapper
            dr={`row`}
            al={`flex-start`}
            ju={`flex-start`}
            margin={`0px 0px 10px 0px`}
          >
            <InfoText width={`70px`} margin={`0px 10px 0px 0px`}>
              유형
            </InfoText>
            <Combo
              width={`100%`}
              defaultValue=""
              value={currentType}
              onChange={(e) => setCurrentType(e.target.value)}
            >
              <ComboOption value="">--선택--</ComboOption>
              {typeDatum &&
                typeDatum.map((data) => {
                  return (
                    <ComboOption key={data._id} value={data.typeName}>
                      {data.typeName}
                    </ComboOption>
                  );
                })}
            </Combo>
          </Wrapper>

          <Wrapper
            dr={`row`}
            al={`flex-start`}
            ju={`flex-start`}
            margin={`0px 0px 10px 0px`}
          >
            <InfoText width={`70px`} margin={`0px 10px 0px 0px`}>
              내용
            </InfoText>
            <Wrapper>
              <Editor
                value={editContent}
                componentHeight="h-500"
                editorChangeHandler={(html) => setEditContent(html)}
              />
            </Wrapper>
          </Wrapper>

          <Wrapper al={`flex-end`} ju={`flex-end`}>
            <CommonButton kindOf={`create`} onClick={createNoticeHandler}>
              공지사항 등록
            </CommonButton>
          </Wrapper>
        </Wrapper>
      )}

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
          {`NOTICE 공지사항 상세보기`}
        </DialogTitle>
        <DialogContent>
          <Wrapper
            dr={`row`}
            al={`center`}
            ju={`flex-start`}
            margin={`0px 0px 15px 0px`}
          >
            <Wrapper
              width={`100px`}
              height={`100%`}
              margin={`0px 10px 0px 0px`}
              size={`13px`}
              isSearchBox={true}
              color={Theme.white_C}
              padding={`10px`}
            >
              {detailType}
            </Wrapper>
            <Wrapper al={`flex-start`} size={`15px`} padding={`10px`}>
              <TextInput
                type="text"
                value={detailTitle}
                onChange={(e) => setDetailTitle(e.target.value)}
              />
            </Wrapper>
          </Wrapper>

          <Wrapper
            al={`flex-end`}
            ju={`flex-end`}
            size={`11px`}
            margin={`0px 0px 15px 0px`}
          >
            {detailCreatedAt}
          </Wrapper>

          <Editor
            value={detailDescription}
            componentHeight="h-300"
            editorChangeHandler={(html) => setDetailDescription(html)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => dialogToggle()} color="secondary">
            닫기
          </Button>
          <Button onClick={() => noticeModifyHandler()} color="primary">
            저장 후 닫기
          </Button>
        </DialogActions>
      </Dialog>
    </WholeWrapper>
  );
};
