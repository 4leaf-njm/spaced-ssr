import React from "react";
import dynamic from "next/dynamic";
import {
  WholeWrapper,
  Wrapper,
  Image,
  SpanText,
} from "../../../../Components/CommonComponents";
import styled from "styled-components";
import { GiPositionMarker } from "react-icons/gi";

const MM00Presenter = ({ width }) => {
  return (
    <WholeWrapper
      isRelative={true}
      index={`1`}
      width={`1920px`}
      height={`1080px`}
      padding={`100px`}
    >
      <Wrapper dr={`row`} al={`normal`} height={`100%`}>
        <Wrapper
          ju={`flex-start`}
          al={`flex-start`}
          width={`45%`}
          padding={`0 75px 0 0`}
          borderRight={`1px solid #111111`}
        >
          <Wrapper width={`auto`} fontSize={`22px`} fontWeight={`600`}>
            2021 - 05 - 16 일요일
          </Wrapper>

          <Wrapper
            dr={`row`}
            width={`auto`}
            margin={`10px 0 0`}
            fontSize={`22px`}
            fontWeight={`600`}
          >
            <Wrapper
              isRelative={true}
              bottom={`1px`}
              width={`auto`}
              margin={`0 4px 0 0`}
              fontWeight={`900`}
            >
              <GiPositionMarker size={22} />
            </Wrapper>
            서울 — 강남구
          </Wrapper>

          <Wrapper margin={`60px 0`} fontSize={`210px`} fontWeight={`900`}>
            - 22 °
          </Wrapper>

          <Wrapper>
            <Image src={``} />

            <Wrapper>비, 어제보다 2도 낮아요</Wrapper>

            <Wrapper>
              미세먼지 <SpanText>보통</SpanText>
            </Wrapper>
          </Wrapper>
        </Wrapper>

        <Wrapper
          ju={`flex-start`}
          al={`flex-start`}
          width={`55%`}
          padding={`0 0 0 75px`}
        >
          2
        </Wrapper>
      </Wrapper>
    </WholeWrapper>
  );
};

export default MM00Presenter;
