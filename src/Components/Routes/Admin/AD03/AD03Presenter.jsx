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
  DataGuideWrapper,
  DataWrapper,
} from "../../../../Components/AdminCommonComponents";
import { Title, Tabs } from "../Components";
import Fade from "react-reveal/Fade";
import CircularIndeterminate from "../../../../Components/loading/CircularIndeterminate";
import styled from "styled-components";
import Theme from "../../../../Styles/Theme";
import { FiAlertCircle, FiPlusCircle } from "react-icons/fi";
import FileProgress from "../../../../Components/FileProgress";
import { Modal } from "antd";

const tabs = ["하단정보 관리"];

export default ({
  currentTab,
  setCurrentTab,
  isLoading,
  fileUploadProgress,
  modalFlag,
  modalFlag2,
  titleInput,
  contentInput,
  titleUpset,
  contentUpset,
  //
  fileRef,
  //
  fDatum,
  //
  fileChangeHandler,
  modalToggleHandler,
  modalToggleHandler2,
  createFooterInfoHandler,
  deleteFooterInfoHandler,
  updateFooterInfoHandler,
}) => {
  return (
    <WholeWrapper al={`flex-start`} ju={`flex-start`}>
      <Fade right>
        <Title text="하단정보 관리" />
        <Tabs
          tabs={tabs}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      </Fade>

      <Wrapper dr={`row`} ju={`flex-end`} margin={`0 0 10px 0`} isSvg={true}>
        <FiPlusCircle
          color={Theme.create_B_C}
          size={30}
          onClick={() => modalToggleHandler()}
        />
      </Wrapper>

      <Wrapper
        isBorder={true}
        height={`500px`}
        ju={`flex-start`}
        isScroll={true}
        className={`scroll`}
      >
        <Fade>
          <TableWrapper>
            <TableHeadColumn width={`5%`}>NO</TableHeadColumn>
            <TableHeadColumn width={`20%`}>TITLE</TableHeadColumn>
            <TableHeadColumn width={`60%`}>CONTENT</TableHeadColumn>
            <TableHeadColumn width={`7.5%`}>UPDATE</TableHeadColumn>
            <TableHeadColumn width={`7.5%`}>DELETE</TableHeadColumn>
          </TableWrapper>
        </Fade>

        {fDatum ? (
          fDatum.length === 0 ? (
            <TableWrapper isData={true}>
              <TableHeadColumn
                isData={true}
                width={`100%`}
                dr={`row`}
                isSvg={true}
              >
                <FiAlertCircle color={Theme.delete_B_C} />
                조회된 데이터가 없습니다.
              </TableHeadColumn>
            </TableWrapper>
          ) : (
            fDatum.map((data, idx) => {
              return (
                <Fade key={idx}>
                  <TableWrapper isData={true}>
                    <TableHeadColumn width={`5%`} isData={true}>
                      {idx + 1}
                    </TableHeadColumn>
                    <TableHeadColumn width={`20%`} isData={true}>
                      {data.title}
                    </TableHeadColumn>
                    <TableHeadColumn width={`60%`} isData={true}>
                      {data.content}
                    </TableHeadColumn>
                    <TableHeadColumn width={`7.5%`} isData={true}>
                      <CommonButton
                        kindOf={`update`}
                        width={`100%`}
                        height={`25px`}
                        onClick={() =>
                          modalToggleHandler2(
                            data._id,
                            data.title,
                            data.content
                          )
                        }
                      >
                        수정
                      </CommonButton>
                    </TableHeadColumn>
                    <TableHeadColumn width={`7.5%`} isData={true}>
                      <CommonButton
                        height={`25px`}
                        kindOf={`delete`}
                        width={`100%`}
                        onClick={() => deleteFooterInfoHandler(data._id)}
                      >
                        삭제
                      </CommonButton>
                    </TableHeadColumn>
                  </TableWrapper>
                </Fade>
              );
            })
          )
        ) : (
          <Wrapper>
            <CircularIndeterminate />
          </Wrapper>
        )}

        <Modal
          title="하단정보 수정하기"
          width={`1000px`}
          visible={modalFlag2}
          onOk={() => updateFooterInfoHandler()}
          onCancel={() => modalToggleHandler2()}
        >
          <Wrapper dr={`row`}>
            <DataGuideWrapper width={`100%`}>TITLE</DataGuideWrapper>
            <DataWrapper width={` calc(100% - 100px)`}>
              <TextInput height={`25px`} {...titleUpset} />
            </DataWrapper>
          </Wrapper>
          <Wrapper dr={`row`}>
            <DataGuideWrapper width={`100%`}>CONTENT</DataGuideWrapper>
            <DataWrapper width={` calc(100% - 100px)`}>
              <TextInput height={`25px`} {...contentUpset} />
            </DataWrapper>
          </Wrapper>
        </Modal>

        <Modal
          title="하단정보 추가하기"
          width={`1000px`}
          visible={modalFlag}
          onOk={() => createFooterInfoHandler()}
          onCancel={() => modalToggleHandler()}
        >
          <Wrapper dr={`row`}>
            <DataGuideWrapper width={`100%`}>TITLE</DataGuideWrapper>
            <DataWrapper width={`calc(100% - 100px)`}>
              <TextInput height={`25px`} {...titleInput} />
            </DataWrapper>
          </Wrapper>
          <Wrapper dr={`row`}>
            <DataGuideWrapper width={`100%`}>CONTENT</DataGuideWrapper>
            <DataWrapper width={`calc(100% - 100px)`}>
              <TextInput height={`25px`} {...contentInput} />
            </DataWrapper>
          </Wrapper>
        </Modal>
      </Wrapper>
    </WholeWrapper>
  );
};
