import React, { useEffect, useState } from "react";
import AD10Presenter from "./AD10Presenter";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  GET_ALL_USER,
  MODIFY_EXIT_USER,
  MODIFY_BLACK_USER,
} from "./AD10Queries.js";
import { toast } from "react-nextjs-toast";
import storageFn from "../../../../fsStorage";
import useInput from "../../../../Components/Hooks/useInput";
import confirm from "../../../../Components/confirm/confirm";

export default () => {
  ////////////// - USE STATE- ///////////////
  const [currentTab, setCurrentTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);

  const searchName = useInput("");

  const [currentData, setCurrentData] = useState(null);

  ////////////// - VARIABLE- ////////////////

  ////////////// - USE QUERY- ///////////////
  const { data: uDatum, refetch: uRefetch } = useQuery(GET_ALL_USER, {
    variables: {
      searchName: searchName.value,
    },
  });

  ///////////// - USE MUTATION- /////////////
  const [modifyExitUserMutation] = useMutation(MODIFY_EXIT_USER);
  const [modifyBlackUserMutation] = useMutation(MODIFY_BLACK_USER);

  ///////////// - EVENT HANDLER- ////////////
  const dialogToggle = (data = null) => {
    setOpenDialog(!openDialog);
    setCurrentData(data);
  };

  const blackListHandler = (current) => {
    if (current !== false) {
      toast.notify("이미 처리 되어있습니다.", {
        duration: 5,
        type: "error",
      });

      return;
    }

    confirm(
      `USER CONTROLL`,
      `현재 사용자를 정지 하시겠습니까?`,
      blackListHandlerAfter,
      currentData._id
    );
  };

  const blackListHandlerAfter = async (id) => {
    const { data } = await modifyBlackUserMutation({
      variables: {
        id,
      },
    });

    if (data.modifyBlackUser) {
      toast.notify("처리 완료 되었습니다.", {
        duration: 5,
        type: "info",
      });
      dialogToggle();
      uRefetch();
    } else {
      toast.notify("처리 중 문제가 발생했습니다. 개발사에게 문의해주세요.", {
        duration: 5,
        type: "error",
      });
    }
  };

  const exitHandler = (current) => {
    if (current !== false) {
      toast.notify("이미 처리 되어있습니다.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    confirm(
      `USER CONTROLL`,
      `현재 사용자를 탈퇴 하시겠습니까?`,
      exitHandlerAfter,
      currentData._id
    );
  };

  const exitHandlerAfter = async (id) => {
    const { data } = await modifyExitUserMutation({
      variables: {
        id,
      },
    });

    if (data.modifyExitUser) {
      toast.notify("처리 완료 되었습니다.", {
        duration: 5,
        type: "info",
      });
      dialogToggle();
      uRefetch();
    } else {
      toast.notify("처리 중 문제가 발생했습니다. 개발사에게 문의해주세요.", {
        duration: 5,
        type: "error",
      });
    }
  };

  ////////////// - USE EFFECT- //////////////
  useEffect(() => {
    uRefetch();
    setCurrentData(null);
  }, []);

  return (
    <AD10Presenter
      currentTab={currentTab}
      setCurrentTab={setCurrentTab}
      isLoading={isLoading}
      searchName={searchName}
      openDialog={openDialog}
      currentData={currentData}
      //
      uDatum={uDatum && uDatum.getAllUser}
      //
      dialogToggle={dialogToggle}
      blackListHandler={blackListHandler}
      exitHandler={exitHandler}
    />
  );
};
