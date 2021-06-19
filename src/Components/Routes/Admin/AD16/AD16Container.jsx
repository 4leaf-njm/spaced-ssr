import React, { useEffect, useState } from "react";
import AD16Presenter from "./AD16Presenter";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  GET_USERS,
  EXIT_USER,
  GET_BUSERS_BY_BLACK,
  CANCEL_BLACK_BUSER,
} from "./AD16Queries.js";
import { toast } from "react-nextjs-toast";
import storageFn from "../../../../fsStorage";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export default () => {
  ////////////// - USE STATE- ///////////////
  const [currentTab, setCurrentTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const [searchValue, setSearchValue] = useState("");

  const [currentData, setCurrentData] = useState(null);

  ////////////// - VARIABLE- ////////////////

  ////////////// - USE QUERY- ///////////////
  const {
    data: userDatum,
    loading: userLoading,
    refetch: userRefetch,
  } = useQuery(GET_BUSERS_BY_BLACK, {
    variables: {
      searchValue,
    },
  });

  ///////////// - USE MUTATION- /////////////
  const [cancelBlackBUserMutation] = useMutation(CANCEL_BLACK_BUSER);

  ///////////// - EVENT HANDLER- ////////////
  const blackCancleHandler = (id) => {
    confirmAlert({
      title: "CANCEL BLACKLIST",
      message: "선택하신 블랙리스트 회원을 정상처리 하시겠습니까?",
      buttons: [
        {
          label: "취소",
          onClick: () => {
            return false;
          },
        },
        {
          label: "확인",
          onClick: () => blackCancleHandlerAfter(id),
        },
      ],
    });
  };

  const blackCancleHandlerAfter = async (id) => {
    const { data } = await cancelBlackBUserMutation({
      variables: {
        id,
      },
    });

    if (data.cancelblackBUser) {
      toast.notify("CANCLE BLACKLIST!", {
        duration: 5,
        type: "info",
      });
      userRefetch();
    } else {
      toast.notify("처리 중 문제가 발생했습니다. 개발사에게 문의해주세요.", {
        duration: 5,
        type: "error",
      });
    }
  };

  ////////////// - USE EFFECT- //////////////
  useEffect(() => {
    userRefetch();
  }, []);

  return (
    <AD16Presenter
      currentTab={currentTab}
      setCurrentTab={setCurrentTab}
      isLoading={isLoading}
      openDialog={openDialog}
      currentData={currentData}
      //
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      //
      userDatum={userDatum && userDatum.getBUsersByBlack}
      //
      blackCancleHandler={blackCancleHandler}
    />
  );
};
