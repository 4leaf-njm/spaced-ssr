import React from "react";
import styled from "styled-components";
import { AiOutlineArrowUp } from "react-icons/ai";
import { animateScroll as scroll } from "react-scroll";

const FixedWraper = styled.div`
  width: 40px;
  height: 40px;
  background: rgb(0, 0, 0);
  backdrop-filter: blur(4px);
  position: fixed;
  bottom: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  z-index: 10;
  & svg {
    font-size: 25px;
    margin: 5px 0px;
    cursor: pointer;
    transition: transform 600ms ease-in-out 0s;
  }
  &:hover svg {
    transform: rotateY(360deg);
  }
  @media (max-width: 700px) {
    bottom: 20px;
    right: 20px;
  }
`;

const _moveScroll = (val) => {
  scroll.scrollTo(val);
};

const ScrollTopBtn = () => {
  return (
    <FixedWraper onClick={() => _moveScroll(0)}>
      <AiOutlineArrowUp />
    </FixedWraper>
  );
};

export default ScrollTopBtn;
