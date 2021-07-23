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
  addressList,
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
  dailyWeatherList,
  currentAddress,
  //
  newsDatum,
  fineDustData,
}) => {
  let currentWeatherName = "";

  if (currentWeather)
    currentWeatherName =
      currentWeather.weather[0].icon === `01d`
        ? `맑음`
        : currentWeather.weather[0].icon === `01n`
        ? `맑음`
        : currentWeather.weather[0].icon === `02d`
        ? `흐림`
        : currentWeather.weather[0].icon === `02n`
        ? `흐림`
        : currentWeather.weather[0].icon === `03d`
        ? `흐림`
        : currentWeather.weather[0].icon === `03n`
        ? `흐림`
        : currentWeather.weather[0].icon === `04d`
        ? `흐림`
        : currentWeather.weather[0].icon === `04n`
        ? `흐림`
        : currentWeather.weather[0].icon === `09d`
        ? `비`
        : currentWeather.weather[0].icon === `09n`
        ? `비`
        : currentWeather.weather[0].icon === `10d`
        ? `비`
        : currentWeather.weather[0].icon === `10n`
        ? `비`
        : currentWeather.weather[0].icon === `11d`
        ? `뇌우`
        : currentWeather.weather[0].icon === `11n`
        ? `뇌우`
        : currentWeather.weather[0].icon === `13d`
        ? `눈`
        : currentWeather.weather[0].icon === `13n`
        ? `눈`
        : currentWeather.weather[0].icon === `50d`
        ? `안개`
        : currentWeather.weather[0].icon === `50n`
        ? `안개`
        : ``;
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
          width={`40%`}
          padding={`0 75px 0 0`}
          borderRight={`1px solid #111111`}
        >
          <Wrapper al={`flex-start`}>
            <Wrapper
              dr={`row`}
              width={`auto`}
              fontSize={`36px`}
              fontWeight={`500`}
              visibility={year && month && day && week ? `visible` : `hidden`}
            >
              {year}. {month}. {day}
              <SpanText padding={`0 0 0 18px`} fontSize={`32px`}>
                [{week}]
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
                top={`1px`}
                width={`auto`}
                margin={`0 4px 0 0`}
                fontWeight={`700`}
              >
                <GiPositionMarker size={26} />
              </Wrapper>
              <SpanText padding={`0 8px 0 0`} fontWeight={`700`}>
                {currentAddress &&
                  (addressList.includes(currentAddress.region_1depth_name)
                    ? currentAddress.region_2depth_name
                        .split(` `)[0]
                        .substring(
                          0,
                          currentAddress.region_2depth_name.split(` `)[0]
                            .length - 1
                        )
                    : currentAddress.region_1depth_name)}
              </SpanText>
              {/* — {currentAddress && currentAddress.region_2depth_name} */}
            </Wrapper>
          </Wrapper>

          <Wrapper
            isRelative={true}
            top={`30px`}
            ju={`flex-end`}
            fontSize={`230px`}
            fontWeight={`900`}
            lineHeight={`100%`}
            visibility={currentWeather ? `visible` : `hidden`}
          >
            {currentWeather && Math.round(currentWeather.temp)}°
          </Wrapper>

          <Wrapper>
            <Wrapper
              width={`auto`}
              visibility={currentWeather ? `visible` : `hidden`}
            >
              <Image
                src={
                  currentWeather &&
                  (currentWeather.weather[0].icon === `01d`
                    ? `https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/SPACE%2Fassets%2Fimages%2Fweather%2F01d.png?alt=media&token=4614ae87-4bdc-4378-a648-f52ff3f93fb0`
                    : currentWeather.weather[0].icon === `01n`
                    ? `https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/SPACE%2Fassets%2Fimages%2Fweather%2F01n.png?alt=media&token=a6b878c9-3e4e-408a-819a-f1702ae70041`
                    : currentWeather.weather[0].icon === `02d`
                    ? `https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/SPACE%2Fassets%2Fimages%2Fweather%2F02d.png?alt=media&token=a6b878c9-3e4e-408a-819a-f1702ae70041`
                    : currentWeather.weather[0].icon === `02n`
                    ? `https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/SPACE%2Fassets%2Fimages%2Fweather%2F02n.png?alt=media&token=a6b878c9-3e4e-408a-819a-f1702ae70041`
                    : currentWeather.weather[0].icon === `03d`
                    ? `https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/SPACE%2Fassets%2Fimages%2Fweather%2F03d.png?alt=media&token=a6b878c9-3e4e-408a-819a-f1702ae70041`
                    : currentWeather.weather[0].icon === `03n`
                    ? `https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/SPACE%2Fassets%2Fimages%2Fweather%2F03n.png?alt=media&token=a6b878c9-3e4e-408a-819a-f1702ae70041`
                    : currentWeather.weather[0].icon === `04d`
                    ? `https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/SPACE%2Fassets%2Fimages%2Fweather%2F04d.png?alt=media&token=a6b878c9-3e4e-408a-819a-f1702ae70041`
                    : currentWeather.weather[0].icon === `04n`
                    ? `https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/SPACE%2Fassets%2Fimages%2Fweather%2F04n.png?alt=media&token=a6b878c9-3e4e-408a-819a-f1702ae70041`
                    : currentWeather.weather[0].icon === `09d`
                    ? `https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/SPACE%2Fassets%2Fimages%2Fweather%2F09d.png?alt=media&token=a6b878c9-3e4e-408a-819a-f1702ae70041`
                    : currentWeather.weather[0].icon === `09n`
                    ? `https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/SPACE%2Fassets%2Fimages%2Fweather%2F09n.png?alt=media&token=a6b878c9-3e4e-408a-819a-f1702ae70041`
                    : currentWeather.weather[0].icon === `10d`
                    ? `https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/SPACE%2Fassets%2Fimages%2Fweather%2F10d.png?alt=media&token=a6b878c9-3e4e-408a-819a-f1702ae70041`
                    : currentWeather.weather[0].icon === `10n`
                    ? `https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/SPACE%2Fassets%2Fimages%2Fweather%2F10n.png?alt=media&token=a6b878c9-3e4e-408a-819a-f1702ae70041`
                    : currentWeather.weather[0].icon === `11d`
                    ? `https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/SPACE%2Fassets%2Fimages%2Fweather%2F11d.png?alt=media&token=a6b878c9-3e4e-408a-819a-f1702ae70041`
                    : currentWeather.weather[0].icon === `11n`
                    ? `https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/SPACE%2Fassets%2Fimages%2Fweather%2F11n.png?alt=media&token=a6b878c9-3e4e-408a-819a-f1702ae70041`
                    : currentWeather.weather[0].icon === `13d`
                    ? `https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/SPACE%2Fassets%2Fimages%2Fweather%2F13d.png?alt=media&token=a6b878c9-3e4e-408a-819a-f1702ae70041`
                    : currentWeather.weather[0].icon === `13n`
                    ? `https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/SPACE%2Fassets%2Fimages%2Fweather%2F13n.png?alt=media&token=a6b878c9-3e4e-408a-819a-f1702ae70041`
                    : currentWeather.weather[0].icon === `50d`
                    ? `https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/SPACE%2Fassets%2Fimages%2Fweather%2F50d.png?alt=media&token=a6b878c9-3e4e-408a-819a-f1702ae70041`
                    : currentWeather.weather[0].icon === `50n`
                    ? `https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/SPACE%2Fassets%2Fimages%2Fweather%2F50n.png?alt=media&token=a6b878c9-3e4e-408a-819a-f1702ae70041`
                    : ``)
                }
                margin={`0 0 15px`}
                width={`auto`}
                height={`auto`}
              />
            </Wrapper>

            <Wrapper
              margin={`0 0 40px`}
              fontSize={`45px`}
              fontWeight={`400`}
              visibility={
                currentWeather && currentWeatherName && yesterDayWeather
                  ? `visible`
                  : `hidden`
              }
            >
              {currentWeather &&
                currentWeatherName &&
                yesterDayWeather &&
                (Math.round(currentWeather.temp - yesterDayWeather.temp) > 0
                  ? `${currentWeatherName}, 어제보다 ${Math.round(
                      currentWeather.temp - yesterDayWeather.temp
                    )}도 높아요`
                  : Math.round(currentWeather.temp - yesterDayWeather.temp) < 0
                  ? `${currentWeatherName}, 어제보다 ${Math.round(
                      yesterDayWeather.temp - currentWeather.temp
                    )}도 낮아요`
                  : `${currentWeatherName}, 어제와 0도로 같아요`)}
            </Wrapper>

            <Wrapper
              dr={`row`}
              visibility={fineDustData ? `visible` : `hidden`}
            >
              <Wrapper dr={`row`} width={`auto`} fontSize={`28px`}>
                미세먼지
                <SpanText padding={`0 12px 0 20px`} fontWeight={`900`}>
                  {fineDustData &&
                    (fineDustData.pm10Grade === `1`
                      ? `좋음`
                      : fineDustData.pm10Grade === `2`
                      ? `보통`
                      : fineDustData.pm10Grade === `3`
                      ? `나쁨`
                      : fineDustData.pm10Grade === `4`
                      ? `매우나쁨`
                      : ``)}
                </SpanText>
                <SpanText fontSize={`20px`} fontWeight={`700`}>
                  {fineDustData && fineDustData.pm10Grade
                    ? `${fineDustData.pm10Value}㎍/㎥`
                    : `-`}
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
                  {fineDustData &&
                    (fineDustData.pm25Grade === `1`
                      ? `좋음`
                      : fineDustData.pm25Grade === `2`
                      ? `보통`
                      : fineDustData.pm25Grade === `3`
                      ? `나쁨`
                      : fineDustData.pm25Grade === `4`
                      ? `매우나쁨`
                      : ``)}
                </SpanText>
                <SpanText fontSize={`20px`} fontWeight={`700`}>
                  {fineDustData && fineDustData.pm25Grade
                    ? `${fineDustData.pm25Value}㎍/㎥`
                    : `-`}
                </SpanText>
              </Wrapper>
            </Wrapper>

            <Wrapper
              dr={`row`}
              ju={`space-around`}
              al={`flex-start`}
              margin={`90px 0 0`}
            >
              {dailyWeatherList.slice(0, 7).map((data, idx) => {
                if (idx === 0) return null;

                return (
                  <Wrapper key={idx} padding={`0 10px`} width={`auto`}>
                    <Wrapper
                      margin={`0 0 10px`}
                      width={`auto`}
                      fontSize={`19px`}
                      fontWeight={idx === 0 ? `700` : `400`}
                    >
                      {new Date(data.dt * 1000)
                        .toString()
                        .substring(0, 3)
                        .toUpperCase()}
                    </Wrapper>

                    <Image
                      src={
                        data.weather[0].icon === `01d`
                          ? `https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/SPACE%2Fassets%2Fimages%2Fweather%2F01d.png?alt=media&token=4614ae87-4bdc-4378-a648-f52ff3f93fb0`
                          : data.weather[0].icon === `01n`
                          ? `https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/SPACE%2Fassets%2Fimages%2Fweather%2F01n.png?alt=media&token=a6b878c9-3e4e-408a-819a-f1702ae70041`
                          : data.weather[0].icon === `02d`
                          ? `https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/SPACE%2Fassets%2Fimages%2Fweather%2F02d.png?alt=media&token=a6b878c9-3e4e-408a-819a-f1702ae70041`
                          : data.weather[0].icon === `02n`
                          ? `https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/SPACE%2Fassets%2Fimages%2Fweather%2F02n.png?alt=media&token=a6b878c9-3e4e-408a-819a-f1702ae70041`
                          : data.weather[0].icon === `03d`
                          ? `https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/SPACE%2Fassets%2Fimages%2Fweather%2F03d.png?alt=media&token=a6b878c9-3e4e-408a-819a-f1702ae70041`
                          : data.weather[0].icon === `03n`
                          ? `https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/SPACE%2Fassets%2Fimages%2Fweather%2F03n.png?alt=media&token=a6b878c9-3e4e-408a-819a-f1702ae70041`
                          : data.weather[0].icon === `04d`
                          ? `https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/SPACE%2Fassets%2Fimages%2Fweather%2F04d.png?alt=media&token=a6b878c9-3e4e-408a-819a-f1702ae70041`
                          : data.weather[0].icon === `04n`
                          ? `https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/SPACE%2Fassets%2Fimages%2Fweather%2F04n.png?alt=media&token=a6b878c9-3e4e-408a-819a-f1702ae70041`
                          : data.weather[0].icon === `09d`
                          ? `https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/SPACE%2Fassets%2Fimages%2Fweather%2F09d.png?alt=media&token=a6b878c9-3e4e-408a-819a-f1702ae70041`
                          : data.weather[0].icon === `09n`
                          ? `https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/SPACE%2Fassets%2Fimages%2Fweather%2F09n.png?alt=media&token=a6b878c9-3e4e-408a-819a-f1702ae70041`
                          : data.weather[0].icon === `10d`
                          ? `https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/SPACE%2Fassets%2Fimages%2Fweather%2F10d.png?alt=media&token=a6b878c9-3e4e-408a-819a-f1702ae70041`
                          : data.weather[0].icon === `10n`
                          ? `https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/SPACE%2Fassets%2Fimages%2Fweather%2F10n.png?alt=media&token=a6b878c9-3e4e-408a-819a-f1702ae70041`
                          : data.weather[0].icon === `11d`
                          ? `https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/SPACE%2Fassets%2Fimages%2Fweather%2F11d.png?alt=media&token=a6b878c9-3e4e-408a-819a-f1702ae70041`
                          : data.weather[0].icon === `11n`
                          ? `https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/SPACE%2Fassets%2Fimages%2Fweather%2F11n.png?alt=media&token=a6b878c9-3e4e-408a-819a-f1702ae70041`
                          : data.weather[0].icon === `13d`
                          ? `https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/SPACE%2Fassets%2Fimages%2Fweather%2F13d.png?alt=media&token=a6b878c9-3e4e-408a-819a-f1702ae70041`
                          : data.weather[0].icon === `13n`
                          ? `https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/SPACE%2Fassets%2Fimages%2Fweather%2F13n.png?alt=media&token=a6b878c9-3e4e-408a-819a-f1702ae70041`
                          : data.weather[0].icon === `50d`
                          ? `https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/SPACE%2Fassets%2Fimages%2Fweather%2F50d.png?alt=media&token=a6b878c9-3e4e-408a-819a-f1702ae70041`
                          : data.weather[0].icon === `50n`
                          ? `https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/SPACE%2Fassets%2Fimages%2Fweather%2F50n.png?alt=media&token=a6b878c9-3e4e-408a-819a-f1702ae70041`
                          : ``
                      }
                      margin={`0 0 8px`}
                      width={`78px`}
                      height={`auto`}
                    />
                    <Wrapper
                      width={`auto`}
                      fontSize={`17px`}
                      fontWeight={idx === 0 ? `900` : `400`}
                    >
                      {Math.round(data.temp.min)}°/{Math.round(data.temp.max)}°
                    </Wrapper>
                  </Wrapper>
                );
              })}
            </Wrapper>
          </Wrapper>
        </Wrapper>

        <Wrapper
          ju={`space-between`}
          al={`flex-start`}
          width={`60%`}
          padding={`0 0 0 75px`}
        >
          <Wrapper dr={`row`} ju={`space-between`} al={`flex-end`}>
            <Wrapper
              dr={`row`}
              al={`flex-start`}
              width={`auto`}
              fontSize={`96px`}
              fontWeight={`400`}
              visibility={hours && minutes && ampm ? `visible` : `hidden`}
            >
              {hours}:{minutes}
              <SpanText
                isRelative={true}
                top={`4px`}
                padding={`0 0 0 10px`}
                fontSize={`48px`}
              >
                {ampm}
              </SpanText>
            </Wrapper>

            <Wrapper isRelative={true} right={`10px`} width={`auto`}>
              <Image
                src={`https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/SPACE%2Fassets%2Fimages%2Flogo%2FspaceAdd_logo_b.png?alt=media&token=2c12df80-3370-410c-848a-1cd1976334aa`}
                width={`150px`}
              />
            </Wrapper>
          </Wrapper>

          <Wrapper al={`flex-start`}>
            <Wrapper
              isRelative={true}
              al={`flex-start`}
              margin={`0 0 30px`}
              fontSize={`52px`}
              fontWeight={`600`}
              zIndex={`9999`}
            >
              이 시각 주요뉴스
              <Wrapper
                isAbsolute={true}
                bottom={`-30px`}
                height={`30px`}
                bgColor={`#fff`}
              ></Wrapper>
            </Wrapper>

            <NewsSlider datum={newsDatum} />
          </Wrapper>
        </Wrapper>
      </Wrapper>
    </WholeWrapper>
  );
};

export default MM00Presenter;
