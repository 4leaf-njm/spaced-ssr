import React, { useEffect, useState, useRef } from "react";
import AD23Presenter from "./AD23Presenter";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  CREATE_BOARDTYPE,
  DELETE_BOARDTYPE,
  GET_BOARDTYPE,
  UPDATE_BOARDTYPE,
} from "./AD23Queries.js";
import { toast } from "react-nextjs-toast";
import storageFn from "../../../../fsStorage";
import useInput from "../../../../Components/Hooks/useInput";
import { emptyCheck, resizeImage } from "../../../../commonUtils";
import confirm from "../../../../Components/confirm/confirm";
import { progressLoading } from "../../../../commonUtils";
import { useMediaQuery } from "@material-ui/core";
import { confirmAlert } from "react-confirm-alert";
import { useRouter } from "next/router";

export default () => {
  ////////////// - USE REF- ////////////////////
  const fileRef = useRef();

  ////////////// - VARIABLE- ///////////////////
  const router = useRouter();

  ////////////// - USE STATE- //////////////////
  const [currentTab, setCurrentTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const fileUploadProgress = useInput(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [openDialog2, setOpenDialog2] = useState(false);

  const boardInput = useInput(``);
  const typeInput = useInput(``);

  const idUpset = useInput(``);
  const boardUpset = useInput(``);
  const typeUpset = useInput(``);

  ////////////// - USE QUERY- /////////////////
  const {
    data: boardTypeDatum,
    loading: boardTypeLoading,
    refetch: boardTypeRefetch,
  } = useQuery(GET_BOARDTYPE);

  ////////////// - USE MUTATION- //////////////
  const [createBoardTypeMutation] = useMutation(CREATE_BOARDTYPE, {
    variables: {
      title: boardInput.value,
      type: typeInput.value,
    },
  });

  const [updateBoardTypeMutation] = useMutation(UPDATE_BOARDTYPE);
  const [deleteBoardTypeMutation] = useMutation(DELETE_BOARDTYPE);

  ////////////// - USE HANDLER- ///////////////
  const fileChangeHandler = async (e) => {
    // Presenter Logic
    /**
       *   <Image
                src={imagePath}
                width={`350px`}
                height={`350px`}
                isBorder={true}
                margin={`0px 0px 5px 0px`}
              />
              <FileInput
                id="file-js"
                type="file"
                accept="image/jpeg,image/gif,image/png"
                onChange={fileChangeHandler}
                ref={fileRef}
              />
  
              {isLoading ? (
                <Wrapper>
                  {fileUploadProgress.value && (
                    <FileProgress
                      variant="determinate"
                      value={fileUploadProgress.value}
                    />
                  )}
                </Wrapper>
              ) : (
                <FileLabel
                  width={`350px`}
                  htmlFor={`file-js`}
                  margin={`0px 0px 55px 0px`}
                >
                  THUMBNAIL UPLOAD
                </FileLabel>
              )}
       * 
       */

    process.nextTick(() => {
      setIsLoading(true);
    });

    const realFile = e.target.files[0];

    const result = await progressLoading(
      realFile,
      "test", // Foldername
      fileUploadProgress.setValue,
      setCurrentThumbnail,
      true, // isResize
      350, // if you use resize function, you must be going to write width that this type is only Integer
      350 // if you use resize function, you should be going to write height that this type is only Integer
    );

    if (result) {
      setIsLoading(false);
      fileRef.current.value = null;
    }
  };

  const dialogToggleHandler = () => {
    setOpenDialog(!openDialog);
  };

  const dialogToggleHandler2 = (id = "", title = "", type = "") => {
    setOpenDialog2(!openDialog2);

    if (openDialog2) {
      boardUpset.setValue(``);
      typeUpset.setValue(``);
    } else {
      idUpset.setValue(id);
      boardUpset.setValue(title);
      typeUpset.setValue(type);
    }
  };

  const createBoardTypeHandler = async () => {
    if (!emptyCheck(boardInput.value)) {
      toast.notify("게시판명을 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }
    if (!emptyCheck(typeInput.value)) {
      toast.notify("유형명을 선택해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    const { data } = await createBoardTypeMutation();

    if (data.createBoardType) {
      toast.notify("게시판 유형이 추가되었습니다.", {
        duration: 5,
        type: "success",
      });
      boardTypeRefetch();
      boardInput.setValue("");
      dialogToggleHandler();
      typeInput.setValue("");
    } else {
      toast.notify("게시판 유형등록에 실패하였습니다.", {
        duration: 5,
        type: "error",
      });
    }
  };

  const updateBoardTypeHandler = () => {
    if (!emptyCheck(boardUpset.value)) {
      toast.notify("게시판명을 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (!emptyCheck(typeUpset.value)) {
      toast.notify("게시판 유형을 선택해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    confirm(
      `UPDATE`,
      `정보를 수정하시겠습니까?`,
      updateBoardTypeHandlerAfter,
      null
    );
  };

  const updateBoardTypeHandlerAfter = async () => {
    const { data } = await updateBoardTypeMutation({
      variables: {
        id: idUpset.value,
        title: boardUpset.value,
        type: typeUpset.value,
      },
    });

    if (data.updateBoardType) {
      toast.notify("게시판 유형이 수정되었습니다.", {
        duration: 5,
        type: "success",
      });
      dialogToggleHandler2();
      boardTypeRefetch();
    } else {
      toast.notify("게시판 유형 수정에 실패했습니다.", {
        duration: 5,
        type: "error",
      });
    }
  };

  const deleteBoardTypeHandler = (id) => {
    confirm(
      `DELETE`,
      `선택하신 게시판 유형을 삭제하시겠습니까?`,
      deleteBoardTypeHandlerAfter,
      id
    );
  };

  const deleteBoardTypeHandlerAfter = async (id) => {
    const { data } = await deleteBoardTypeMutation({
      variables: {
        id,
      },
    });

    if (data.deleteBoardType) {
      toast.notify("게시판 유형이 삭제되었습니다.", {
        duration: 5,
        type: "success",
      });
      boardTypeRefetch();
    } else {
      toast.notify("게시판 유형 삭제에 실패했습니다.", {
        duration: 5,
        type: "error",
      });
    }
  };

  ////////////// - USE EFFECT- ///////////////
  useEffect(() => {
    boardTypeRefetch();
  }, []);

  useEffect(() => {}, [currentTab]);

  return (
    <AD23Presenter
      currentTab={currentTab}
      setCurrentTab={setCurrentTab}
      isLoading={isLoading}
      fileRef={fileRef}
      fileUploadProgress={fileUploadProgress}
      openDialog={openDialog}
      openDialog2={openDialog2}
      boardInput={boardInput}
      typeInput={typeInput}
      boardUpset={boardUpset}
      typeUpset={typeUpset}
      //
      boardTypeDatum={boardTypeDatum && boardTypeDatum.getBoardType}
      //
      fileChangeHandler={fileChangeHandler}
      dialogToggleHandler={dialogToggleHandler}
      dialogToggleHandler2={dialogToggleHandler2}
      createBoardTypeHandler={createBoardTypeHandler}
      updateBoardTypeHandler={updateBoardTypeHandler}
      deleteBoardTypeHandler={deleteBoardTypeHandler}
    />
  );
};
