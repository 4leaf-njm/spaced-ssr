# DEV-SAMPLE PROJECT

# Framework

<pre>
    4LEAF GEAR
</pre>

## MAIN SCREEN

| 번호 | 화면명(영어) | 화면설명(한글) | 화면코드 | 연결URL      |
| :--- | :----------- | :------------- | :------- | :----------- |
| 1    | MAIN         | 메인           | MM00     | "/"          |
| 2    | BRAND        | 브랜드 소개    | MM01     | "/brand"     |
| 3    | OPERATION    | 경영철학       | MM02     | "/operation" |
| 4    | FOUNDED      | 배달창업안내   | MM03     | "/founded"   |
| 5    | GUIDE        | 운영가이드     | MM04     | "/guide"     |
| 6    | MENU         | 메뉴소개       | MM05     | "/menu"      |
| 7    | STORE        | 지점안내       | MM06     | "/store"     |

## ADMIN SCREEN

| 번호 | 화면명(영어) | 화면설명(한글)         | 화면코드 | 연결URL                                       |
| :--- | :----------- | :--------------------- | :------- | :-------------------------------------------- |
| 1    | AD00         | 관리자 메인            | AD00     | "/admin"                                      |
| 2    | AD01         | 접속자 통계            | AD01     | "/admin/statManagement"                       |
| 4    | AD03         | 하단정보 관리          | AD03     | "/admin/footerInfoManagement"                 |
| 6    | AD05         | 공지사항 유형 관리     | AD05     | "/admin/noticeTypeManagement"                 |
| 7    | AD06         | 공지사항 관리          | AD06     | "/admin/noticeManagement"                     |
| 8    | AD07         | 자주묻는 질문 관리     | AD07     | "/admin/faqManagement"                        |
| 9    | AD08         | 이벤트 등록            | AD08     | "/admin/eventBoardManagement"                 |
| 10   | AD09         | 이벤트 게시판 관리     | AD09     | "/admin/eventBoardListManagement"             |
| 11   | AD10         | 일반 회원 관리         | AD10     | "/admin/userManagement"                       |
| 12   | AD11         | 사업자 회원 관리       | AD11     | "/admin/bUserManagement"                      |
| 13   | AD12         | 권한 관리              | AD12     | "/admin/userRightManagement"                  |
| 14   | AD13         | (일반)탈퇴회원 관리    | AD13     | "/admin/userExitManagement"                   |
| 15   | AD14         | (사업자)탈퇴 회원 관리 | AD14     | "/admin/bUserExitManagement"                  |
| 16   | AD15         | (일반)차단 회원 관리   | AD15     | "/admin/userBlackManagement"                  |
| 17   | AD16         | (사업자)차단 회원 관리 | AD16     | "/admin/bUserBlackManagement"                 |
| 18   | AD17         | 회원 권환 변경         | AD17     | "/admin/userRightControllManagement"          |
| 19   | AD18         | 모바일 베너 관리       | AD18     | "/admin/mobileMainBannerManagement"           |
| 20   | AD19         | 1:1문의 관리           | AD19     | "/admin/directRequestManagement"              |
| 21   | AD20         | 메인 베너 관리         | AD20     | "/admin/mainBannerManagement"                 |
| 22   | AD21         | 메인 베너 수정         | AD21     | "/admin/mainBannerUpdateManagement/:id"       |
| 23   | AD22         | 메인 베너 등록         | AD22     | "/admin/mainBannerCreateManagement"           |
| 24   | AD23         | 게시판 유형 관리       | AD23     | "/admin/boardTypeManagement"                  |
| 25   | AD24         | 팝업 수정              | AD24     | "/admin/popupUpdateManagement/:id"            |
| 26   | AD25         | 팝업 등록              | AD25     | "/admin/popupCreateManagement"                |
| 27   | AD26         | 모바일 베너 관리       | AD26     | "/admin/mobileMainBannerManagement"           |
| 28   | AD27         | 모바일 베너 수정       | AD27     | "/admin/mobileMainBannerUpdateManagement/:id" |
| 29   | AD28         | 모바일 베너 등록       | AD28     | "/admin/mobileMainBannerCreateManagement"     |
| 30   | AD29         | 팝업 관리              | AD29     | "/admin/popupManagement"                      |
| 31   | AD30         | SNS 링크 관리          | AD30     | "/admin/snsLinkManagement"                    |

## CLIENT DEVELOPMENT

- [x] 접속자 통계 [4LEAF.YSH]
- [x] 팝업 데이터베이스 연동 [4LEAF.YSH]
- [x] 푸터 데이터베이스 연동 [4LEAF.YSH]

## ADMIN DEVELOPMENT

- [x] 접속자통계 [4LEAF.YSH]
- [x] 팝업 관리 [4LEAF.YSH]
- [x] 메인베너 관리 [4LEAF.YSH]
- [x] 모바일 배너 관리 [4LEAF.SJH]
- [x] 하단 정보 관리 [4LEAF.YSH]
- [x] 이벤트 등록 [4LEAF.YSH]
- [x] 이벤트 게시판 관리 [4LEAF.YSH]
- [x] 일반 회원 관리 [4LEAF.YSH]
- [x] 사업자 회원 관리 [4LEAF.YSH]
- [x] 권한 관리 [4LEAF.YSH]
- [x] (일반)탈퇴회원 관리 [4LEAF.SJH]
- [x] (사업자)탈퇴 회원 관리 [4LEAF.SJH]
- [x] (일반)차단 회원 관리 [4LEAF.SJH]
- [x] (사업자)차단 회원 관리 [4LEAF.SJH]
- [x] 회원 권한 변경 [4LEAF.YSH]
- [x] 1:1 문의 관리 [4LEAF.SJH]

- [x] 로그인 쿠키 데이터 연동 [4LEAF.SJW]

# commonUtils

| FUNCTION         | PARAMETER | DATA TYPE | RETURN  |
| :--------------- | :-------- | :-------- | :------ |
| numberWithCommas | value     | Number    | Integer |
| emptyCheck       | value     | All(\*)   | Boolean |

## REPAIRE LOCATION

- [ ] AD02Container.jsx
- [ ] AD04Container.jsx
- [ ] AD08Container.jsx
- [ ] AD09Container.jsx
- [ ] AD18Container.jsx
- [ ] Editor.jsx
