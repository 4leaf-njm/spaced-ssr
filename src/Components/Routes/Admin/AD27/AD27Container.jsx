import React, { useEffect, useState, useRef } from "react";
import AD27Presenter from "./AD27Presenter";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  GET_MOBILEMAINBANNER_ONE,
  MODIFY_MOBILEMAINBANNER,
} from "./AD27Queries.js";
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
  const currentThumbnail = useInput(``);

  const fileUploadProgress = useInput(null);

  ////////////// - USE REF- ////////////////
  const fileRef = useRef();

  ////////////// - VARIABLE- ////////////////
  const router = useRouter();

  ////////////// - USE QUERY- ///////////////

  const { data: nData, refetch: nRefetch } = useQuery(
    GET_MOBILEMAINBANNER_ONE,
    {
      variables: {
        id: router.query.id,
      },
    }
  );

  ////////////// - USE MUTATION- //////////////
  const [modifyMobileMainBannerMutation] = useMutation(MODIFY_MOBILEMAINBANNER);

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
      "mobileMainBanner",
      fileUploadProgress.setValue,
      currentThumbnail.setValue,
      true, // isResize
      425, // if you use resize function, you must be going to write width that this type is only Integer
      null // if you use resize function, you should be going to write height that this type is only Integer
    );

    if (result) {
      setIsLoading(false);
      fileRef.current.value = null;
    }
  };

  const mobileMainBannerSaveHandler = () => {
    confirm(
      `베너 정보 수정`,
      `해당 베너 정보를 수정하시겠습니까?`,
      mobileMainBannerSaveHandlerAfter,
      null
    );
  };

  const mobileMainBannerSaveHandlerAfter = async () => {
    const { data } = await modifyMobileMainBannerMutation({
      variables: {
        id: nData.getMobileMainBannerOne._id,
        title: currentTitle.value,
        link: currentLink.value,
        desc: editContent,
        thumbnail: currentThumbnail.value,
      },
    });

    if (data.modifyMobileMainBanner) {
      toast.notify("정보가 수정되었습니다.", {
        duration: 5,
        type: "info",
      });
      router.push(`/admin/mobileMainBannerManagement`);
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
    router.push(`/admin/mobileMainBannerManagement`);
  };

  ////////////// - USE EFFECT- ///////////////
  useEffect(() => {
    nRefetch();
  }, []);

  useEffect(() => {}, [currentTab]);

  useEffect(() => {
    if (nData) {
      currentTitle.setValue(nData.getMobileMainBannerOne.title);
      currentLink.setValue(nData.getMobileMainBannerOne.link);
      currentCreatedAt.setValue(nData.getMobileMainBannerOne.createdAt);
      currentUpdatedAt.setValue(nData.getMobileMainBannerOne.updatedAt);
      setEditContent(nData.getMobileMainBannerOne.description);
      currentThumbnail.setValue(nData.getMobileMainBannerOne.thumbnailPath);
    }
  }, [nData]);

  return (
    <AD27Presenter
      currentTab={currentTab}
      setCurrentTab={setCurrentTab}
      isLoading={isLoading}
      editContent={editContent}
      setEditContent={setEditContent}
      currentTitle={currentTitle}
      currentLink={currentLink}
      currentCreatedAt={currentCreatedAt}
      currentUpdatedAt={currentUpdatedAt}
      currentThumbnail={currentThumbnail}
      fileUploadProgress={fileUploadProgress}
      //
      fileRef={fileRef}
      //
      nData={nData && nData.getMobileMainBannerOne}
      //
      fileChangeHandlerThumbnail={fileChangeHandlerThumbnail}
      mobileMainBannerSaveHandler={mobileMainBannerSaveHandler}
      moveListBannerPage={moveListBannerPage}
    />
  );
};
