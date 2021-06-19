export const allMenus = [
  {
    menuName: "관리자 메인",
    link: "/admin",
  },
  {
    menuName: "통계 관리",
    subMenu: [
      {
        subMenuName: "접속자 통계",
        subMenuLink: "/admin/statManagement",
      },
    ],
  },
  {
    menuName: "화면 관리",
    subMenu: [
      {
        subMenuName: "팝업 관리",
        subMenuLink: "/admin/popupManagement",
      },
      {
        subMenuName: "메인베너 관리",
        subMenuLink: "/admin/mainBannerManagement",
      },
      {
        subMenuName: "모바일 베너 관리",
        subMenuLink: "/admin/mobileMainBannerManagement",
      },
      {
        subMenuName: "하단정보 관리",
        subMenuLink: "/admin/footerInfoManagement",
      },
    ],
  },
  {
    menuName: "회원 관리",
    subMenu: [
      {
        subMenuName: "일반 회원 관리",
        subMenuLink: "/admin/userManagement",
      },
      {
        subMenuName: "일반 회원 블랙리스트 관리",
        subMenuLink: "/admin/userBlackManagement",
      },
      {
        subMenuName: "일반 회원 탈퇴 리스트",
        subMenuLink: "/admin/userExitManagement",
      },
      {
        subMenuName: "사업자 회원 관리",
        subMenuLink: "/admin/bUserManagement",
      },
      {
        subMenuName: "사업자 블랙리스트 관리",
        subMenuLink: "/admin/bUserBlackManagement",
      },
      {
        subMenuName: "사업자 회원 탈퇴 관리",
        subMenuLink: "/admin/bUserExitManagement",
      },
      {
        subMenuName: "권한 관리",
        subMenuLink: "/admin/userRightManagement",
      },
      {
        subMenuName: "회원 권한 변경",
        subMenuLink: "/admin/userRightControllManagement",
      },
    ],
  },
  {
    menuName: "게시판 관리",
    subMenu: [
      {
        subMenuName: "게사판 유형 관리",
        subMenuLink: "/admin/boardTypeManagement",
      },
      {
        subMenuName: "공지사항 유형 관리",
        subMenuLink: "/admin/noticeTypeManagement",
      },
      {
        subMenuName: "공지사항 관리",
        subMenuLink: "/admin/noticeManagement",
      },
      {
        subMenuName: "자주묻는 질문 관리",
        subMenuLink: "/admin/faqManagement",
      },
      {
        subMenuName: "이벤트 등록",
        subMenuLink: "/admin/eventBoardManagement",
      },
      {
        subMenuName: "이벤트 게시판 관리",
        subMenuLink: "/admin/eventBoardListManagement",
      },
    ],
  },
  {
    menuName: "고객 문의",
    subMenu: [
      {
        subMenuName: "1:1 문의",
        subMenuLink: "/admin/directRequestManagement",
      },
    ],
  },
  {
    menuName: "SNS",
    subMenu: [
      {
        subMenuName: "SNS LINK 관리",
        subMenuLink: "/admin/snsLinkManagement",
      },
    ],
  },
];
