import React from "react";
import {
  WholeWrapper,
  TextInput,
  Wrapper,
  TableWrapper,
  TableHeadColumn,
  Content,
  ContentTitle,
  Textarea,
  CommonButton,
  Combo,
  ComboOption,
  GuideBox,
  GuideContent,
  Image,
  FileInput,
  FileLabel,
} from "../../../../Components/AdminCommonComponents";
import { Title, Tabs } from "../Components";
import Fade from "react-reveal/Fade";
import CircularIndeterminate from "../../../../Components/loading/CircularIndeterminate";
import styled from "styled-components";
import Theme from "../../../../Styles/Theme";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
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
  editContent,
  setEditContent,
  currentTitle,
  currentLink,
  currentThumbnail,
  fileUploadProgress,
  //
  fileRef,
  //
  fileChangeHandlerThumbnail,
  registerMobileMainBanner,
  moveListBannerPage,
}) => {
  return (
    <WholeWrapper al={`flex-start`} ju={`flex-start`}>
      <Fade>
        <Title text={`모바일 베너 등록`} />
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
            width={`300px`}
            height={`400px`}
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
            <Wrapper width={`300px`} margin={`10px 0px 0px 0px`}>
              {fileUploadProgress.value && (
                <FileProgress
                  variant="determinate"
                  value={fileUploadProgress.value}
                />
              )}
            </Wrapper>
          ) : (
            <FileLabel
              width={`300px`}
              htmlFor={`file-js`}
              margin={`10px 0px 0px 0px`}
            >
              THUMBNAIL UPLOAD
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
        <DataGuideWrapper height={`600px`}>내용</DataGuideWrapper>
        <DataWrapper height={`600px`}>
          <Editor
            value={editContent}
            componentHeight="h-500"
            editorChangeHandler={(html) => setEditContent(html)}
          />
        </DataWrapper>
      </Wrapper>

      <Wrapper dr={`row`} ju={`flex-start`}>
        <DataGuideWrapper>링크</DataGuideWrapper>
        <DataWrapper>
          <TextInput width={`750px`} height={`25px`} {...currentLink} />
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
              onClick={() => registerMobileMainBanner()}
            >
              모바일 베너 등록
            </CommonButton>
          </Wrapper>
        )}
      </Wrapper>
    </WholeWrapper>
  );
};
