import React from "react";
import {
  EmptyList,
  Wrapper,
  WholeWrapper,
  SearchWrapper,
  TextInput,
  PagenationBtn,
  Pagenation,
  PagenationWrapper,
  Text,
  TabWrapper,
  TabBtn,
} from "../CommonComponents";
import { IoMdRemove, IoMdAdd } from "react-icons/io";
import CircularIndeterminate from "../loading/CircularIndeterminate";
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Theme from "../../Styles/Theme";
import useWindowSize from "../Hooks/useWindowSize";

const Board = ({
  currentType,
  actionFaqView,
  inputSearch,
  pages,
  currentPage,
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
  const { width } = useWindowSize();

  return (
    <WholeWrapper>
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

      <TabWrapper
        dr={`row`}
        isWrap={true}
        ju={width < 700 ? `center` : `flex-start`}
        margin={`20px 0px 50px`}
      >
        {faqTypeDatum &&
          faqTypeDatum.map((data, idx) => {
            return (
              <TabBtn
                key={data._id}
                minWidth={width < 700 ? `175px` : `168px`}
                height={`35px`}
                kindOf={idx === currentType ? `activeBtn` : `white`}
                margin={`0px 10px 0px 0px`}
                bgColor={idx === currentType && Theme.basicTheme_C}
                color={idx === currentType && Theme.white_C}
                border={
                  idx === currentType ? `` : `1px solid ${Theme.basicTheme_C}`
                }
                onClick={() => changeFaqTypeHandler(idx)}
              >
                {data.typeName}
              </TabBtn>
            );
          })}
      </TabWrapper>

      <Wrapper>
        {faqDatum ? (
          faqDatum.length === 0 ? (
            <EmptyList>등록된 FAQ가 없습니다.</EmptyList>
          ) : (
            faqDatum.map((data, idx) => {
              return (
                <Wrapper className="faqBoard" key={data._id}>
                  <Wrapper
                    display={`flex`}
                    padding={`15px`}
                    al={`center`}
                    ju={`flex-start`}
                    dr={`row`}
                    cursor={`pointer`}
                    bgColor={
                      actionFaqView && actionFaqView[idx]
                        ? `rgb(250, 216, 109)`
                        : `#e0e0e0`
                    }
                    color={`#999`}
                    isBgHover={true}
                    margin={`15px 0`}
                    onClick={() => toggleFaqAnswer(idx, data.answer)}
                  >
                    <Wrapper
                      width={`calc(100% - 50px)`}
                      ju={`space-between`}
                      dr={`row`}
                    >
                      <Wrapper
                        height={`50px`}
                        width={`50px`}
                        minWidth={`50px`}
                        radius={`5px`}
                      >
                        <Text
                          fontSize={width < 700 ? `16px` : `24px`}
                          fontWeight={`700`}
                        >
                          Q.
                        </Text>
                      </Wrapper>
                      <Wrapper width={`calc(100% - 50px)`} al={`flex-start`}>
                        <Text
                          padding={`10px`}
                          fontSize={width < 700 ? `16px` : `24px`}
                        >
                          {data.question}
                        </Text>
                      </Wrapper>
                    </Wrapper>
                    <Wrapper
                      width={`50px`}
                      color={`#fff`}
                      fontSize={width < 700 ? `30px` : `50px`}
                    >
                      {actionFaqView && actionFaqView[idx] ? (
                        <IoMdRemove />
                      ) : (
                        <IoMdAdd />
                      )}
                    </Wrapper>
                  </Wrapper>

                  <Wrapper
                    display={
                      actionFaqView && actionFaqView[idx] ? `flex` : `none`
                    }
                    padding={`20px`}
                    al={`center`}
                    bgColor={`#fff`}
                    color={`#999`}
                    ju={`flex-start`}
                    dr={`row`}
                    wrap={`initial`}
                  >
                    <Wrapper
                      height={`50px`}
                      width={`50px`}
                      minWidth={`50px`}
                      radius={`5px`}
                    >
                      <Text
                        fontSize={width < 700 ? `16px` : `24px`}
                        fontWeight={`700`}
                      >
                        A.
                      </Text>
                    </Wrapper>
                    <Wrapper width={`calc(100% - 50px)`}>
                      <Wrapper
                        className={`ql-editor`}
                        id={`faq-answer-${idx}`}
                        padding={`10px`}
                        width={`100%`}
                        fontSize={width < 700 ? `16px` : `24px`}
                        al={`flex-start`}
                        lineHeight={`1.2`}
                      ></Wrapper>
                    </Wrapper>
                  </Wrapper>
                </Wrapper>
              );
            })
          )
        ) : (
          <CircularIndeterminate />
        )}
      </Wrapper>

      {pages && pages.length > 0 && (
        <PagenationWrapper width={`auto`}>
          <PagenationBtn
            onClick={() => prevAndNextPageChangeHandler(currentPage - 1)}
          >
            <IoIosArrowBack />
          </PagenationBtn>
          {pages.map((data) => {
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
            <IoIosArrowForward />
          </PagenationBtn>
        </PagenationWrapper>
      )}
    </WholeWrapper>
  );
};

export default Board;
