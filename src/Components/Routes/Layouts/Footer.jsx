import React, { useEffect } from "react";
import {
  WholeWrapper,
  RsWrapper,
  Wrapper,
  Text,
  Image,
} from "../../../Components/CommonComponents";
import { GET_ALL_FOOTER_INFO } from "./LayoutQueries";
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import useWindowSize from "../../Hooks/useWindowSize";
import Theme from "../../../Styles/Theme";

const Footer = () => {
  ////////////// - VARIABLES - ///////////////
  const { width } = useWindowSize();

  ////////////// - USE STATE - ///////////////

  ////////////// - USE QUERY - ///////////////
  const { data: fData, refetch: fRefetch } = useQuery(GET_ALL_FOOTER_INFO);

  useEffect(() => {
    fRefetch();
  }, []);

  return (
    <WholeWrapper
      padding={`100px 0px`}
      bgColor={Theme.darkGrey_C}
      color={Theme.white_C}
    >
      <RsWrapper dr={`row`} ju={`space-around`}>
        <Image
          width={`250px`}
          margin={width < 900 && `0px 0px 20px`}
          alt="logo"
          src={`https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/EBONE%2Fassets%2Fimages%2Flogo%2Flogo-1.png?alt=media&token=4070322e-aa10-4d38-b115-d07e0bb6d11ehttps://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/EBONE%2Fassets%2Fimages%2Flogo%2Flogo-1.png?alt=media&token=4070322e-aa10-4d38-b115-d07e0bb6d11e`}
        />
        <Wrapper
          dr={`row`}
          width={`auto`}
          ju={width < 700 ? `center` : `flex-start`}
        >
          <Wrapper al={width < 700 ? `center` : `flex-start`} width={`auto`}>
            <Text margin={`0px 0px 15px`}>상호</Text>
            <Text margin={width < 700 && `0px 0px 15px`}>대표</Text>
          </Wrapper>
          <Wrapper
            al={width < 700 ? `center` : `flex-start`}
            width={`auto`}
            margin={`0px 35px`}
          >
            <Text margin={`0px 0px 15px`}>사업자 등록번호</Text>
            <Text margin={width < 700 && `0px 0px 15px`}>
              개인정보책임관리자
            </Text>
          </Wrapper>
          <Wrapper al={width < 700 ? `center` : `flex-start`} width={`auto`}>
            <Text margin={`0px 0px 15px`} display={`flex`} dr={`row`}>
              <a href={`mailto:`}>E.</a>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <a href="tel:">C S.</a>
            </Text>
            <Text>A.</Text>
          </Wrapper>
        </Wrapper>
      </RsWrapper>
    </WholeWrapper>
  );
};

export default Footer;
