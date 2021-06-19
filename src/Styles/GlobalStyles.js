import { createGlobalStyle, css } from "styled-components";
import reset from "styled-reset";

const sliderCss = css`
  /* gallerySlider */
  .image-gallery {
    width: 100%;
    margin-bottom: 50px;
  }
  .image-gallery-slide .image-gallery-description {
    font-size: 22px;
    backdrop-filter: blur(3px);
  }
  @media (max-width: 800px) {
    .container .slick-next:before,
    .container .slick-prev:before {
      font-size: 20px !important;
    }
  }
  @media (max-width: 500px) {
    .container .slick-dots li button:before {
      display: none;
    }
  }
`;

const scrollCss = css`
  .scroll::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  .scroll::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.basicTheme_C};
    border: 1px solid rgba(255, 255, 255, 0.8);
    border-radius: 10px;
  }

  .scroll::-webkit-scrollbar-track {
    background-color: rgba(255, 255, 255, 0.4);
  }
`;

const editorCss = css`
  /* Editor */
  .editor__form {
    width: 100%;
    transition: 0.5s;
    margin-bottom: 50px;
  }
  .editor__form:focus {
    box-shadow: 2px 2px 10px 2px rgba(220, 220, 220, 1);
  }
  .editor__form.h-100 {
    height: calc(100px + 42px);
  }
  .editor__form.h-100 .ql-container {
    height: 100px;
  }
  .editor__form.h-200 {
    height: calc(200px + 42px);
  }
  .editor__form.h-200 .ql-container {
    height: 200px;
  }
  .editor__form.h-300 {
    height: calc(300px + 42px);
  }
  .editor__form.h-300 .ql-container {
    height: 300px;
  }
  .editor__form.h-400 {
    height: calc(400px + 42px);
  }
  .editor__form.h-400 .ql-container {
    height: 400px;
  }
  .editor__form.h-500 {
    height: calc(500px + 42px);
  }
  .editor__form.h-500 .ql-container {
    height: 500px;
  }
  .editor__form.h-600 {
    height: calc(600px + 42px);
  }
  .editor__form.h-600 .ql-container {
    height: 600px;
  }
  .ql-editor img {
    max-width: 100%;
  }
  /* Slick */
  .slick-list {
    outline: none !important;
  }
  .slick-slide:focus {
    outline: none;
  }
  .slick-slide div {
    outline: none;
  }
  .slick-dots li button:before {
    color: #fff !important;
  }
  @media (max-width: 700px) {
    .editor__form.h-500 {
      height: calc(500px + 66px);
    }
  }
`;

export default createGlobalStyle`
    ${reset};
    ${scrollCss};
    ${sliderCss};
    ${editorCss};
    * {
        box-sizing : border-box;
        font-family: 'Nanum Gothic', sans-serif;
    }
    body {
        background-color: ${(props) => props.theme.bgColor};
        color : ${(props) => props.theme.blackColor};
        font-family: 'Nanum Gothic', sans-serif;
    }
    a {
        color : inherit;
        text-decoration : none;
    }
    input, textarea, button {
        outline : none;
        border : none;
    }
    input[type="text"]:read-only {
        background-color : ${(props) => props.theme.lightGrey_C};
        color : ${(props) => props.theme.darkGrey_C};
        cursor : default;
    }
    button, select {
        cursor: pointer;
    }

    /* Dialog */
    .MuiBackdrop-root {
        background-color: rgba(0, 0, 0, 0.2) !important;
        z-index: 99 !important;
    }
    .MuiPaper-root.MuiDialog-paper {
        z-index: 999 !important;
    }
    .react-confirm-alert-overlay {
        z-index: 9999 !important;
    }
    .react-confirm-alert-body > h1 {
        border-bottom: 1px solid #ccc;
        padding-bottom: 10px;
        margin-bottom: 20px;
    }

    .MuiDialogActions-spacing {
      border-top : 1px solid #dcdcdc;
    }
    
    .MuiDrawer-paper {
      width: 100%;
    }

    .MuiLinearProgress-root {
      height : 15px  !important;
      border-radius: 3px !important;
    }
`;
