import React from "react";
import dynamic from "next/dynamic";
import {
  WholeWrapper,
  RsWrapper,
} from "../../../../Components/CommonComponents";

const Board = dynamic(import("../../../../Components/notice/Board"));

const MMPresenter = ({
  inputSearch,
  pages,
  currentPage,
  currentList,
  limit,
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
      <RsWrapper>
        <Board
          inputSearch={inputSearch}
          pages={pages}
          currentPage={currentPage}
          currentList={currentList}
          limit={limit}
          sortValue={sortValue}
          //
          noticeDatum={noticeDatum}
          pageCnt={pageCnt}
          //
          moveLinkHandler={moveLinkHandler}
          prevAndNextPageChangeHandler={prevAndNextPageChangeHandler}
          changePageHandler={changePageHandler}
          searchHandler={searchHandler}
        />
      </RsWrapper>
    </WholeWrapper>
  );
};

export default MMPresenter;
