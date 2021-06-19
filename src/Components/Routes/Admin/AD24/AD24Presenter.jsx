import React from "react";
import {
  WholeWrapper,
  TextInput,
  Wrapper,
  CommonButton,
  Image,
  FileInput,
  FileLabel,
} from "../../../../Components/AdminCommonComponents";
import { Title, Tabs } from "../Components";
import Fade from "react-reveal/Fade";
import CircularIndeterminate from "../../../../Components/loading/CircularIndeterminate";
import styled from "styled-components";
import Theme from "../../../../Styles/Theme";
import Slide from "@material-ui/core/Slide";
import { FiAlertCircle } from "react-icons/fi";
import Editor from "../../../../Components/editor/Editor.jsx";
import FileProgress from "../../../../Components/FileProgress";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FieldsSet = styled(Wrapper)`
  background-color: ${(props) => props.theme.check_B_C};
  color: ${(props) => props.theme.white_C};
  border-radius: ${(props) => props.theme.radius};
  font-size: 14px;
  font-weight: 600;
`;

const DataGuideWrapper = styled(Wrapper)`
  width: 240px;
  height: ${(props) => props.height || `30px`};
  border-bottom: 1px solid ${(props) => props.theme.lightGrey_C};
  font-size: 13px;
  font-weight: 600;
  align-items: flex-start;
  padding: 0px 20px;
  background-color: rgba(0, 10, 100, 0.1);
`;

const DataWrapper = styled(Wrapper)`
  height: ${(props) => props.height || `30px`};
  border-bottom: 1px solid ${(props) => props.theme.lightGrey_C};
  align-items: flex-start;
  padding: 0px 20px;
`;

export default ({
  currentTab,
  setCurrentTab,
  isLoading,
  currentTitle,
  currentCreatedAt,
  currentUpdatedAt,
  currentThumbnail,
  fileUploadProgress,
  //
  fileRef,
  //
  nData,
  //
  fileChangeHandlerThumbnail,
  popupSaveHandler,
  moveListBannerPage,
}) => {
  return (
    <WholeWrapper al={`flex-start`} ju={`flex-start`}>
      <Fade>
        <Title text={`팝업 수정 _ ${nData && nData.title}`} />
      </Fade>

      <FieldsSet
        height={`30px`}
        margin={`20px 0px 5px 0px`}
        al={`flex-start`}
        padding={`0px 20px`}
      >
        기본정보
      </FieldsSet>

      <Wrapper dr={`row`} ju={`flex-start`}>
        <DataGuideWrapper height={`500px`}>이미지</DataGuideWrapper>
        <DataWrapper height={`500px`}>
          <Image
            src={currentThumbnail.value}
            width={`330px`}
            height={`450px`}
            alt={`bannerImage`}
          />

          <FileInput
            id="file-js"
            type="file"
            accept="image/jpeg,image/gif,image/png"
            onChange={fileChangeHandlerThumbnail}
            ref={fileRef}
          />

          {isLoading ? (
            <Wrapper width={`330px`} margin={`10px 0px 0px 0px`}>
              {fileUploadProgress.value && (
                <FileProgress
                  variant="determinate"
                  value={fileUploadProgress.value}
                />
              )}
            </Wrapper>
          ) : (
            <FileLabel
              width={`330px`}
              htmlFor={`file-js`}
              margin={`10px 0px 0px 0px`}
            >
              POPUP UPLOAD
            </FileLabel>
          )}
        </DataWrapper>
      </Wrapper>

      <Wrapper dr={`row`} ju={`flex-start`}>
        <DataGuideWrapper>제목</DataGuideWrapper>
        <DataWrapper>
          <TextInput width={`750px`} height={`25px`} {...currentTitle} />
        </DataWrapper>
      </Wrapper>

      <Wrapper dr={`row`} ju={`flex-start`}>
        <DataGuideWrapper>작성자</DataGuideWrapper>
        <DataWrapper>
          <TextInput
            width={`350px`}
            height={`25px`}
            readOnly={true}
            value={`관리자`}
          />
        </DataWrapper>
      </Wrapper>

      <Wrapper dr={`row`} ju={`flex-start`}>
        <DataGuideWrapper>작성일</DataGuideWrapper>
        <DataWrapper>
          <TextInput
            width={`350px`}
            height={`25px`}
            {...currentCreatedAt}
            readOnly={true}
          />
        </DataWrapper>
      </Wrapper>

      <Wrapper dr={`row`} ju={`flex-start`}>
        <DataGuideWrapper>마지막 수정일</DataGuideWrapper>
        <DataWrapper>
          <TextInput
            width={`350px`}
            height={`25px`}
            {...currentUpdatedAt}
            readOnly={true}
          />
        </DataWrapper>
      </Wrapper>

      <Wrapper margin={`30px 0px`}>
        {isLoading ? (
          <Wrapper al={`flex-end`} ju={`flex-end`}>
            <CircularIndeterminate />
          </Wrapper>
        ) : (
          <Wrapper al={`flex-end`} ju={`flex-end`} dr={`row`}>
            <CommonButton
              margin={`0px 5px 0px 0px`}
              kindOf={`check`}
              onClick={() => moveListBannerPage()}
            >
              목록으로
            </CommonButton>
            <CommonButton
              margin={`0px 5px 0px 0px`}
              kindOf={`update`}
              onClick={() => popupSaveHandler()}
            >
              팝업 수정
            </CommonButton>
          </Wrapper>
        )}
      </Wrapper>
    </WholeWrapper>
  );
};
