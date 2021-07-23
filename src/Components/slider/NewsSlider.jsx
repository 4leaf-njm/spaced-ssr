import React, { useState, useLayoutEffect } from "react";
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import styled from "styled-components";
import { Wrapper } from "../../Components/CommonComponents";

SwiperCore.use([Autoplay]);

const Container = styled(Wrapper)`
  & .swiper-container {
    margin: 0;
    width: 100%;
    height: 460px;
  }

  & .swiper-slide {
    display: flex;
    align-items: flex-end;
  }
`;

const NewsContent = styled(Wrapper)`
  color: #000;
  font-size: 30px;
  font-weight: 400;
  display: block;
  width: 100%;
  height: 100%;
  line-height: 122px;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const NewsSlider = ({ datum }) => {
  return (
    <Container>
      <Swiper
        slidesPerView={6}
        slidesPerGroup={6}
        direction={`vertical`}
        loop={true}
        autoplay={{ delay: 60000 * 30 }}
      >
        {datum &&
          datum.map((data, index) => {
            return (
              <SwiperSlide key={index}>
                <NewsContent>{data.title}</NewsContent>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </Container>
  );
};

export default NewsSlider;
