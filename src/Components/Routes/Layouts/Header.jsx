import React, { useState, useEffect, useRef } from "react";
import {
  UlWrapper,
  LiWrapper,
  Wrapper,
  CommonButton,
} from "../../../Components/CommonComponents";
import styled from "styled-components";
import {
  appearAnimation,
  fullWidth,
} from "../../../Components/AnimationCommon";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useRouter } from "next/router";
import Drawer from "@material-ui/core/Drawer";
import Bounce from "react-reveal/Bounce";
import Theme from "../../../Styles/Theme";
import Link from "next/link";
import { toast } from "react-nextjs-toast";
import useWindowSize from "../../Hooks/useWindowSize";

const OnlyHeadAbsoluteWrapper = styled.div`
  display: none;
  width: ${(props) => props.width || `100%`};
  height: ${(props) => props.height};
  color: rgba(255, 255, 255, 0.72);
  background: rgba(0, 0, 0, 0.06);
  font-size: 13px;
  flex-direction: ${(props) => props.dr || `row`};
  align-items: ${(props) => props.al || `flex-start`};
  justify-content: ${(props) => props.ju || `center`};
  opacity: 0.3;
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  bottom: ${(props) => props.bottom};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
`;

const HeaderWrapper = styled.div`
  width: ${(props) => props.width || `100%`};
  height: ${(props) => props.height};
  color: ${(props) => props.theme.darkGrey_C};
  display: flex;
  background: ${(props) => props.bgColor || `${props.theme.white_C}`};
  border-bottom: ${(props) =>
    props.borderBottom || `1px solid ${props.theme.lightGrey_C}`};
  color: ${(props) => props.color};
  flex-direction: ${(props) => props.dr || `column`};
  align-items: ${(props) => props.al || `center`};
  justify-content: ${(props) => props.ju || `center`};
  z-index: 1000;
  position: ${(props) => (props.isRelative ? `relative` : ``)};
  position: ${(props) => (props.isFixed ? `fixed` : ``)};
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  bottom: ${(props) => props.bottom};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  transition: 0.4s;

  & .background {
    height: 0;
  }
`;

const H_Wrapper = styled.div`
  width: 1350px;
  height: ${(props) => props.height || `100%`};
  color: ${(props) => props.theme.darkGrey_C};
  display: flex;
  background: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  flex-direction: ${(props) => props.dr || `column`};
  align-items: ${(props) => props.al || `center`};
  justify-content: ${(props) => props.ju || `center`};
  position: ${(props) => (props.isAbsolute ? `absolute` : ``)};
  position: ${(props) => (props.isRelative ? `relative` : ``)};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};

  transition: ${(props) => props.theme.transition};

  &:hover ${OnlyHeadAbsoluteWrapper} {
    display: flex;
    animation: ${appearAnimation} 1s forwards;
  }
  & .Header__menu:hover {
    font-weight: 600;
  }
  & .Header__menu.active {
    font-weight: 600;
  }
  @media (max-width: 1500px) {
    width: 1350px;
  }
  @media (max-width: 1350px) {
    width: 1280px;
  }
  @media (max-width: 1350px) {
    width: 1100px;
  }
  @media (max-width: 1100px) {
    width: 900px;
  }
  @media (max-width: 900px) {
    width: 700px;
    display: none;
  }
`;

const Logo = styled.div`
  width: ${(props) => props.width || `150px`};

  & a {
    width: 100%;
  }

  @media (max-width: 800px) {
    width: 130px;
  }
`;

const LogoImg = styled.img`
  width: 100%;

  @media (max-width: 800px) {
    width: 130px;
  }
`;

const Menu = styled(LiWrapper)`
  position: relative;
  cursor: pointer;

  &:before {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 0;
    width: ${(props) => (props.isActive ? `100%` : `0%`)};
    height: 2px;
    background-color: ${(props) => props.theme.subTheme_C};
  }

  &:after {
    content: "";
    position: absolute;
    top: -5px;
    left: 0;
    width: ${(props) => (props.isActive ? `100%` : `0%`)};
    height: 2px;
    background-color: ${(props) => props.theme.subTheme_C};
  }

  &:hover {
    &:before,
    &:after {
      animation: ${fullWidth} 0.5s forwards;
    }
  }
`;

const MobileHeader = styled.div`
  width: 100%;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  display: none;

  @media (max-width: 900px) {
    display: flex;
  }

  & svg {
    cursor: pointer;
    font-size: 25px;
  }
`;

const MobileMenu = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(#4f58a6, #010c71);
  z-index: 10000;

  & svg {
    cursor: pointer;
    font-size: 25px;
    color: ${(props) => props.theme.white_C};
  }

  & .react-reveal {
    width: 100%;
  }
`;

const MobileSubMenu = styled.li`
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: ${(props) => props.fontSize};
  margin: ${(props) => props.margin};
`;

const Header = () => {
  ////////////// - VARIABLES- ///////////////
  const { width } = useWindowSize();

  const router = useRouter();
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  ////////////// - USE STATE- ///////////////
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubMenu, setMobileSubMenu] = useState(null);
  const [reload, setReload] = useState(false);
  const [headerScroll, setHeaderScroll] = useState(false);
  const [pageY, setPageY] = useState(0);
  const documentRef = useRef(typeof document !== `undefined` ? document : null);
  const [login, setLogin] = useState(
    typeof window !== "undefined"
      ? sessionStorage.getItem("KLJHQOSKXJKDAODU")
      : ""
  );

  ///////////// - EVENT HANDLER- ////////////
  const mobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleScroll = () => {
    const { pageYOffset } = window;
    const deltaY = pageYOffset - pageY;
    const headerScroll = pageYOffset !== 0 && deltaY >= 0;
    setHeaderScroll(headerScroll);
    setPageY(pageYOffset);
  };

  const moveLinkHandler = (link) => {
    router.push(link);
  };

  const logoutHandler = () => {
    if (typeof window === `undefined`) return;

    sessionStorage.removeItem("KLJHQOSKXJKDAODU");
    setLogin("");

    toast.notify("로그아웃이 되었습니다.", {
      duration: 5,
      type: "success",
    });
  };

  ////////////// - USE EFFECT- //////////////
  useEffect(() => {
    setReload(!reload);
  }, [mobileSubMenu]);

  useEffect(() => {
    documentRef.current.addEventListener("scroll", handleScroll);
    return () =>
      documentRef.current.removeEventListener("scroll", handleScroll);
  }, [pageY]);

  return (
    <HeaderWrapper isFixed={true} top={`0px`} left={`0px`}>
      <Wrapper
        className={headerScroll && "background"}
        height={`10px`}
        bgColor={Theme.subTheme_C}
      ></Wrapper>
      <H_Wrapper dr={`row`} margin={`0 auto`}>
        <Wrapper
          height={`100%`}
          dr={`row`}
          al={`center`}
          ju={`space-between`}
          padding={`10px 0px`}
        >
          <Logo>
            <Link href="/">
              <LogoImg
                src={`https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/E-BOOK3%2Fassets%2Fimages%2Flogo%2Flogo.png?alt=media&token=3956abaf-6158-4c4a-9726-cc181313c757`}
                alt="LOGO"
              />
            </Link>
          </Logo>

          <UlWrapper width={`auto`} dr={`row`}>
            <Menu
              onClick={() => moveLinkHandler(`/`)}
              isActive={router.pathname === `/`}
              margin={
                width < 1350 ? (width < 1100 ? `0 15px` : `0 30px`) : `0px 60px`
              }
            >
              HOME
            </Menu>

            <Menu
              onClick={() => moveLinkHandler(`/courses`)}
              isActive={router.pathname === `/courses`}
              margin={
                width < 1350 ? (width < 1100 ? `0 15px` : `0 30px`) : `0px 60px`
              }
            >
              COURSES
            </Menu>

            {login ? (
              <Menu
                onClick={() => moveLinkHandler(`/dashboard`)}
                isActive={router.pathname === `/dashboard`}
                margin={
                  width < 1350
                    ? width < 1100
                      ? `0 15px`
                      : `0 30px`
                    : `0px 60px`
                }
              >
                DASHBOARD
              </Menu>
            ) : (
              <Menu
                onClick={() => moveLinkHandler(`/roadmap`)}
                isActive={router.pathname === `/roadmap`}
                margin={
                  width < 1350
                    ? width < 1100
                      ? `0 15px`
                      : `0 30px`
                    : `0px 60px`
                }
              >
                ROADMAP
              </Menu>
            )}
            <Menu
              onClick={() => moveLinkHandler(`/event`)}
              isActive={router.pathname === `/event`}
              margin={
                width < 1350 ? (width < 1100 ? `0 15px` : `0 30px`) : `0px 60px`
              }
            >
              COMMUNITY
            </Menu>
          </UlWrapper>
          <Wrapper width={`auto`} dr={`row`}>
            {login ? (
              <CommonButton
                width={`100px`}
                margin={`0 5px`}
                onClick={logoutHandler}
              >
                LOGOUT
              </CommonButton>
            ) : (
              <>
                <Link href="/login">
                  <CommonButton width={`100px`} margin={`0 5px`}>
                    LOGIN
                  </CommonButton>
                </Link>
                <Link href="/join">
                  <CommonButton
                    width={`100px`}
                    kindOf={`white`}
                    margin={`0 5px`}
                  >
                    JOIN US
                  </CommonButton>
                </Link>
              </>
            )}
          </Wrapper>
        </Wrapper>
      </H_Wrapper>
      <MobileHeader>
        <Wrapper dr={`row`} ju={`space-between`}>
          <Link href="/login">
            <CommonButton width={`60px`}>LOGIN</CommonButton>
          </Link>
          <Logo>
            <Link href="/">
              <LogoImg
                alt="logo"
                src={`https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/E-BOOK3%2Fassets%2Fimages%2Flogo%2Flogo.png?alt=media&token=3956abaf-6158-4c4a-9726-cc181313c757`}
              />
            </Link>
          </Logo>
          <Wrapper width={`60px`} al={`flex-end`}>
            {mobileMenuOpen ? (
              <AiOutlineClose onClick={mobileMenuToggle} />
            ) : (
              <AiOutlineMenu onClick={mobileMenuToggle} />
            )}
          </Wrapper>
        </Wrapper>

        <Drawer open={mobileMenuOpen} anchor={`right`}>
          <MobileMenu>
            <Wrapper dr={`row`} ju={`flex-end`} padding={`20px 15px`}>
              <AiOutlineClose onClick={mobileMenuToggle} />
            </Wrapper>

            <UlWrapper
              width={`auto`}
              margin={`120px 0px 0px`}
              color={Theme.white_C}
            >
              <Link href="/">
                <Bounce delay={0}>
                  <MobileSubMenu fontSize={`18px`} margin={`25px 0px`}>
                    HOME
                  </MobileSubMenu>
                </Bounce>
              </Link>
              <Link href="/courses">
                <Bounce delay={100}>
                  <MobileSubMenu fontSize={`18px`} margin={`25px 0px`}>
                    COURSES
                  </MobileSubMenu>
                </Bounce>
              </Link>
              <Link href="/dashboard">
                <Bounce delay={200}>
                  <MobileSubMenu fontSize={`18px`} margin={`25px 0px`}>
                    DASHBOARD
                  </MobileSubMenu>
                </Bounce>
              </Link>
              <Link href="/event">
                <Bounce delay={300}>
                  <MobileSubMenu fontSize={`18px`} margin={`25px 0px`}>
                    COMMUNITY
                  </MobileSubMenu>
                </Bounce>
              </Link>
            </UlWrapper>
          </MobileMenu>
        </Drawer>
      </MobileHeader>
    </HeaderWrapper>
  );
};

export default Header;
