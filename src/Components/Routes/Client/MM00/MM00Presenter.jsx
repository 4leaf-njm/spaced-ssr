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
import NewsSlider from "../../../slider/NewsSlider";

const MM00Presenter = ({
  width,
  //
  logoPath,
  year,
  month,
  day,
  week,
  hours,
  minutes,
  ampm,
  currentWeather,
  yesterDayWeather,
  currentAddress,
  //
  newsDatum,
}) => {
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
          ju={`space-between`}
          al={`flex-start`}
          width={`45%`}
          padding={`0 75px 0 0`}
          borderRight={`1px solid #111111`}
        >
          <Wrapper al={`flex-start`}>
            <Wrapper
              dr={`row`}
              width={`auto`}
              fontSize={`36px`}
              fontWeight={`600`}
              visibility={year && month && day && week ? `visible` : `hidden`}
            >
              {year} - {month} - {day}
              <SpanText padding={`0 0 0 18px`} fontSize={`32px`}>
                {week}
              </SpanText>
            </Wrapper>

            <Wrapper
              dr={`row`}
              width={`auto`}
              margin={`15px 0 0`}
              fontSize={`32px`}
              fontWeight={`600`}
              visibility={currentAddress ? `visible` : `hidden`}
            >
              <Wrapper
                isRelative={true}
                bottom={`1px`}
                width={`auto`}
                margin={`0 4px 0 0`}
                fontWeight={`900`}
              >
                <GiPositionMarker size={28} />
              </Wrapper>
              <SpanText padding={`0 8px 0 0`} fontWeight={`900`}>
                {currentAddress && currentAddress.region_1depth_name}
              </SpanText>
              — {currentAddress && currentAddress.region_2depth_name}
            </Wrapper>
          </Wrapper>

          <Wrapper
            isRelative={true}
            top={`30px`}
            ju={`flex-end`}
            fontSize={`240px`}
            fontWeight={`900`}
            lineHeight={`100%`}
          >
            - 22 °
          </Wrapper>

          <Wrapper>
            <Image
              src={`https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/SPACE%2Fassets%2Fimages%2Fweather%2F01d.png?alt=media&token=4614ae87-4bdc-4378-a648-f52ff3f93fb0`}
              margin={`0 0 15px`}
              width={`auto`}
              height={`auto`}
            />

            <Wrapper margin={`0 0 40px`} fontSize={`45px`} fontWeight={`600`}>
              비, 어제보다 2도 낮아요
            </Wrapper>

            <Wrapper dr={`row`}>
              <Wrapper dr={`row`} width={`auto`} fontSize={`28px`}>
                미세먼지
                <SpanText padding={`0 12px 0 20px`} fontWeight={`900`}>
                  보통
                </SpanText>
                <SpanText fontSize={`20px`} fontWeight={`700`}>
                  58㎍/㎥
                </SpanText>
              </Wrapper>

              <Wrapper
                dr={`row`}
                width={`auto`}
                margin={`0 0 0 35px`}
                fontSize={`28px`}
              >
                초미세먼지
                <SpanText padding={`0 12px 0 20px`} fontWeight={`900`}>
                  좋음
                </SpanText>
                <SpanText fontSize={`20px`} fontWeight={`700`}>
                  20㎍/㎥
                </SpanText>
              </Wrapper>
            </Wrapper>

            <Wrapper
              dr={`row`}
              ju={`space-around`}
              al={`flex-start`}
              margin={`90px 0 0`}
            >
              <Wrapper padding={`0 10px`} width={`auto`}>
                <Wrapper
                  margin={`0 0 10px`}
                  width={`auto`}
                  fontSize={`19px`}
                  fontWeight={`900`}
                >
                  MON
                </Wrapper>

                <Image
                  src={`https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/SPACE%2Fassets%2Fimages%2Fweather%2F01d.png?alt=media&token=4614ae87-4bdc-4378-a648-f52ff3f93fb0`}
                  margin={`0 0 5px`}
                  width={`80px`}
                  height={`auto`}
                />
                <Wrapper width={`auto`} fontSize={`17px`} fontWeight={`900`}>
                  25°/14°
                </Wrapper>
              </Wrapper>

              <Wrapper padding={`0 10px`} width={`auto`}>
                <Wrapper
                  margin={`0 0 10px`}
                  width={`auto`}
                  fontSize={`19px`}
                  fontWeight={`900`}
                >
                  MON
                </Wrapper>

                <Image
                  src={`https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/SPACE%2Fassets%2Fimages%2Fweather%2F01d.png?alt=media&token=4614ae87-4bdc-4378-a648-f52ff3f93fb0`}
                  margin={`0 0 5px`}
                  width={`80px`}
                  height={`auto`}
                />
                <Wrapper width={`auto`} fontSize={`17px`} fontWeight={`900`}>
                  25°/14°
                </Wrapper>
              </Wrapper>

              <Wrapper padding={`0 10px`} width={`auto`}>
                <Wrapper
                  margin={`0 0 10px`}
                  width={`auto`}
                  fontSize={`19px`}
                  fontWeight={`900`}
                >
                  MON
                </Wrapper>

                <Image
                  src={`https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/SPACE%2Fassets%2Fimages%2Fweather%2F01d.png?alt=media&token=4614ae87-4bdc-4378-a648-f52ff3f93fb0`}
                  margin={`0 0 5px`}
                  width={`80px`}
                  height={`auto`}
                />
                <Wrapper width={`auto`} fontSize={`17px`} fontWeight={`900`}>
                  25°/14°
                </Wrapper>
              </Wrapper>

              <Wrapper padding={`0 10px`} width={`auto`}>
                <Wrapper
                  margin={`0 0 10px`}
                  width={`auto`}
                  fontSize={`19px`}
                  fontWeight={`900`}
                >
                  MON
                </Wrapper>

                <Image
                  src={`https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/SPACE%2Fassets%2Fimages%2Fweather%2F01d.png?alt=media&token=4614ae87-4bdc-4378-a648-f52ff3f93fb0`}
                  margin={`0 0 5px`}
                  width={`80px`}
                  height={`auto`}
                />
                <Wrapper width={`auto`} fontSize={`17px`} fontWeight={`900`}>
                  25°/14°
                </Wrapper>
              </Wrapper>

              <Wrapper padding={`0 10px`} width={`auto`}>
                <Wrapper
                  margin={`0 0 10px`}
                  width={`auto`}
                  fontSize={`19px`}
                  fontWeight={`900`}
                >
                  MON
                </Wrapper>

                <Image
                  src={`https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/SPACE%2Fassets%2Fimages%2Fweather%2F01d.png?alt=media&token=4614ae87-4bdc-4378-a648-f52ff3f93fb0`}
                  margin={`0 0 5px`}
                  width={`80px`}
                  height={`auto`}
                />
                <Wrapper width={`auto`} fontSize={`17px`} fontWeight={`900`}>
                  25°/14°
                </Wrapper>
              </Wrapper>

              <Wrapper padding={`0 10px`} width={`auto`}>
                <Wrapper
                  margin={`0 0 10px`}
                  width={`auto`}
                  fontSize={`19px`}
                  fontWeight={`900`}
                >
                  MON
                </Wrapper>

                <Image
                  src={`https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/SPACE%2Fassets%2Fimages%2Fweather%2F01d.png?alt=media&token=4614ae87-4bdc-4378-a648-f52ff3f93fb0`}
                  margin={`0 0 5px`}
                  width={`80px`}
                  height={`auto`}
                />
                <Wrapper width={`auto`} fontSize={`17px`} fontWeight={`900`}>
                  25°/14°
                </Wrapper>
              </Wrapper>
            </Wrapper>
          </Wrapper>
        </Wrapper>

        <Wrapper
          ju={`space-between`}
          al={`flex-start`}
          width={`55%`}
          padding={`0 0 0 75px`}
        >
          <Wrapper
            dr={`row`}
            al={`flex-start`}
            width={`auto`}
            fontSize={`96px`}
            fontWeight={`600`}
            visibility={hours && minutes && ampm ? `visible` : `hidden`}
          >
            {hours}:{minutes}
            <SpanText padding={`0 0 0 10px`} fontSize={`48px`}>
              {ampm}
            </SpanText>
          </Wrapper>

          <Wrapper al={`flex-start`}>
            <Wrapper
              width={`auto`}
              margin={`60px 0 10px`}
              fontSize={`55px`}
              fontWeight={`900`}
            >
              이 시각 주요뉴스
            </Wrapper>

            <NewsSlider datum={newsDatum} />
          </Wrapper>
        </Wrapper>
      </Wrapper>
    </WholeWrapper>
  );
};

export default MM00Presenter;
