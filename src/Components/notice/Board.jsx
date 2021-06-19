import React from "react";
import {
  EmptyList,
  SearchWrapper,
  TableBody,
  TableBodyLIST,
  TableWrapper,
  Wrapper,
  WholeWrapper,
  TextInput,
  TableHead,
  TableHeadLIST,
  PagenationWrapper,
  PagenationBtn,
  Pagenation,
  Combo,
  ComboOption,
  MobileTable,
  MobileTableWrapper,
} from "../CommonComponents";
import styled from "styled-components";
import { AiOutlineSearch, AiFillEye } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import CircularIndeterminate from "../loading/CircularIndeterminate";
import Theme from "../../Styles/Theme";

const Board = ({
  inputSearch,
  pages,
  limit,
  currentPage,
  currentList,
  sortValue,
  //
  noticeDatum,
  pageCnt,
  //
  moveLinkHandler,
  prevAndNextPageChangeHandler,
  changePageHandler,
  searchHandler,
}) => {
  return (
    <WholeWrapper>
      <Wrapper margin={`20px 0px 80px`}>
        <Wrapper
          padding={`40px 0`}
          width={`auto`}
          fontSize={`40px`}
          isNanumFont={true}
          borderTop={`6px solid ${Theme.basicTheme_C}`}
        >
          공지사항
        </Wrapper>
        <Wrapper dr={`row`} ju={`space-between`}>
          <SearchWrapper width={`auto`} dr={`row`} isRelative={true}>
            <TextInput
              type="text"
              width={`190px`}
              padding={`0px 30px 0px 5px`}
              {...inputSearch}
              placeholder="Search"
              onKeyDown={(e) => e.keyCode === 13 && searchHandler()}
            />

            <AiOutlineSearch onClick={searchHandler} />
          </SearchWrapper>

          <Combo
            width={`140px`}
            value={sortValue.value}
            onChange={(e) => sortValue.setValue(e.target.value)}
          >
            <ComboOption value={"createdAt"}>등록순</ComboOption>
            <ComboOption value={"hit"}>조회수</ComboOption>
          </Combo>
        </Wrapper>
        <TableWrapper>
          <TableHead>
            <TableHeadLIST width={`100px`}>번호</TableHeadLIST>
            <TableHeadLIST
              fontWeight={`800`}
              width={`calc(100% - 100px - 160px - 120px - 60px)`}
              ju={`flex-start`}
            >
              제목
            </TableHeadLIST>
            <TableHeadLIST width={`160px`}>이름</TableHeadLIST>
            <TableHeadLIST width={`120px`}>작성일</TableHeadLIST>
            <TableHeadLIST width={`60px`}>조회수</TableHeadLIST>
          </TableHead>

          {noticeDatum ? (
            noticeDatum.length === 0 ? (
              <EmptyList>등록된 게시글이 없습니다.</EmptyList>
            ) : (
              noticeDatum.map((data, idx) => {
                return (
                  <TableBody
                    key={data._id}
                    onClick={() => moveLinkHandler(data._id)}
                  >
                    <TableBodyLIST width={`100px`}>
                      {pageCnt - (currentPage * limit + idx) + ""}
                    </TableBodyLIST>
                    <TableBodyLIST
                      fontWeight={`800`}
                      width={`calc(100% - 100px - 160px - 120px - 60px)`}
                      ju={`flex-start`}
                    >
                      {data && data.title.length > 90
                        ? data.title.substring(0, 90) + `…`
                        : data.title}
                    </TableBodyLIST>
                    <TableBodyLIST width={`160px`}>관리자</TableBodyLIST>
                    <TableBodyLIST width={`120px`}>
                      {data.createdAt.substring(0, 10)}
                    </TableBodyLIST>
                    <TableBodyLIST width={`60px`}>{data.hit}</TableBodyLIST>
                  </TableBody>
                );
              })
            )
          ) : (
            <CircularIndeterminate />
          )}
        </TableWrapper>

        <MobileTable>
          {noticeDatum ? (
            noticeDatum.length === 0 ? (
              <EmptyList>등록된 게시글이 없습니다.</EmptyList>
            ) : (
              noticeDatum.map((data, idx) => {
                return (
                  <MobileTableWrapper
                    key={data._id}
                    onClick={() => moveLinkHandler(data._id)}
                  >
                    <TableBody>
                      <TableBodyLIST
                        fontWeight={`800`}
                        width={`100%`}
                        ju={`flex-start`}
                      >
                        {data && data.title.length > 90
                          ? data.title.substring(0, 90) + `…`
                          : data.title}
                      </TableBodyLIST>
                    </TableBody>

                    <TableBody>
                      <TableBodyLIST ju={`flex-start`} width={`calc(100% / 3)`}>
                        <FaUserCircle /> 관리자
                      </TableBodyLIST>
                      <TableBodyLIST ju={`flex-start`} width={`calc(100% / 3)`}>
                        <MdDateRange />
                        {data.createdAt.substring(0, 10)}
                      </TableBodyLIST>
                      <TableBodyLIST ju={`flex-start`} width={`calc(100% / 3)`}>
                        <AiFillEye /> {data.hit}
                      </TableBodyLIST>
                    </TableBody>
                  </MobileTableWrapper>
                );
              })
            )
          ) : (
            <CircularIndeterminate />
          )}
        </MobileTable>

        {pages && pages.length > 0 && (
          <PagenationWrapper width={`auto`}>
            <PagenationBtn
              onClick={() => prevAndNextPageChangeHandler(currentPage - 1)}
            >
              <IoIosArrowBack />
            </PagenationBtn>
            {pages.map((data, idx) => {
              return (
                (currentList + 1) * 5 > idx &&
                currentList * 5 <= idx && (
                  <Pagenation
                    className={data === currentPage ? `active` : ``}
                    key={data}
                    onClick={() => changePageHandler(data)}
                  >
                    {data + 1}
                  </Pagenation>
                )
              );
            })}
            <PagenationBtn
              onClick={() => prevAndNextPageChangeHandler(currentPage + 1)}
            >
              <IoIosArrowForward />
            </PagenationBtn>
          </PagenationWrapper>
        )}
      </Wrapper>
    </WholeWrapper>
  );
};

export default Board;
