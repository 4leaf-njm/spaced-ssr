import React, { useEffect, useState } from "react";
import AD07Presenter from "./AD07Presenter";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  GET_FAQTYPE,
  CREATE_FAQTYPE,
  DELETE_FAQTYPE,
  CREATE_FAQ,
  GET_FAQ,
  DELETE_FAQ,
  MODIFY_FAQ,
} from "./AD07Queries.js";
import { toast } from "react-nextjs-toast";
import storageFn from "../../../../fsStorage";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export default () => {
  ////////////// - USE STATE- ///////////////
  const [currentTab, setCurrentTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [newValue, setNewValue] = useState("");

  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [editContent, setEditContent] = useState("");

  const [currentAnswer, setCurrentAnswer] = useState("");
  const [currentId, setCurrentId] = useState("");

  const [openDialog, setOpenDialog] = useState(false);

  ////////////// - VARIABLE- ////////////////

  ////////////// - USE QUERY- ///////////////
  const {
    data: faqTypeDatum,
    loading: faqTypeLoading,
    refetch: faqTypeRefetch,
  } = useQuery(GET_FAQTYPE);

  const { data: faqDatum, loading: faqLoading, refetch: faqRefetch } = useQuery(
    GET_FAQ
  );

  ///////////// - USE MUTATION- /////////////
  const [createFaqTypeMutation] = useMutation(CREATE_FAQTYPE, {
    variables: {
      typeName: newValue,
    },
  });
  const [deleteFaqTypeMutation] = useMutation(DELETE_FAQTYPE);
  const [createFaqMutation] = useMutation(CREATE_FAQ);
  const [deleteFaqMutation] = useMutation(DELETE_FAQ);
  const [modifyFaqMutation] = useMutation(MODIFY_FAQ);

  ///////////// - EVENT HANDLER- ////////////
  const enterKeyHandler = (e) => {
    if (e.keyCode === 13) {
      registerFaqTypeHandler();
    }
  };

  const registerFaqTypeHandler = async () => {
    const { data } = await createFaqTypeMutation();

    if (data.createFaqType) {
      toast.notify("CREATE NEW FAQ TYPE!", {
        duration: 5,
        type: "info",
      });
      faqTypeRefetch();
      setNewValue("");
    } else {
      toast.notify("유형명을 기입 해 주시길 바랍니다.", {
        duration: 5,
        type: "error",
      });
    }
  };

  const deleteFaqHandler = (id) => {
    confirmAlert({
      title: "DELETE FAQ TYPE",
      message: "선택하신 유형을 삭제하시겠습니까?",
      buttons: [
        {
          label: "취소",
          onClick: () => {
            return false;
          },
        },
        {
          label: "확인",
          onClick: () => deleteFaqHandlerAfter(id),
        },
      ],
    });
  };

  const deleteFaqHandlerAfter = async (id) => {
    const { data } = await deleteFaqTypeMutation({
      variables: {
        id,
      },
    });

    if (data.deleteFaqType) {
      toast.notify("DELETE FAQ TYPE!", {
        duration: 5,
        type: "info",
      });
      faqTypeRefetch();
    } else {
      toast.notify("처리 중 문제가 발생했습니다. 개발사에게 문의해주세요.", {
        duration: 5,
        type: "error",
      });
    }
  };

  const createFaqHandler = async () => {
    const { data } = await createFaqMutation({
      variables: {
        question: title,
        answer: editContent,
        sort: faqDatum && faqDatum.getFaq.length + 1,
        type,
      },
    });

    if (data.createFaq) {
      toast.notify("CREATE FAQ!", {
        duration: 5,
        type: "info",
      });
      setCurrentTab(0);
      setTitle("");
      setType("");
      setEditContent("");
      faqRefetch();
    } else {
      toast.notify("질문과 답변을 작성해 주시길 바랍니다.", {
        duration: 5,
        type: "error",
      });
    }
  };

  const faqDeleteHandler = (id) => {
    confirmAlert({
      title: "DELETE FAQ",
      message: "선택하신 질문을 삭제하시겠습니까?",
      buttons: [
        {
          label: "취소",
          onClick: () => {
            return false;
          },
        },
        {
          label: "확인",
          onClick: () => faqDeleteHandlerAfter(id),
        },
      ],
    });
  };

  const faqDeleteHandlerAfter = async (id) => {
    const { data } = await deleteFaqMutation({
      variables: {
        id,
      },
    });

    if (data.deleteFaq) {
      toast.notify("DELETE FAQ DATA!", {
        duration: 5,
        type: "info",
      });
      faqRefetch();
    } else {
      toast.notify("처리 중 문제가 발생했습니다. 개발사에게 문의해주세요.", {
        duration: 5,
        type: "error",
      });
    }
  };

  const dialogToggle = (answer = "", id = "") => {
    setCurrentAnswer(answer);
    setCurrentId(id);

    setOpenDialog(!openDialog);
  };

  const modifyAnswerHandler = async () => {
    const { data } = await modifyFaqMutation({
      variables: {
        id: currentId,
        answer: currentAnswer,
      },
    });

    if (data.modifyFaq) {
      toast.notify("UPDATE FAQ DATA!", {
        duration: 5,
        type: "info",
      });
      faqRefetch();
      dialogToggle();
    } else {
      toast.notify("처리 중 문제가 발생했습니다. 개발사에게 문의해주세요.", {
        duration: 5,
        type: "error",
      });
    }
  };

  ////////////// - USE EFFECT- //////////////
  useEffect(() => {
    faqTypeRefetch();
  }, [currentTab]);

  return (
    <AD07Presenter
      currentTab={currentTab}
      setCurrentTab={setCurrentTab}
      isLoading={isLoading}
      newValue={newValue}
      setNewValue={setNewValue}
      editContent={editContent}
      setEditContent={setEditContent}
      title={title}
      setTitle={setTitle}
      type={type}
      setType={setType}
      openDialog={openDialog}
      currentAnswer={currentAnswer}
      setCurrentAnswer={setCurrentAnswer}
      //
      faqTypeDatum={faqTypeDatum && faqTypeDatum.getFaqType}
      faqDatum={faqDatum && faqDatum.getFaq}
      //
      enterKeyHandler={enterKeyHandler}
      registerFaqTypeHandler={registerFaqTypeHandler}
      deleteFaqHandler={deleteFaqHandler}
      createFaqHandler={createFaqHandler}
      faqDeleteHandler={faqDeleteHandler}
      dialogToggle={dialogToggle}
      modifyAnswerHandler={modifyAnswerHandler}
    />
  );
};
