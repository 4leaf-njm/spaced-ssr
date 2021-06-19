import React from "react";
import {
  WholeWrapper,
  TextInput,
  Wrapper,
  TableWrapper,
  TableHeadColumn,
  Content,
  CommonButton,
  GuideBox,
  GuideContent,
  Image,
} from "../../../../Components/AdminCommonComponents";
import { Title, Tabs } from "../Components";
import Fade from "react-reveal/Fade";
import CircularIndeterminate from "../../../../Components/loading/CircularIndeterminate";
import styled from "styled-components";
import Theme from "../../../../Styles/Theme";
import Slide from "@material-ui/core/Slide";
import { FiAlertCircle } from "react-icons/fi";
import { AiOutlineSearch } from "react-icons/ai";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const tabs = ["팝업 리스트"];

export default ({
  currentTab,
  setCurrentTab,
  searchValue,
  setSearchValue,
  selectData,
  //
  nDatum,
  //
  dataClickHandler,
  deletePopupHandler,
  moveUpdateBannerPage,
  moveCreateBannerPage,
}) => {
  return (
    <WholeWrapper al={`flex-start`} ju={`flex-start`}>
      <Fade right>
        <Title text="팝업 관리" />
        <Tabs
          tabs={tabs}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      </Fade>
      <Fade bottom>
        <Wrapper margin={`10px 0px`}>
          <GuideBox padding={`5px`}>
            <GuideContent padding={`5px`}>
              리스트는 최신 팝업를 기준으로 정렬됩니다.
            </GuideContent>
            <GuideContent padding={`5px`}>
              팝업의 이미지는 330px X 450px로 지정되어 있습니다. 이미지 비율이
              다르면 화면에 다르게보일 수 있습니다.
            </GuideContent>
            <GuideContent padding={`5px 5px 0px 5px`}>
              삭제된 팝업는 복구할 수 없으니, 삭제 시 유의하시기 바랍니다.
            </GuideContent>
          </GuideBox>
        </Wrapper>
      </Fade>

      <Fade>
        <Wrapper
          isSearchBox={true}
          dr={`row`}
          al={`center`}
          ju={`space-between`}
          margin={`0px 0px 10px 0px`}
          padding={`5px`}
        >
          <Wrapper isSearchBox={true} width={`300px`}>
            <TextInput
              height={`25px`}
              width={`300px`}
              type="text"
              placeholder={`팝업 타이틀을 검색하세요.`}
              margin={`0px 5px 0px 0px`}
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
            <AiOutlineSearch />
          </Wrapper>
          <CommonButton
            kindOf={`create`}
            onClick={() => moveCreateBannerPage()}
          >
            팝업 등록
          </CommonButton>
        </Wrapper>
      </Fade>

      <Wrapper dr={`row`}>
        <Wrapper width={`760px`} minWidth={`760px`}>
          <Fade left>
            <TableWrapper>
              <TableHeadColumn width={`12%`}>번호</TableHeadColumn>
              <TableHeadColumn width={`60%`} isStart={true}>
                제목
              </TableHeadColumn>
              <TableHeadColumn width={`28%`}>등록일</TableHeadColumn>
            </TableWrapper>

            <Wrapper
              height={`660px`}
              isBorder={true}
              isScroll={true}
              ju={`flex-start`}
            >
              {nDatum ? (
                nDatum.length === 0 ? (
                  <TableWrapper isData={true}>
                    <TableHeadColumn
                      isData={true}
                      width={`100%`}
                      dr={`row`}
                      isSvg={true}
                    >
                      <FiAlertCircle /> 조회 된 데이터가 없습니다.
                    </TableHeadColumn>
                  </TableWrapper>
                ) : (
                  nDatum.map((data, idx) => {
                    return (
                      <Fade key={idx}>
                        <TableWrapper
                          isData={true}
                          isActive={selectData && selectData._id === data._id}
                        >
                          <TableHeadColumn isData={true} width={`12%`}>
                            {idx + 1}
                          </TableHeadColumn>
                          <TableHeadColumn
                            isData={true}
                            width={`60%`}
                            isStart={true}
                            isToday={true}
                            onClick={() => dataClickHandler(data)}
                          >
                            {data.title}
                          </TableHeadColumn>
                          <TableHeadColumn isData={true} width={`28%`}>
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
          </Fade>
        </Wrapper>

        <Fade right>
          <Wrapper margin={`5px`}>
            <TableWrapper>
              <TableHeadColumn width={`100%`}>상세정보</TableHeadColumn>
            </TableWrapper>

            {selectData === null ? (
              <Wrapper
                height={`660px`}
                isBorder={true}
                isScroll={true}
                ju={`flex-start`}
                padding={`20px`}
                isSvg={true}
              >
                <FiAlertCircle size={40} color={Theme.delete_B_C} />
                <Wrapper margin={`20px 0px`}>
                  좌측 데이터를 선택해주세요.
                </Wrapper>
              </Wrapper>
            ) : (
              <Wrapper
                height={`660px`}
                isBorder={true}
                isScroll={true}
                ju={`flex-start`}
                padding={`20px`}
              >
                <Image
                  width={`297px`}
                  height={`405px`}
                  alt={`thumbnail`}
                  margin={`0px 0px 20px 0px`}
                  src={selectData && selectData.thumbnailPath}
                />

                <Wrapper
                  dr={`row`}
                  margin={`0px 0px 10px 20px`}
                  ju={`flex-start`}
                >
                  <Content>제목</Content>
                  <TextInput
                    readOnly={true}
                    width={`350px`}
                    value={(selectData && selectData.title) || ``}
                  />
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  margin={`0px 0px 10px 20px`}
                  ju={`flex-start`}
                >
                  <Content>등록일</Content>
                  <TextInput
                    readOnly={true}
                    width={`350px`}
                    value={(selectData && selectData.createdAt) || ``}
                  />
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  margin={`0px 0px 10px 20px`}
                  ju={`flex-start`}
                >
                  <Content>수정일</Content>
                  <TextInput
                    readOnly={true}
                    width={`350px`}
                    value={(selectData && selectData.updatedAt) || ``}
                  />
                </Wrapper>

                <Wrapper margin={`25px 0px 0px 0px`} dr={`row`}>
                  <CommonButton
                    margin={`0px 10px`}
                    kindOf={`update`}
                    onClick={() => moveUpdateBannerPage()}
                  >
                    팝업 수정
                  </CommonButton>
                  <CommonButton
                    margin={`0px 10px`}
                    kindOf={`delete`}
                    onClick={() => deletePopupHandler()}
                  >
                    팝업 삭제
                  </CommonButton>
                </Wrapper>
              </Wrapper>
            )}
          </Wrapper>
        </Fade>
      </Wrapper>
    </WholeWrapper>
  );
};
