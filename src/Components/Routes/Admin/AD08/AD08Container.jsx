import React, { useEffect, useState, useRef } from "react";
import AD08Presenter from "./AD08Presenter";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { GET_EVENTBOARD, CREATE_EVENTBOARD } from "./AD08Queries.js";
import { toast } from "react-nextjs-toast";
import storageFn from "../../../../fsStorage";
import useInput from "../../../../Components/Hooks/useInput";
import { progressLoading } from "../../../../commonUtils";

export default () => {
  ////////////// - USE STATE- ///////////////
  const [currentTab, setCurrentTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fileUploadProgress = useInput(null);

  const fileRef = useRef();

  const [currentThumbnail, setCurrentThumbnail] = useState("");

  const currentTitle = useInput("");
  const [currentDescription, setCurrentDescription] = useState("");
  const currentEventTerm = useInput("");
  ////////////// - VARIABLE- ////////////////

  ////////////// - USE QUERY- ///////////////
  ///////////// - USE MUTATION- /////////////
  const [createEventBoardMutation] = useMutation(CREATE_EVENTBOARD);

  ///////////// - EVENT HANDLER- ////////////

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

    if (!realFile) {
      setIsLoading(false);
      return;
    }

    const result = await progressLoading(
      realFile,
      "test",
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

  const createEventBoardHandler = async () => {
    if (!currentThumbnail || currentThumbnail.trim() === "") {
      toast.notify("상품 이미지는 필수 입니다.", {
        duration: 5,
        type: "error",
      });
      return;
    }
    if (!currentTitle.value || currentTitle.value.trim() === "") {
      toast.notify("제목은 필수 입니다.", {
        duration: 5,
        type: "error",
      });
      return;
    }
    if (!currentDescription || currentDescription.trim() === "") {
      toast.notify("게시판 내용은 필수 입니다.", {
        duration: 5,
        type: "error",
      });
      return;
    }
    if (!currentEventTerm.value || currentEventTerm.value.trim() === "") {
      toast.notify("이벤트 기간은 필수 입니다.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    const { data } = await createEventBoardMutation({
      variables: {
        thumbnail: currentThumbnail,
        title: currentTitle.value,
        eventTerm: currentEventTerm.value,
        description: currentDescription,
      },
    });

    if (data.createEventBoard) {
      toast.notify("CREATE EVENTBOARD!", {
        duration: 5,
        type: "info",
      });

      setCurrentThumbnail("");
      currentTitle.setValue("");
      currentEventTerm.setValue("");
      setCurrentDescription("");
    } else {
      toast.notify("처리 중 문제가 발생했습니다. 개발사에게 문의해주세요.", {
        duration: 5,
        type: "error",
      });
    }
  };
  ////////////// - USE EFFECT- //////////////

  return (
    <AD08Presenter
      currentTab={currentTab}
      setCurrentTab={setCurrentTab}
      isLoading={isLoading}
      fileRef={fileRef}
      fileUploadProgress={fileUploadProgress}
      //
      currentThumbnail={currentThumbnail}
      currentTitle={currentTitle}
      currentDescription={currentDescription}
      setCurrentDescription={setCurrentDescription}
      currentEventTerm={currentEventTerm}
      //

      fileChangeHandler={fileChangeHandler}
      createEventBoardHandler={createEventBoardHandler}
    />
  );
};
