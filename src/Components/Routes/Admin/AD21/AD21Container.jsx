import React, { useEffect, useState, useRef } from "react";
import AD21Presenter from "./AD21Presenter";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { GET_MAINBANNER_ONE, MODIFY_MAINBANNER } from "./AD21Queries.js";
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

  const [editContent, setEditContent] = useState("");

  const currentTitle = useInput(``);
  const currentLink = useInput(``);
  const currentCreatedAt = useInput(``);
  const currentUpdatedAt = useInput(``);
  const currentDesc = useInput(``);
  const currentThumbnail = useInput(``);

  const fileUploadProgress = useInput(null);

  ////////////// - USE REF- ////////////////
  const fileRef = useRef();

  ////////////// - VARIABLE- ////////////////
  const router = useRouter();

  ////////////// - USE QUERY- ///////////////

  const { data: nData, refetch: nRefetch } = useQuery(GET_MAINBANNER_ONE, {
    variables: {
      id: router.query[":id"],
    },
  });

  ////////////// - USE MUTATION- //////////////
  const [modifyMainBannerMutation] = useMutation(MODIFY_MAINBANNER);

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
      "mainBanner",
      fileUploadProgress.setValue,
      currentThumbnail.setValue,
      true, // isResize
      1920, // if you use resize function, you must be going to write width that this type is only Integer
      null // if you use resize function, you should be going to write height that this type is only Integer
    );

    if (result) {
      setIsLoading(false);
      fileRef.current.value = null;
    }
  };

  const mainBannerSaveHandler = () => {
    confirm(
      `베너 정보 수정`,
      `해당 베너 정보를 수정하시겠습니까?`,
      mainBannerSaveHandlerAfter,
      null
    );
  };

  const mainBannerSaveHandlerAfter = async () => {
    const { data } = await modifyMainBannerMutation({
      variables: {
        id: nData.getMainBannerOne._id,
        title: currentTitle.value,
        link: currentLink.value,
        desc: editContent,
        thumbnail: currentThumbnail.value,
      },
    });

    if (data.modifyMainBanner) {
      toast.notify("정보가 수정되었습니다.", {
        duration: 5,
        type: "info",
      });
      router.push(`/admin/mainBannerManagement`);
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
      "게시글 목록으로 이동하시겠습니까?",
      moveListBannerPageAfter,
      null
    );
  };

  const moveListBannerPageAfter = () => {
    router.push(`/admin/mainBannerManagement`);
  };

  ////////////// - USE EFFECT- ///////////////
  useEffect(() => {
    nRefetch();
  }, []);

  useEffect(() => {}, [currentTab]);

  useEffect(() => {
    if (nData) {
      currentTitle.setValue(nData.getMainBannerOne.title);
      currentLink.setValue(nData.getMainBannerOne.link);
      currentCreatedAt.setValue(nData.getMainBannerOne.createdAt);
      currentUpdatedAt.setValue(nData.getMainBannerOne.updatedAt);
      setEditContent(nData.getMainBannerOne.description);
      currentThumbnail.setValue(nData.getMainBannerOne.thumbnailPath);
    }
  }, [nData]);

  return (
    <AD21Presenter
      currentTab={currentTab}
      setCurrentTab={setCurrentTab}
      isLoading={isLoading}
      editContent={editContent}
      setEditContent={setEditContent}
      currentTitle={currentTitle}
      currentLink={currentLink}
      currentCreatedAt={currentCreatedAt}
      currentUpdatedAt={currentUpdatedAt}
      currentDesc={currentDesc}
      currentThumbnail={currentThumbnail}
      fileUploadProgress={fileUploadProgress}
      //
      fileRef={fileRef}
      //
      nData={nData && nData.getMainBannerOne}
      //
      fileChangeHandlerThumbnail={fileChangeHandlerThumbnail}
      mainBannerSaveHandler={mainBannerSaveHandler}
      moveListBannerPage={moveListBannerPage}
    />
  );
};
