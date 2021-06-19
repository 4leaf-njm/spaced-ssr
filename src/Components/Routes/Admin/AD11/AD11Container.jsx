import React, { useEffect, useState } from "react";
import AD11Presenter from "./AD11Presenter";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  GET_ALL_BUSER,
  MODIFY_EXIT_BUSER,
  MODIFY_BLACK_BUSER,
  MODIFY_ASSIGNMENT_BUSER,
} from "./AD11Queries.js";
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
  const { data: uDatum, refetch: uRefetch } = useQuery(GET_ALL_BUSER, {
    variables: {
      searchName: searchName.value,
    },
  });

  ///////////// - USE MUTATION- /////////////
  const [modifyExitBUserMutation] = useMutation(MODIFY_EXIT_BUSER);
  const [modifyBlackBUserMutation] = useMutation(MODIFY_BLACK_BUSER);
  const [modifyAssignMentBUserMutation] = useMutation(MODIFY_ASSIGNMENT_BUSER);

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
    const { data } = await modifyBlackBUserMutation({
      variables: {
        id,
      },
    });

    if (data.modifyBlackBUser) {
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
    const { data } = await modifyExitBUserMutation({
      variables: {
        id,
      },
    });

    if (data.modifyExitBUser) {
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

  const assignHandler = (current) => {
    if (current !== false) {
      toast.notify("이미 처리 되어있습니다.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    confirm(
      `USER CONTROLL`,
      `사업자 인증처리를 승인하시겠습니까?`,
      assignHandlerAfter,
      currentData._id
    );
  };

  const assignHandlerAfter = async (id) => {
    const { data } = await modifyAssignMentBUserMutation({
      variables: {
        id,
      },
    });

    if (data.modifyAssignMentBUser) {
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
    <AD11Presenter
      currentTab={currentTab}
      setCurrentTab={setCurrentTab}
      isLoading={isLoading}
      searchName={searchName}
      openDialog={openDialog}
      currentData={currentData}
      //
      uDatum={uDatum && uDatum.getAllBUser}
      //
      dialogToggle={dialogToggle}
      blackListHandler={blackListHandler}
      exitHandler={exitHandler}
      assignHandler={assignHandler}
    />
  );
};
