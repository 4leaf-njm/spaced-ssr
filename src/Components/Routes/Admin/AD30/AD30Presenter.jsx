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
import { FiAlertCircle, FiPlusCircle } from "react-icons/fi";
import FileProgress from "../../../../Components/FileProgress";
import { Modal } from "antd";

const tabs = ["SNS LINK"];

export default ({
  currentTab,
  setCurrentTab,
  isLoading,
  fileUploadProgress,
  modalFlag,
  modalFlag2,
  platformInput,
  urlInput,
  platformUpset,
  urlUpset,
  //
  fileRef,
  //
  snsDatum,
  //
  fileChangeHandler,
  modalHandler,
  modalHandler2,
  createSnsHandler,
  updateSnsHandler,
  deleteSnsHandler,
}) => {
  return (
    <WholeWrapper al={`flex-start`} ju={`flex-start`}>
      <Fade right>
        <Title text="SNS LINK 관리" />
        <Tabs
          tabs={tabs}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      </Fade>

      <Fade>
        <Wrapper
          fontSize={`30px`}
          al={`flex-end`}
          margin={`0 0 10px`}
          color={Theme.update_B_C}
        >
          <FiPlusCircle onClick={modalHandler} />
        </Wrapper>
        <TableWrapper>
          <TableHeadColumn width={`10%`}>번호</TableHeadColumn>
          <TableHeadColumn width={`40%`}>SNS 이름</TableHeadColumn>
          <TableHeadColumn width={`40%`}>SNS LINK</TableHeadColumn>
          <TableHeadColumn width={`5%`}>수정</TableHeadColumn>
          <TableHeadColumn width={`5%`}>삭제</TableHeadColumn>
        </TableWrapper>

        <Wrapper
          height={`500px`}
          isBorder={true}
          isScroll={true}
          className="scroll"
          ju={`flex-start`}
        >
          {snsDatum ? (
            snsDatum.length === 0 ? (
              <Wrapper dr={`row`} isSvg={true} margin={`10px 0`}>
                <FiAlertCircle /> 조회된 데이터가 없습니다.
              </Wrapper>
            ) : (
              snsDatum.map((data, idx) => {
                return (
                  <TableWrapper isData={true} key={idx}>
                    <TableHeadColumn isData={true} width={`10%`}>
                      {idx + 1}
                    </TableHeadColumn>
                    <TableHeadColumn isData={true} width={`40%`}>
                      {data.platform}
                    </TableHeadColumn>
                    <TableHeadColumn isData={true} width={`40%`}>
                      {data.url}
                    </TableHeadColumn>
                    <TableHeadColumn isData={true} width={`5%`}>
                      <CommonButton
                        width={`100%`}
                        height={`25px`}
                        kindOf={`update`}
                        onClick={() => {
                          modalHandler2(data._id, data.platform, data.url);
                        }}
                      >
                        수정
                      </CommonButton>
                    </TableHeadColumn>
                    <TableHeadColumn isData={true} width={`5%`}>
                      <CommonButton
                        width={`100%`}
                        height={`25px`}
                        kindOf={`delete`}
                        onClick={() => {
                          deleteSnsHandler(data._id);
                        }}
                      >
                        삭제
                      </CommonButton>
                    </TableHeadColumn>
                  </TableWrapper>
                );
              })
            )
          ) : (
            <Wrapper></Wrapper>
          )}
        </Wrapper>
      </Fade>

      <Modal
        title="SNS LINK 추가"
        visible={modalFlag}
        onOk={() => {
          createSnsHandler();
        }}
        onCancel={() => {
          modalHandler();
        }}
      >
        <Wrapper al={`flex-start`} margin={`0 0 10px`}>
          SNS 이름
        </Wrapper>
        <TextInput {...platformInput} />
        <Wrapper al={`flex-start`} margin={`10px 0`}>
          SNS LINK
        </Wrapper>
        <TextInput {...urlInput} />
      </Modal>

      <Modal
        title="SNS LINK 수정"
        visible={modalFlag2}
        onOk={() => {
          updateSnsHandler();
        }}
        onCancel={() => {
          modalHandler2();
        }}
      >
        <Wrapper al={`flex-start`} margin={`0 0 10px`}>
          SNS 이름
        </Wrapper>
        <TextInput {...platformUpset} />
        <Wrapper al={`flex-start`} margin={`10px 0`}>
          SNS LINK
        </Wrapper>
        <TextInput {...urlUpset} />
      </Modal>
    </WholeWrapper>
  );
};
