import React, { useEffect, useState, useRef } from "react";
import AD28Presenter from "./AD28Presenter";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { REGISTER_MOBILEMAINBANNER } from "./AD28Queries.js";
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
  const currentDesc = useInput(``);
  const currentThumbnail = useInput(``);

  const fileUploadProgress = useInput(null);

  ////////////// - USE REF- ////////////////
  const fileRef = useRef();

  ////////////// - VARIABLE- ////////////////
  const router = useRouter();

  ////////////// - USE QUERY- ///////////////

  ////////////// - USE MUTATION- //////////////
  const [registerMobileMainBannerMutation] = useMutation(
    REGISTER_MOBILEMAINBANNER
  );

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

  const registerMobileMainBanner = () => {
    if (!emptyCheck(currentTitle.value)) {
      toast.notify("제목은 필수 입력사항 입니다.", {
        duration: 5,
        type: "error",
      });
      return;
    }
    if (!emptyCheck(currentLink.value)) {
      toast.notify("링크는 필수 입력사항 입니다.", {
        duration: 5,
        type: "error",
      });
      return;
    }
    if (!emptyCheck(currentThumbnail.value)) {
      toast.notify("이미지는 필수 업로드사항 입니다.", {
        duration: 5,
        type: "error",
      });
      return;
    }
    if (!emptyCheck(editContent)) {
      toast.notify("내용은 필수 업로드사항 입니다.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    confirm(
      `메인베너 등록`,
      `해당 베너를 등록하시겠습니까?`,
      registerMobileMainBannerAfter,
      null
    );
  };
  const registerMobileMainBannerAfter = async () => {
    const { data } = await registerMobileMainBannerMutation({
      variables: {
        title: currentTitle.value,
        link: currentLink.value,
        thumbnailPath: currentThumbnail.value,
        description: editContent,
      },
    });

    if (data.registerMobileMainBanner) {
      toast.notify("모바일베너 등록 되었습니다.", {
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
      "리스트로 이동하시겠습니까?",
      moveListBannerPagePageAfter,
      null
    );
  };

  const moveListBannerPagePageAfter = () => {
    router.push(`/admin/mobileMainBannerManagement`);
  };

  ////////////// - USE EFFECT- ///////////////
  useEffect(() => {}, []);

  useEffect(() => {}, [currentTab]);

  return (
    <AD28Presenter
      currentTab={currentTab}
      setCurrentTab={setCurrentTab}
      isLoading={isLoading}
      editContent={editContent}
      setEditContent={setEditContent}
      currentTitle={currentTitle}
      currentLink={currentLink}
      currentDesc={currentDesc}
      currentThumbnail={currentThumbnail}
      fileUploadProgress={fileUploadProgress}
      //
      fileRef={fileRef}
      //
      fileChangeHandlerThumbnail={fileChangeHandlerThumbnail}
      registerMobileMainBanner={registerMobileMainBanner}
      moveListBannerPage={moveListBannerPage}
    />
  );
};
