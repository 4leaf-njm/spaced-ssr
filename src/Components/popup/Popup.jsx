import React from "react";
import { Wrapper, Image, UlWrapper, LiWrapper } from "../CommonComponents";
import { GET_POPUP_ALL } from "./PopupQueries";
import { useQuery } from "@apollo/react-hooks";
import { withCookies } from "react-cookie";
import useWindowSize from "../Hooks/useWindowSize";

const Popup = ({ cookies }) => {
  ////////////// - VARIABLES- ///////////////
  const { width } = useWindowSize();

  ////////////// - USE QUERY- ///////////////
  const { data: popupDatum } = useQuery(GET_POPUP_ALL);

  ///////////// - EVENT HANDLER- ////////////
  const _closeTodayPopupHandler = (data) => {
    const popup = document.getElementById(`popup-${data._id}-js`);

    popup.style.display = "none";

    cookies.set(`popup-${data._id}`, "y", {
      path: "/",
      maxAge: 60 * 60 * 24,
    });
  };

  const _closePopupHandler = (data) => {
    const popup = document.getElementById(`popup-${data._id}-js`);
    popup.style.display = "none";
  };

  return (
    <Wrapper>
      {popupDatum &&
        popupDatum.getPopupAll.map((data, idx) => {
          if (cookies.get(`popup-${data._id}`) === "y") return null;

          return (
            <Wrapper
              key={idx}
              id={`popup-${data._id}-js`}
              isAbsolute={true}
              top={width > 900 ? `100px` : `70px`}
              right={`50%`}
              zIndex={`${9999 - idx}`}
              shadow={`0px 5px 10px #ccc`}
              margin={
                width > 900
                  ? `${idx * 55}px ${idx * -50}px 0 0`
                  : `0 -165px 0 0`
              }
              width={`330px`}
            >
              <Wrapper>
                <Image src={data.thumbnailPath} height={`450px`} />
              </Wrapper>
              <UlWrapper dr={`row`}>
                <LiWrapper
                  width={`50%`}
                  height={`50px`}
                  lineHeight={`50px`}
                  color={`#576465`}
                  bgColor={`#fff`}
                  borderRight={`1px solid #f8f8f8`}
                  cursor={`pointer`}
                  isRoboto={true}
                  onClick={() => _closeTodayPopupHandler(data)}
                >
                  1일 동안 보지 않음
                </LiWrapper>
                <LiWrapper
                  isAbsolute={true}
                  width={`50%`}
                  height={`50px`}
                  lineHeight={`50px`}
                  color={`#576465`}
                  bgColor={`#fff`}
                  cursor={`pointer`}
                  borderLeft={`1px solid #ededed`}
                  isRoboto={true}
                  onClick={() => _closePopupHandler(data)}
                >
                  닫기
                </LiWrapper>
              </UlWrapper>
            </Wrapper>
          );
        })}
    </Wrapper>
  );
};

export default withCookies(Popup);
