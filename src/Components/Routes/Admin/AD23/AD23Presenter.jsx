import React from "react";
import {
  WholeWrapper,
  TextInput,
  Wrapper,
  TableWrapper,
  TableHeadColumn,
  Content,
  ContentTitle,
  Textarea,
  CommonButton,
  Combo,
  ComboOption,
  GuideBox,
  GuideContent,
  Image,
  FileInput,
  FileLabel,
} from "../../../../Components/AdminCommonComponents";
import { Title, Tabs } from "../Components";
import Fade from "react-reveal/Fade";
import CircularIndeterminate from "../../../../Components/loading/CircularIndeterminate";
import styled from "styled-components";
import Theme from "../../../../Styles/Theme";
import { FiAlertCircle } from "react-icons/fi";
import FileProgress from "../../../../Components/FileProgress";
import { Modal } from "antd";

const tabs = ["게시판 유형 관리"];

export default ({
  currentTab,
  setCurrentTab,
  isLoading,
  fileRef,
  fileUploadProgress,
  openDialog,
  openDialog2,
  boardInput,
  typeInput,
  boardUpset,
  typeUpset,
  //
  boardTypeDatum,
  //
  fileChangeHandler,
  dialogToggleHandler,
  dialogToggleHandler2,
  createBoardTypeHandler,
  updateBoardTypeHandler,
  deleteBoardTypeHandler,
}) => {
  return (
    <WholeWrapper al={`flex-start`} ju={`flex-start`}>
      <Fade right>
        <Title text="게시판 유형 관리" />
        <Tabs
          tabs={tabs}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      </Fade>

      <Wrapper margin={`0 0 10px`} al={`flex-end`}>
        <CommonButton
          height={`25px`}
          kindOf={`create`}
          onClick={() => dialogToggleHandler()}
        >
          게시판 유형 등록
        </CommonButton>
      </Wrapper>
      <TableWrapper>
        <TableHeadColumn width={`10%`}>번호</TableHeadColumn>
        <TableHeadColumn width={`35%`}>게시판명</TableHeadColumn>
        <TableHeadColumn width={`35%`}>유형명</TableHeadColumn>
        <TableHeadColumn width={`10%`}>수정</TableHeadColumn>
        <TableHeadColumn width={`10%`}>삭제</TableHeadColumn>
      </TableWrapper>

      <Wrapper
        height={`600px`}
        isBorder={true}
        isScroll={true}
        className="scroll"
        ju={`flex-start`}
      >
        {boardTypeDatum ? (
          boardTypeDatum.length === 0 ? (
            <TableWrapper isData={true}>
              <TableHeadColumn
                isData={true}
                width={`100%`}
                isSvg={true}
                dr={`row`}
              >
                <FiAlertCircle /> 조회 된 데이터가 없습니다.
              </TableHeadColumn>
            </TableWrapper>
          ) : (
            boardTypeDatum.map((data, idx) => {
              return (
                <TableWrapper isData={true} key={idx} isDelete={data.isDelete}>
                  <TableHeadColumn isData={true} width={`10%`}>
                    {idx + 1}
                  </TableHeadColumn>
                  <TableHeadColumn isData={true} width={`35%`}>
                    {data.title}
                  </TableHeadColumn>
                  <TableHeadColumn isData={true} width={`35%`}>
                    {data.type}
                  </TableHeadColumn>
                  <TableHeadColumn isData={true} width={`10%`}>
                    {data.isDelete ? (
                      <Wrapper color={Theme.white_C}>수정</Wrapper>
                    ) : (
                      <CommonButton
                        width={`100%`}
                        kindOf={`update`}
                        height={`25px`}
                        onClick={() =>
                          dialogToggleHandler2(data._id, data.title, data.type)
                        }
                      >
                        수정
                      </CommonButton>
                    )}
                  </TableHeadColumn>
                  <TableHeadColumn isData={true} width={`10%`}>
                    {data.isDelete ? (
                      <Wrapper color={Theme.white_C}>삭제</Wrapper>
                    ) : (
                      <CommonButton
                        width={`100%`}
                        kindOf={`delete`}
                        height={`25px`}
                        onClick={() => deleteBoardTypeHandler(data._id)}
                      >
                        삭제
                      </CommonButton>
                    )}
                  </TableHeadColumn>
                </TableWrapper>
              );
            })
          )
        ) : (
          <Wrapper>
            <CircularIndeterminate />
          </Wrapper>
        )}
      </Wrapper>

      <Modal
        title={`게시판 유형 추가`}
        visible={openDialog}
        onOk={() => createBoardTypeHandler()}
        onCancel={() => dialogToggleHandler()}
      >
        <Wrapper dr={`row`}>
          <Content>게시판명</Content>
          <TextInput type="text" width={`300px`} {...boardInput} />
        </Wrapper>
        <Wrapper dr={`row`} margin={`10px 0 0`}>
          <Content>유형명</Content>
          <Combo width={`300px`} {...typeInput}>
            <ComboOption value={``}>---- 선택해주세요 ----</ComboOption>
            <ComboOption value={`일반 게시판`}>일반 게시판</ComboOption>
            <ComboOption value={`이벤트형 게시판`}>이벤트형 게시판</ComboOption>
          </Combo>
        </Wrapper>
      </Modal>

      <Modal
        title={`게시판 유형 수정`}
        visible={openDialog2}
        onOk={() => updateBoardTypeHandler()}
        onCancel={() => dialogToggleHandler2()}
      >
        <Wrapper dr={`row`}>
          <Content>게시판명</Content>
          <TextInput type="text" width={`300px`} {...boardUpset} />
        </Wrapper>
        <Wrapper dr={`row`} margin={`10px 0 0`}>
          <Content>유형명</Content>
          <Combo width={`300px`} {...typeUpset}>
            <ComboOption value={``}>---- 선택해주세요 ----</ComboOption>
            <ComboOption value={`일반 게시판`}>일반 게시판</ComboOption>
            <ComboOption value={`이벤트형 게시판`}>이벤트형 게시판</ComboOption>
          </Combo>
        </Wrapper>
      </Modal>
    </WholeWrapper>
  );
};
