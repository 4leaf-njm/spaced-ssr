import React, { useEffect, useState } from "react";
import AD06Presenter from "./AD06Presenter";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  GET_NOTICEBOARD,
  GET_NOTICEBOARD_TOTALPAGE,
  GET_NOTICEBOARD_TOTALPAGE_ONLY_CNT,
  DELETE_NOTICEBOARD,
  CREATE_NOTICEBOARD,
  MOODIFY_NOTICEBOARD,
} from "./AD06Queries.js";
import { GET_NOTICEBOARD_TYPE } from "../AD05/AD05Queries";
import { toast } from "react-nextjs-toast";
import storageFn from "../../../../fsStorage";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export default () => {
  ////////////// - USE STATE- ///////////////
  const [currentTab, setCurrentTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [limit, setLimit] = useState(15);
  const [pageList, setPageList] = useState(null);

  const [currentTitle, setCurrentTitle] = useState("");
  const [currentType, setCurrentType] = useState("");
  const [editContent, setEditContent] = useState("");

  const [openDialog, setOpenToggle] = useState(false);

  const [detailId, setDetailId] = useState("");
  const [detailTitle, setDetailTitle] = useState("");
  const [detailType, setDetailType] = useState("");
  const [detailCreatedAt, setDetailCreatedAt] = useState("");
  const [detailDescription, setDetailDescription] = useState("");

  ////////////// - VARIABLE- ////////////////

  ////////////// - USE QUERY- ///////////////
  const {
    data: noticeDatum,
    loading: noticeLoading,
    refetch: noticeRefetch,
  } = useQuery(GET_NOTICEBOARD, {
    variables: {
      searchValue,
      limit,
      currentPage,
    },
  });

  const {
    data: totalPageOnlyCntData,
    loading: totalPageOnlyCntLoading,
    refetch: totalPageOnlyCntRefetch,
  } = useQuery(GET_NOTICEBOARD_TOTALPAGE_ONLY_CNT, {
    variables: {
      searchValue,
      limit,
    },
  });

  const {
    data: totalPageData,
    loading: totalPageLoading,
    refetch: totalPageRefetch,
  } = useQuery(GET_NOTICEBOARD_TOTALPAGE, {
    variables: {
      searchValue,
      limit,
    },
  });

  let pageArr = [];
  if (!totalPageLoading) {
    for (let i = 0; i < totalPageData.getNoticeBoardTotalPage; i++) {
      pageArr.push(i);
    }
  }

  const {
    data: typeDatum,
    loading: typeLoading,
    refetch: typeRefetch,
  } = useQuery(GET_NOTICEBOARD_TYPE);

  ///////////// - USE MUTATION- /////////////
  const [deleteNoticeBoardMutation] = useMutation(DELETE_NOTICEBOARD);
  const [createNoticeBoardMutation] = useMutation(CREATE_NOTICEBOARD);
  const [modifyNoticeBoardMutation] = useMutation(MOODIFY_NOTICEBOARD);

  ///////////// - EVENT HANDLER- ////////////
  const changePageHandler = (page) => {
    setCurrentPage(page);
  };

  const prevAndNextPageChangeHandler = (page) => {
    if (page < 0) {
      toast.notify("첫 페이지 입니다.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (page > totalPageData.getNoticeBoardTotalPage - 1) {
      toast.notify("마지막 페이지 입니다.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    setCurrentPage(page);
  };

  const boardDeleteHandler = (id) => {
    confirmAlert({
      title: "DELETE NOTICE",
      message: "선택하신 공지사항을 삭제하시겠습니까?",
      buttons: [
        {
          label: "취소",
          onClick: () => {
            return false;
          },
        },
        {
          label: "확인",
          onClick: () => boardDeleteHandlerAfter(id),
        },
      ],
    });
  };

  const boardDeleteHandlerAfter = async (id) => {
    const { data } = await deleteNoticeBoardMutation({
      variables: {
        id,
      },
    });

    if (data.deleteNoticeBoard) {
      toast.notify("DELETE NOTICE!", {
        duration: 5,
        type: "info",
      });
      noticeRefetch();
    } else {
      toast.notify("처리 중 문제가 발생했습니다. 개발사에게 문의해주세요.", {
        duration: 5,
        type: "error",
      });
    }
  };

  const createNoticeHandler = async () => {
    if (!currentTitle || currentTitle.trim() === "") {
      toast.notify("공지사항 제목은 필수 입니다", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (!currentType || currentType.trim() === "") {
      toast.notify("공지사항 유형은 필수 입니다", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (!editContent || editContent.trim() === "") {
      toast.notify("공지사항 내용은 필수 입니다", {
        duration: 5,
        type: "error",
      });
      return;
    }

    const { data } = await createNoticeBoardMutation({
      variables: {
        title: currentTitle,
        type: currentType,
        description: editContent,
      },
    });

    if (data.createNoticeBoard) {
      toast.notify("CREATE NOTICE!", {
        duration: 5,
        type: "info",
      });
      noticeRefetch();
      setCurrentTitle("");
      setCurrentType("");
      setEditContent("");
      totalPageOnlyCntRefetch();
      totalPageRefetch();
      setCurrentTab(0);
    } else {
      toast.notify("처리 중 문제가 발생했습니다. 개발사에게 문의해주세요.", {
        duration: 5,
        type: "error",
      });
    }
  };

  const dialogToggle = (
    id = "",
    title = "",
    type = "",
    createdAt = "",
    description = ""
  ) => {
    setDetailId(id);
    setDetailTitle(title);
    setDetailType(type);
    setDetailCreatedAt(createdAt);
    setDetailDescription(description);

    setOpenToggle(!openDialog);
  };

  const noticeModifyHandler = async () => {
    const { data } = await modifyNoticeBoardMutation({
      variables: {
        id: detailId,
        title: detailTitle,
        description: detailDescription,
      },
    });

    if (data.modifyNoticeBoard) {
      toast.notify("NOOTICE BOARD UPDATE!", {
        duration: 5,
        type: "info",
      });
      dialogToggle();
      setDetailId("");
      setDetailTitle("");
      setDetailType("");
      setDetailCreatedAt("");
      setDetailDescription("");
      noticeRefetch("");
    } else {
      toast.notify("처리 중 문제가 발생했습니다. 개발사에게 문의해주세요.", {
        duration: 5,
        type: "error",
      });
    }
  };

  ////////////// - USE EFFECT- //////////////
  useEffect(() => {
    typeRefetch();
  }, []);

  return (
    <AD06Presenter
      currentTab={currentTab}
      setCurrentTab={setCurrentTab}
      isLoading={isLoading}
      pageArr={pageArr}
      limit={limit}
      editContent={editContent}
      setEditContent={setEditContent}
      currentTitle={currentTitle}
      setCurrentTitle={setCurrentTitle}
      currentType={currentType}
      setCurrentType={setCurrentType}
      openDialog={openDialog}
      detailTitle={detailTitle}
      setDetailTitle={setDetailTitle}
      detailType={detailType}
      detailCreatedAt={detailCreatedAt}
      detailDescription={detailDescription}
      setDetailDescription={setDetailDescription}
      //
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      //
      totalPage={totalPageData && totalPageData.getNoticeBoardTotalPage}
      totalAllPage={
        totalPageOnlyCntData &&
        totalPageOnlyCntData.getNoticeBoardTotalPageOnlyCnt
      }
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      //
      noticeDatum={noticeDatum && noticeDatum.getNoticeBoard}
      typeDatum={typeDatum && typeDatum.getNoticeBoardType}
      //
      changePageHandler={changePageHandler}
      prevAndNextPageChangeHandler={prevAndNextPageChangeHandler}
      boardDeleteHandler={boardDeleteHandler}
      createNoticeHandler={createNoticeHandler}
      dialogToggle={dialogToggle}
      noticeModifyHandler={noticeModifyHandler}
    />
  );
};
