import React from "react";
import {
  WholeWrapper,
  RsWrapper,
  Wrapper,
} from "../../../../Components/CommonComponents";

const Board = dynamic(import("../../../../Components/faq/Board"));

const MMPresenter = ({
  inputSearch,
  pages,
  currentPage,
  currentType,
  actionFaqView,
  //
  faqTypeDatum,
  faqDatum,
  //
  toggleFaqAnswer,
  changeFaqTypeHandler,
  prevAndNextPageChangeHandler,
  changePageHandler,
  searchHandler,
}) => {
  return (
    <WholeWrapper>
      <RsWrapper padding={`0 0 100px`}>
        <Wrapper>
          <Board
            inputSearch={inputSearch}
            pages={pages}
            currentPage={currentPage}
            currentType={currentType}
            actionFaqView={actionFaqView}
            //
            faqTypeDatum={faqTypeDatum}
            faqDatum={faqDatum}
            //
            toggleFaqAnswer={toggleFaqAnswer}
            changeFaqTypeHandler={changeFaqTypeHandler}
            prevAndNextPageChangeHandler={prevAndNextPageChangeHandler}
            changePageHandler={changePageHandler}
            searchHandler={searchHandler}
          />
        </Wrapper>
      </RsWrapper>
    </WholeWrapper>
  );
};

export default MMPresenter;
