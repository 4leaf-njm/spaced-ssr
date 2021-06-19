import React from "react";
import {
  WholeWrapper,
  Wrapper,
  TableWrapper,
  TableHeadColumn,
  StatusText,
  CommonButton,
} from "../../../../Components/AdminCommonComponents";
import dynamic from "next/dynamic";
const Fade = dynamic(import("react-reveal/Fade"));
const Title = dynamic(import("../Components/Title"));
const Tabs = dynamic(import("../Components/Tabs"));
const CircularIndeterminate = dynamic(
  import("../../../../Components/loading/CircularIndeterminate")
);
const Editor = dynamic(import("../../../../Components/editor/Editor.jsx"));

const tabs = ["미처리 문의사항", "처리완료"];

export default ({
  descRef,
  //
  canEditor,
  currentTab,
  currentData,
  currentMemo,
  setCurrentTab,
  setCurrentMemo,
  //
  dqDatum,
  //
  getDetailDataHandler,
  completeHandler,
}) => {
  return (
    <WholeWrapper al={`flex-start`} ju={`flex-start`}>
      <Fade right>
        <Title text="DIRECT REQUEST MANAGEMENT" />
        <Tabs
          tabs={tabs}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      </Fade>

      <Wrapper>
        <TableWrapper>
          <TableHeadColumn width={`5%`}>번호</TableHeadColumn>
          <TableHeadColumn width={`5%`}>이름</TableHeadColumn>
          <TableHeadColumn width={`20%`}>내용</TableHeadColumn>
          <TableHeadColumn width={`20%`}>이메일</TableHeadColumn>
          <TableHeadColumn width={`10%`}>모바일</TableHeadColumn>
          <TableHeadColumn width={`10%`}>처리상태</TableHeadColumn>
          <TableHeadColumn width={`15%`}>작성일</TableHeadColumn>
          <TableHeadColumn width={`15%`}>메모작성일</TableHeadColumn>
        </TableWrapper>

        <Wrapper
          isBorder={true}
          height={`250px`}
          margin={`0px 0px 10px 0px`}
          al={`flex-start`}
          ju={`flex-start`}
          isScroll={true}
        >
          {dqDatum ? (
            dqDatum.length === 0 ? (
              <TableWrapper isData={true}>
                <TableHeadColumn isData={true} width={`100%`}>
                  조회 된 데이터가 없습니다.
                </TableHeadColumn>
              </TableWrapper>
            ) : (
              dqDatum.map((data, idx) => {
                return (
                  <Fade key={data._id} delay={idx <= 20 ? idx * 30 : 0}>
                    <TableWrapper
                      isActive={currentData._id === data._id}
                      isData={true}
                      onClick={() => getDetailDataHandler(data)}
                    >
                      <TableHeadColumn isData={true} width={`5%`}>
                        {idx + 1}
                      </TableHeadColumn>
                      <TableHeadColumn isData={true} width={`5%`}>
                        {data.name}
                      </TableHeadColumn>
                      <TableHeadColumn isData={true} width={`20%`}>
                        {data.description.length > 20
                          ? data.description.substring(0, 20) + `...`
                          : data.description}
                      </TableHeadColumn>
                      <TableHeadColumn isData={true} width={`20%`}>
                        {data.email}
                      </TableHeadColumn>
                      <TableHeadColumn isData={true} width={`10%`}>
                        {data.mobile}
                      </TableHeadColumn>
                      <TableHeadColumn isData={true} width={`10%`}>
                        <StatusText status={data.isComplete ? false : true}>
                          {data.isComplete ? `처리완료` : `미처리`}
                        </StatusText>
                      </TableHeadColumn>
                      <TableHeadColumn isData={true} width={`15%`}>
                        {data.createdAt}
                      </TableHeadColumn>
                      <TableHeadColumn isData={true} width={`15%`}>
                        {data.completedAt}
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

        <Wrapper dr={`row`}>
          <Wrapper
            width={`50%`}
            height={`450px`}
            isBorder={true}
            margin={`0px 10px 0px 0px`}
            al={`flex-start`}
            ju={`flex-start`}
          >
            <TableWrapper>
              <TableHeadColumn width={`100%`}>문의내용</TableHeadColumn>
            </TableWrapper>

            <Wrapper
              ref={descRef}
              padding={`20px`}
              height={`80%`}
              al={`flex-start`}
              ju={`flex-start`}
              isScroll={true}
            ></Wrapper>
          </Wrapper>
          <Wrapper
            width={`50%`}
            height={`450px`}
            isBorder={true}
            al={`flex-start`}
            ju={`flex-start`}
          >
            <TableWrapper>
              <TableHeadColumn width={`100%`}>메모</TableHeadColumn>
            </TableWrapper>
            {canEditor ? (
              <Editor
                value={currentMemo}
                componentHeight="h-300"
                editorChangeHandler={(html) => setCurrentMemo(html)}
              />
            ) : (
              <Wrapper padding={`20px`}> 문의를 선택해주세요. </Wrapper>
            )}

            {canEditor ? (
              <Wrapper
                al={`flex-end`}
                ju={`flex-end`}
                isRelative={true}
                bottom={`20px`}
              >
                <CommonButton kindOf={`update`} onClick={completeHandler}>
                  처리완료
                </CommonButton>
              </Wrapper>
            ) : null}
          </Wrapper>
        </Wrapper>
      </Wrapper>
    </WholeWrapper>
  );
};
