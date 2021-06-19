import React, { useState, useEffect } from "react";
import {
  WholeWrapper,
  Wrapper,
  TextInput,
  CommonButton,
} from "../../AdminCommonComponents";
import { GET_USER_LOGIN_RESULT_FOR_ADMIN } from "./A_LayoutQueries";
import useInput from "../../../Components/Hooks/useInput";
import { useQuery } from "@apollo/react-hooks";
import { toast } from "react-nextjs-toast";
import { useRouter } from "next/router";
import Theme from "../../../Styles/Theme";
import { useCookies } from "react-cookie";
import { checkCookie } from "../../../commonUtils";
import crypto from "crypto";

const A_Login = () => {
  ////////////// - VARIABLES - ///////////////
  const router = useRouter();

  ////////////// - USE STATE - ///////////////
  const [loginSkip, setLoginSkip] = useState(true);
  const inputUserId = useInput("");
  const inputUserPassword = useInput("");

  const [cookie, setCookie] = useCookies();

  ////////////// - USE QUERY - ///////////////
  const {
    data: loginResult,
    loading: loginLoading,
    refetch: loginRefetch,
  } = useQuery(GET_USER_LOGIN_RESULT_FOR_ADMIN, {
    variables: {
      userId: inputUserId.value,
      userPassword: inputUserPassword.value,
    },
    fetchPolicy: "no-cache",
    skip: loginSkip,
  });

  ////////////// - USE MUTATION - ///////////////

  ////////////// - EVENT HANDLER - ///////////////
  const _loginUserHanlder = async () => {
    if (!inputUserId.value || inputUserId.value.trim() === "") {
      toast.notify("아이디를 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (!inputUserPassword.value || inputUserId.value.trim() === "") {
      toast.notify("비밀번호를 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    await setLoginSkip(false);
  };

  ////////////// - USE EFFECT - ///////////////
  useEffect(() => {
    if (loginResult) {
      const userData = loginResult.getUserLoginResultForAdmin;
      if (userData === "Not Find") {
        toast.notify("아이디와 비밀번호를 확인해주세요.", {
          duration: 5,
          type: "error",
        });
        setLoginSkip(true);
        return;
      }
      if (userData === "Error") {
        toast.notify("처리 중 문제가 발생했습니다. 개발사에게 문의해주세요.", {
          duration: 5,
          type: "error",
        });
        setLoginSkip(true);
        return;
      }

      const decipher = crypto.createDecipher(
        "aes-256-cbc",
        process.env.KEY_VALUE
      );
      let result = decipher.update(userData, "base64", "utf8");
      result += decipher.final("utf8");

      const finalResult = JSON.parse(result);

      setCookie("info", finalResult, {
        maxAge: 60 * 30,
      });

      toast.notify("로그인에 성공했습니다.", {
        duration: 5,
        type: "success",
      });
      router.push(`/admin/main`);
    }
  }, [loginResult]);

  useEffect(() => {
    const userInfo = cookie["info"];
    const checkUser = checkCookie(userInfo);

    if (checkUser) {
      router.push(`/admin/main`);
    }
  }, []);

  useEffect(() => {
    const userInfo = cookie["info"];

    if (userInfo) {
      setCookie("info", userInfo, {
        maxAge: 60 * 30,
      });
    }
  }, [router.pathname]);

  return (
    <WholeWrapper
      height={`100%`}
      bgImg={`url("https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/POLLY-TELLY%2Fassets%2Fimages%2Fbackground%2F9176.jpg?alt=media&token=0f9599d2-a2a0-4573-9a3f-1f89f6c17218")`}
    >
      <Wrapper
        width={`500px`}
        height={`400px`}
        bgColor={`rgba(0, 0, 0, 0.6)`}
        color={Theme.white_C}
        isBorder={true}
        shadow={`0px 5px 10px ${Theme.grey_C}`}
      >
        <Wrapper
          fontWeight={`800`}
          fontSize={`30px`}
          color={Theme.white_C}
          margin={`0 0 30px`}
        >
          ADMIN LOGIN
        </Wrapper>
        <Wrapper dr={`row`} margin={`15px 0`}>
          <Wrapper width={`100px`} color={Theme.white_C} al={`flex-start`}>
            아이디
          </Wrapper>
          <TextInput
            width={`250px`}
            className="login__input"
            type="text"
            {...inputUserId}
            onKeyDown={(e) => e.keyCode === 13 && _loginUserHanlder()}
          />
        </Wrapper>
        <Wrapper dr={`row`}>
          <Wrapper width={`100px`} color={Theme.white_C} al={`flex-start`}>
            비밀번호
          </Wrapper>
          <TextInput
            width={`250px`}
            className="login__input"
            type="password"
            {...inputUserPassword}
            onKeyDown={(e) => e.keyCode === 13 && _loginUserHanlder()}
          />
        </Wrapper>
        <CommonButton
          width={`300px`}
          margin={`50px 0px 0px`}
          className="login__btn"
          onClick={_loginUserHanlder}
        >
          로그인
        </CommonButton>
      </Wrapper>
    </WholeWrapper>
  );
};

export default A_Login;
