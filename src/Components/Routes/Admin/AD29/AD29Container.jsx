import React, { useEffect, useState, useRef } from "react";
import AD29Presenter from "./AD29Presenter";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { GET_POPUP, DELETE_POPUP } from "./AD29Queries.js";
import { toast } from "react-nextjs-toast";
import storageFn from "../../../../fsStorage";
import useInput from "../../../../Components/Hooks/useInput";
import { emptyCheck } from "../../../../commonUtils";
import confirm from "../../../../Components/confirm/confirm";
import { useRouter } from "next/router";

export default () => {
  ////////////// - USE STATE- ///////////////
  const [currentTab, setCurrentTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [searchValue, setSearchValue] = useState("");

  const [selectData, setSelectData] = useState(null);

  ////////////// - USE REF- ////////////////

  ////////////// - VARIABLE- ////////////////
  const router = useRouter();

  ////////////// - USE QUERY- ///////////////
  const { data: nDatum, refetch: nRefetch } = useQuery(GET_POPUP, {
    variables: {
      searchName: searchValue,
    },
  });

  ////////////// - USE MUTATION- //////////////
  const [deletePopupMutation] = useMutation(DELETE_POPUP);

  ////////////// - USE HANDLER- //////////////
  const dataClickHandler = (data) => {
    setSelectData(data);
  };

  const deletePopupHandler = () => {
    confirm(
      `DELETE`,
      `팝업를 삭제하시겠습니까?`,
      deletePopupHandlerAfter,
      null
    );
  };

  const deletePopupHandlerAfter = async () => {
    const { data } = await deletePopupMutation({
      variables: {
        id: selectData._id,
      },
    });

    if (data.deletePopup) {
      toast.notify("팝업이 삭제되었습니다.", {
        duration: 5,
        type: "info",
      });
      setSelectData(null);
      nRefetch();
    } else {
      toast.notify("처리 중 문제가 발생했습니다. 개발사에게 문의해주세요.", {
        duration: 5,
        type: "error",
      });
    }
  };

  const moveDetailBannerPage = () => {
    confirm(
      "페이지 이동",
      "해당 팝업 페이지로 이동하시겠습니까?",
      moveDetailBannerPageAfter,
      null
    );
  };

  const moveDetailBannerPageAfter = () => {
    window.open(`/#/popup/${selectData._id}`, `_blank`);
  };

  const moveUpdateBannerPage = () => {
    confirm(
      "페이지 이동",
      "해당 팝업 수정페이지로 이동하시겠습니까?",
      moveUpdateBannerPageAfter,
      null
    );
  };

  const moveUpdateBannerPageAfter = () => {
    router.push(`/admin/popupUpdateManagement/${selectData._id}`);
  };

  const moveCreateBannerPage = () => {
    confirm(
      "페이지 이동",
      "해당 팝업 등록페이지로 이동하시겠습니까?",
      moveCreateBannerPageAfter,
      null
    );
  };

  const moveCreateBannerPageAfter = () => {
    router.push(`/admin/popupCreateManagement`);
  };

  ////////////// - USE EFFECT- ///////////////
  useEffect(() => {
    nRefetch();
  }, []);

  useEffect(() => {}, [currentTab]);

  return (
    <AD29Presenter
      currentTab={currentTab}
      setCurrentTab={setCurrentTab}
      isLoading={isLoading}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      selectData={selectData}
      //
      nDatum={nDatum && nDatum.getPopup}
      //
      dataClickHandler={dataClickHandler}
      deletePopupHandler={deletePopupHandler}
      moveDetailBannerPage={moveDetailBannerPage}
      moveUpdateBannerPage={moveUpdateBannerPage}
      moveCreateBannerPage={moveCreateBannerPage}
    />
  );
};
