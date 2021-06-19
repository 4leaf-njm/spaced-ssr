import React from "react";
import dynamic from "next/dynamic";
import { WholeWrapper } from "../../../../Components/CommonComponents";
import styled from "styled-components";

const Popup = dynamic(import("../../../popup/Popup.jsx"));
const MainSlider = dynamic(import("../../../slider/MainSlider.jsx"));

const MM00Presenter = ({
  width,
  //
  mobileBannerData,
  mainBannerData,
}) => {
  return (
    <WholeWrapper isRelative={true} zIndex={`1`}>
      <MainSlider datum={width < 700 ? mobileBannerData : mainBannerData} />
      <h1>Hello 4LEAF</h1>

      <Popup />
    </WholeWrapper>
  );
};

export default MM00Presenter;
