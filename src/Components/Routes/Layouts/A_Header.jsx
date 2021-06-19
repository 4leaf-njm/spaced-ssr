import React from "react";
import styled from "styled-components";
import {
  WholeWrapper,
  Wrapper,
} from "../../../Components/AdminCommonComponents";
import Theme from "../../../Styles/Theme";

const A_logo = styled.img`
  width: ${(props) => props.width || `180px`};
  margin: 0px 10px;
`;

const A_Header = () => {
  return (
    <WholeWrapper
      height={`40px`}
      dr={`row`}
      al={`flex-start`}
      ju={`space-between`}
      padding={`0px 10px 0 0`}
      bgColor={Theme.black_C}
      color={Theme.white_C}
    >
      <Wrapper
        height={`100%`}
        dr={`row`}
        al={`center`}
        ju={`flex-start`}
        color={`#fff`}
      >
        <A_logo
          alt="logo"
          src={`https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/E-BOOK3%2Fassets%2Fimages%2Flogo%2Flogo.png?alt=media&token=3956abaf-6158-4c4a-9726-cc181313c757`}
        />
        관리자 페이지에 오신걸 환영합니다.
      </Wrapper>
      <A_logo
        width={`150px`}
        alt="logo"
        src={`https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/4leaf%2Flogo%2F4leafsoftware_logo_LW.png?alt=media&token=bc68284c-e82a-42ee-b4c4-a95e0ebc699e`}
      />
    </WholeWrapper>
  );
};

export default A_Header;
