import React, { useEffect, useState, useRef } from "react";
import AD24Presenter from "./AD24Presenter";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { GET_POPUP_ONE, MODIFY_POPUP } from "./AD24Queries.js";
import { toast } from "react-nextjs-toast";
import storageFn from "../../../../fsStorage";
import useInput from "../../../../Components/Hooks/useInput";
import { emptyCheck, progressLoading } from "../../../../commonUtils";
import confirm from "../../../../Components/confirm/confirm";
import { useRouter } from "next/router";

export default () => {
  ////////////// - USE STATE- ///////////////
  const [currentTab, setCurrentTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const currentTitle = useInput(``);
  const currentCreatedAt = useInput(``);
  const currentUpdatedAt = useInput(``);
  const currentThumbnail = useInput(``);

  const fileUploadProgress = useInput(null);

  ////////////// - USE REF- ////////////////
  const fileRef = useRef();

  ////////////// - VARIABLE- ////////////////
  const router = useRouter();

  ////////////// - USE QUERY- ///////////////

  const { data: nData, refetch: nRefetch } = useQuery(GET_POPUP_ONE, {
    variables: {
      id: router.query[":id"],
    },
  });

  ////////////// - USE MUTATION- //////////////
  const [modifyPopupMutation] = useMutation(MODIFY_POPUP);

  ////////////// - USE HANDLER- //////////////
  const fileChangeHandlerThumbnail = async (e) => {
    process.nextTick(() => {
      setIsLoading(true);
    });

    const realFile = e.target.files[0];

    if (!realFile) {
      setIsLoading(false);
      return;
    }

    const result = await progressLoading(
      realFile,
      "popup",
      fileUploadProgress.setValue,
      currentThumbnail.setValue,
      true, // isResize
      420, // if you use resize function, you must be going to write width that this type is only Integer
      560 // if you use resize function, you should be going to write height that this type is only Integer
    );

    if (result) {
      setIsLoading(false);
      fileRef.current.value = null;
    }
  };

  const popupSaveHandler = () => {
    confirm(
      `팝업 정보 수정`,
      `해당 팝업 정보를 수정하시겠습니까?`,
      popupSaveHandlerAfter,
      null
    );
  };

  const popupSaveHandlerAfter = async () => {
    const { data } = await modifyPopupMutation({
      variables: {
        id: nData.getPopupOne._id,
        title: currentTitle.value,
        thumbnail: currentThumbnail.value,
      },
    });

    if (data.modifyPopup) {
      toast.notify("정보가 수정되었습니다.", {
        duration: 5,
        type: "info",
      });
      router.push(`/admin/popupManagement`);
    } else {
      toast.notify("처리 중 문제가 발생했습니다. 개발사에게 문의해주세요.", {
        duration: 5,
        type: "error",
      });
    }
  };

  const moveListBannerPage = () => {
    confirm(
      "페이지 이동",
      "팝업 목록으로 이동하시겠습니까?",
      moveListBannerPageAfter,
      null
    );
  };

  const moveListBannerPageAfter = () => {
    router.push(`/admin/popupManagement`);
  };

  ////////////// - USE EFFECT- ///////////////
  useEffect(() => {
    nRefetch();
  }, []);

  useEffect(() => {}, [currentTab]);

  useEffect(() => {
    if (nData) {
      currentTitle.setValue(nData.getPopupOne.title);
      currentCreatedAt.setValue(nData.getPopupOne.createdAt);
      currentUpdatedAt.setValue(nData.getPopupOne.updatedAt);
      currentThumbnail.setValue(nData.getPopupOne.thumbnailPath);
    }
  }, [nData]);

  return (
    <AD24Presenter
      currentTab={currentTab}
      setCurrentTab={setCurrentTab}
      isLoading={isLoading}
      currentTitle={currentTitle}
      currentCreatedAt={currentCreatedAt}
      currentUpdatedAt={currentUpdatedAt}
      currentThumbnail={currentThumbnail}
      fileUploadProgress={fileUploadProgress}
      //
      fileRef={fileRef}
      //
      nData={nData && nData.getPopupOne}
      //
      fileChangeHandlerThumbnail={fileChangeHandlerThumbnail}
      popupSaveHandler={popupSaveHandler}
      moveListBannerPage={moveListBannerPage}
    />
  );
};
