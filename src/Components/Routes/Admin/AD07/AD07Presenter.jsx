import React from "react";
import {
  WholeWrapper,
  Wrapper,
  TableWrapper,
  TableHeadColumn,
  TextInput,
  InfoText,
  CommonButton,
  Combo,
  ComboOption,
} from "../../../../Components/AdminCommonComponents";
import { Title, Tabs } from "../Components";
import Fade from "react-reveal/Fade";
import CircularIndeterminate from "../../../../Components/loading/CircularIndeterminate";
import styled from "styled-components";
import { FiDelete } from "react-icons/fi";
import Theme from "../../../../Styles/Theme";
import Editor from "../../../../Components/editor/Editor.jsx";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const tabs = ["FAQ 관리", "FAQ 등록", "FAQ유형 관리"];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default ({
  currentTab,
  setCurrentTab,
  isLoading,
  newValue,
  setNewValue,
  editContent,
  setEditContent,
  title,
  setTitle,
  type,
  setType,
  openDialog,
  currentAnswer,
  setCurrentAnswer,
  //
  faqTypeDatum,
  faqDatum,
  //
  enterKeyHandler,
  registerFaqTypeHandler,
  deleteFaqHandler,
  createFaqHandler,
  faqDeleteHandler,
  dialogToggle,
  modifyAnswerHandler,
}) => {
  return (
    <WholeWrapper al={`flex-start`} ju={`flex-start`}>
      <Fade right>
        <Title text="자주묻는 질문 관리" />
        <Tabs
          tabs={tabs}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      </Fade>

      {currentTab === 0 && (
        <Wrapper>
          <TableWrapper>
            <TableHeadColumn width={`5%`}>번호</TableHeadColumn>
            <TableHeadColumn width={`10%`}>유형</TableHeadColumn>
            <TableHeadColumn width={`65%`}>질문내용</TableHeadColumn>
            <TableHeadColumn width={`10%`}>삭제</TableHeadColumn>
            <TableHeadColumn width={`10%`}>답변보기</TableHeadColumn>
          </TableWrapper>

          <Wrapper
            isBorder={true}
            height={`600px`}
            al={`flex-start`}
            ju={`flex-start`}
            isScroll={true}
          >
            {faqDatum ? (
              faqDatum.length === 0 ? (
                <TableWrapper isData={true}>
                  <TableHeadColumn isData={true} width={`100%`}>
                    조회 된 데이터가 없습니다.
                  </TableHeadColumn>
                </TableWrapper>
              ) : (
                faqDatum.map((data, idx) => {
                  return (
                    <Fade key={data._id} delay={idx * 50}>
                      <TableWrapper isData={true}>
                        <TableHeadColumn isData={true} width={`5%`}>
                          {idx + 1}
                        </TableHeadColumn>
                        <TableHeadColumn isData={true} width={`10%`}>
                          {data.type}
                        </TableHeadColumn>
                        <TableHeadColumn isData={true} width={`65%`}>
                          {data.question}
                        </TableHeadColumn>
                        <TableHeadColumn
                          isData={true}
                          width={`10%`}
                          isSvg={true}
                        >
                          <FiDelete
                            color={Theme.delete_B_C}
                            size={20}
                            onClick={() => faqDeleteHandler(data._id)}
                          />
                        </TableHeadColumn>
                        <TableHeadColumn isData={true} width={`10%`}>
                          <CommonButton
                            width={`100%`}
                            height={`25px`}
                            onClick={() => dialogToggle(data.answer, data._id)}
                          >
                            답변보기
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
        </Wrapper>
      )}
      {currentTab === 1 && (
        <Wrapper margin={`40px 0px`}>
          <Wrapper dr={`row`} margin={`0px 0px 15px 0px`}>
            <InfoText width={`70px`} height={`30px`}>
              질문
            </InfoText>
            <TextInput
              height={`30px`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></TextInput>
          </Wrapper>

          <Wrapper dr={`row`} margin={`0px 0px 15px 0px`}>
            <InfoText width={`70px`} height={`30px`}>
              유형
            </InfoText>
            <Combo
              width={`100%`}
              value={type}
              onChange={(e) => setType(e.target.value)}
              defaultValue={""}
            >
              <ComboOption value="">--선택--</ComboOption>
              {faqTypeDatum ? (
                faqTypeDatum.length === 0 ? (
                  <TableWrapper isData={true}>
                    <TableHeadColumn isData={true} width={`100%`}>
                      조회 된 데이터가 없습니다.
                    </TableHeadColumn>
                  </TableWrapper>
                ) : (
                  faqTypeDatum.map((data, idx) => {
                    return (
                      <ComboOption key={idx} value={data.typeName}>
                        {data.typeName}
                      </ComboOption>
                    );
                  })
                )
              ) : (
                <CircularIndeterminate />
              )}
            </Combo>
          </Wrapper>

          <Wrapper dr={`row`} margin={`0px 0px 15px 0px`} al={`flex-start`}>
            <InfoText width={`70px`} height={`30px`}>
              답변
            </InfoText>
            <Wrapper>
              <Editor
                value={editContent}
                componentHeight="h-400"
                editorChangeHandler={(html) => setEditContent(html)}
              />
            </Wrapper>
          </Wrapper>

          <Wrapper al={`flex-end`} ju={`flex-end`}>
            <CommonButton kindOf={`create`} onClick={createFaqHandler}>
              FAQ 등록
            </CommonButton>
          </Wrapper>
        </Wrapper>
      )}
      {currentTab === 2 && (
        <Wrapper>
          <Wrapper margin={`0px 0px 5px 0px`}>
            <TableWrapper>
              <TableHeadColumn width={`5%`}>번호</TableHeadColumn>
              <TableHeadColumn width={`85%`}>유형명</TableHeadColumn>
              <TableHeadColumn width={`10%`}>삭제</TableHeadColumn>
            </TableWrapper>
          </Wrapper>

          <Wrapper
            isBorder={true}
            height={`400px`}
            al={`flex-start`}
            ju={`flex-start`}
            isScroll={true}
          >
            {faqTypeDatum ? (
              faqTypeDatum.length === 0 ? (
                <TableWrapper isData={true}>
                  <TableHeadColumn width={`100%`} isData={true}>
                    조회 된 데이터가 없습니다.
                  </TableHeadColumn>
                </TableWrapper>
              ) : (
                faqTypeDatum.map((data, idx) => {
                  return (
                    <Fade bottom key={data._id} delay={50 * idx}>
                      <TableWrapper isData={true}>
                        <TableHeadColumn isData={true} width={`5%`}>
                          {idx + 1}
                        </TableHeadColumn>
                        <TableHeadColumn isData={true} width={`85%`}>
                          {data.typeName}
                        </TableHeadColumn>
                        <TableHeadColumn
                          isData={true}
                          width={`10%`}
                          isSvg={true}
                        >
                          <FiDelete
                            color={Theme.delete_B_C}
                            size={20}
                            onClick={() => deleteFaqHandler(data._id)}
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

          <Wrapper
            dr={`row`}
            al={`flex-end`}
            ju={`flex-end`}
            margin={`10px 0px`}
          >
            <TextInput
              width={`300px`}
              margin={`0px 10px 0px 0px`}
              height={`25px`}
              placeholder={`유형명...`}
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              onKeyDown={enterKeyHandler}
            />
            <CommonButton
              kindOf={`create`}
              height={`25px`}
              onClick={registerFaqTypeHandler}
            >
              등록
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
          {`FAQ 답변 상세보기`}
        </DialogTitle>
        <DialogContent>
          <Editor
            value={currentAnswer}
            componentHeight="h-300"
            editorChangeHandler={(html) => setCurrentAnswer(html)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => dialogToggle()} color="secondary">
            닫기
          </Button>
          <Button onClick={() => modifyAnswerHandler()} color="primary">
            저장 후 닫기
          </Button>
        </DialogActions>
      </Dialog>
    </WholeWrapper>
  );
};
