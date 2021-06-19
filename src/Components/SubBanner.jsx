import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import Fade from "react-reveal/Fade";
import { Wrapper, CommonButton } from "../Components/CommonComponents";
import { menus } from "../Components/Routes/Layouts/clientMenus";
import useWindowSize from "./Hooks/useWindowSize";

const SubBannerBox = styled.div`
  width: 100%;
  height: 300px;
  margin-top: 110px;
  margin-bottom: 30px;
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 0px 2px 10px #eee;

  @media (max-width: 700px) {
    margin-top: 90px;
    height: 200px;
  }
`;

const SubBannerTitle = styled.h2`
  font-size: 40px;
  color: ${(props) => props.theme.white_C};
  text-shadow: 1px 1px 1px ${(props) => props.theme.black_C};
  padding: 15px 40px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: ${(props) => props.theme.radius};
  backdrop-filter: blur(10px);

  @media (max-width: 900px) {
    font-size: 40px;
  }

  @media (max-width: 700px) {
    font-size: 30px;
  }

  @media (max-width: 500px) {
    font-size: 20px;
  }
`;

const SubBanner = () => {
  const { width } = useWindowSize();

  const router = useRouter();

  const [subButton, setSubButton] = useState(null);
  const [currentActive, setCurrentActive] = useState(null);

  const path = `/${router.pathname.split("/", 2)[1]}`;

  let btnArr = [];

  menus.map((data) => {
    if (`/${data.menuLink.split("/", 2)[1]}` === path) {
      data.subMenus.length === null && setSubButton([]);
      data.subMenus.map((subData) => {
        btnArr.push({
          name: subData.subMenuName,
          link: subData.subMenuLink,
        });
      });
    }
  });

  if (subButton === null) {
    setSubButton(btnArr);
  }

  let subPath = `/${router.pathname.split("/")[2]}`;
  subPath = subPath.replace(`/`, ``);

  if (currentActive === null || currentActive !== subPath) {
    setCurrentActive(subPath);
  }

  return (
    <SubBannerBox
      src={`https://images.unsplash.com/photo-1558980663-3685c1d673c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60`}
    >
      <Fade bottom delay={0}>
        <SubBannerTitle>
          {currentActive && currentActive.toUpperCase()}
        </SubBannerTitle>
      </Fade>
      <Wrapper dr={`row`} margin={`30px 0px 0px`} wrap={`inherit`}>
        {subButton &&
          subButton.map((data, idx) => {
            return (
              <Fade key={idx} delay={50 * idx}>
                <Link exact href={data.link}>
                  <CommonButton
                    width={width < 700 ? `115px` : `160px`}
                    kindOf={
                      data.name.toUpperCase() !== currentActive.toUpperCase() &&
                      `white`
                    }
                    margin={`0px 3px`}
                  >
                    {data.name}
                  </CommonButton>
                </Link>
              </Fade>
            );
          })}
        {/* <CommonButton margin={`0px 3px`}>active</CommonButton> */}
      </Wrapper>
    </SubBannerBox>
  );
};

export default SubBanner;
