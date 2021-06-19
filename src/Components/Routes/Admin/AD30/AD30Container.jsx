import React, { useEffect, useState, useRef } from "react";
import AD30Presenter from "./AD30Presenter";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  CREATE_SNS,
  GET_ALL_SNS,
  UPDATE_SNS,
  DELETE_SNS,
} from "./AD30Queries.js";
import { toast } from "react-nextjs-toast";
import storageFn from "../../../../fsStorage";
import useInput from "../../../../Components/Hooks/useInput";
import { emptyCheck, resizeImage } from "../../../../commonUtils";
import confirm from "../../../../Components/confirm/confirm";
import { progressLoading } from "../../../../commonUtils";
import { useRouter } from "next/router";

export default () => {
  ////////////// - USE STATE- //////////////////
  const [currentTab, setCurrentTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const fileUploadProgress = useInput(null);

  const [modalFlag, setModalFlag] = useState(``);
  const [modalFlag2, setModalFlag2] = useState(``);

  const platformInput = useInput(``);
  const urlInput = useInput(``);

  const idUpset = useInput(``);
  const platformUpset = useInput(``);
  const urlUpset = useInput(``);

  ////////////// - USE REF- ////////////////////
  const fileRef = useRef();

  ////////////// - VARIABLE- ///////////////////
  const router = useRouter();

  ////////////// - USE QUERY- /////////////////

  const { data: snsDatum, refetch: snsRefetch } = useQuery(GET_ALL_SNS);

  ////////////// - USE MUTATION- //////////////
  const [createSnsMutation] = useMutation(CREATE_SNS);
  const [updateSnsMutation] = useMutation(UPDATE_SNS);
  const [deleteSnsMutation] = useMutation(DELETE_SNS);

  ////////////// - USE HANDLER- ///////////////
  const fileChangeHandler = async (e) => {
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

  const modalHandler = () => {
    setModalFlag(!modalFlag);
  };

  const modalHandler2 = (id = "", platform = "", url = "") => {
    setModalFlag2(!modalFlag2);

    if (modalFlag2) {
      platformUpset.setValue(``);
      urlUpset.setValue(``);
    } else {
      idUpset.setValue(id);
      platformUpset.setValue(platform);
      urlUpset.setValue(url);
    }
  };

  const createSnsHandler = () => {
    confirm(
      `CREATE`,
      `SNS LINK를 추가하시겠습니까 ?`,
      createSnsHandlerAfter,
      null
    );
  };

  const createSnsHandlerAfter = async () => {
    if (!emptyCheck(platformInput.value)) {
      toast.notify("SNS 이름은 필수 입력사항 입니다.", {
        duration: 5,
        type: "error",
      });
      return;
    }
    if (!emptyCheck(urlInput.value)) {
      toast.notify("SNS 링크는 필수 입력사항 입니다.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    const { data } = await createSnsMutation({
      variables: {
        platform: platformInput.value,
        url: urlInput.value,
      },
    });

    if (data.createSns) {
      toast.notify("SNS LINK가 추가 되었습니다.", {
        duration: 5,
        type: "success",
      });
      modalHandler();
      snsRefetch();
      platformInput.setValue(``);
      urlInput.setValue(``);
    } else {
      toast.notify("SNS LINK 추가에 실패했습니다.", {
        duration: 5,
        type: "error",
      });
    }
  };

  const updateSnsHandler = () => {
    confirm(
      `UPDATE`,
      `SNS LINK를 수정하시겠습니까?`,
      updateSnsHandlerAfter,
      null
    );
  };

  const updateSnsHandlerAfter = async () => {
    if (!emptyCheck(platformUpset.value)) {
      toast.notify("SNS 이름은 필수 입력사항 입니다.", {
        duration: 5,
        type: "error",
      });
      return;
    }
    if (!emptyCheck(urlUpset.value)) {
      toast.notify("SNS 링크는 필수 입력사항 입니다.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    const { data } = await updateSnsMutation({
      variables: {
        id: idUpset.value,
        platform: platformUpset.value,
        url: urlUpset.value,
      },
    });

    if (data.updateSns) {
      toast.notify("SNS LINK가 수정되었습니다.", {
        duration: 5,
        type: "success",
      });
      modalHandler2();
      snsRefetch();
      return;
    } else {
      toast.notify("SNS LINK 추가에 실패했습니다.", {
        duration: 5,
        type: "error",
      });
    }
  };

  const deleteSnsHandler = (id) => {
    confirm(
      `DELETE`,
      `SNS LINK를 삭제하시겠습니까?`,
      deleteSnsHandlerAfter,
      id
    );
  };

  const deleteSnsHandlerAfter = async (id) => {
    const { data } = await deleteSnsMutation({
      variables: {
        id,
        isDelete: true,
      },
    });

    if (data.deleteSns) {
      toast.notify("SNS LINK를 삭제했습니다.", {
        duration: 5,
        type: "success",
      });
      snsRefetch();
    } else {
      toast.notify("SNS LINK 삭제에 실패했습니다.", {
        duration: 5,
        type: "error",
      });
    }
  };
  ////////////// - USE EFFECT- ///////////////
  useEffect(() => {
    snsRefetch();
  }, []);

  useEffect(() => {}, [currentTab]);

  return (
    <AD30Presenter
      currentTab={currentTab}
      setCurrentTab={setCurrentTab}
      isLoading={isLoading}
      fileUploadProgress={fileUploadProgress}
      modalFlag={modalFlag}
      modalFlag2={modalFlag2}
      platformInput={platformInput}
      urlInput={urlInput}
      platformUpset={platformUpset}
      urlUpset={urlUpset}
      //
      fileRef={fileRef}
      //
      snsDatum={snsDatum && snsDatum.getAllSns}
      //
      fileChangeHandler={fileChangeHandler}
      modalHandler={modalHandler}
      modalHandler2={modalHandler2}
      createSnsHandler={createSnsHandler}
      updateSnsHandler={updateSnsHandler}
      deleteSnsHandler={deleteSnsHandler}
    />
  );
};
