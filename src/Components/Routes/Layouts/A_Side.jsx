import React, { useState } from "react";
import {
  WholeWrapper,
  SideMenu,
  SubMenus,
  SubMenu,
  Image,
  Wrapper,
} from "../../../Components/AdminCommonComponents";
import { allMenus } from "./adminMenus";
import { MdExpandMore } from "react-icons/md";
import Flip from "react-reveal/Flip";

const A_Side = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const _openSubMenu = (event, tab) => {
    setCurrentTab(tab);
  };

  const moveLinkHandler = (link) => {
    document.location.href = link;
  };

  return (
    <WholeWrapper padding={`20px 0`}>
      <Image
        alt="logo"
        src={`https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/4LEAFWEB%2Fimages%2FLOGO%2Flogo2.png?alt=media&token=5f700f73-92ac-480d-8a29-3ca9b1adfbbf`}
        width={`150px`}
        margin={`0 0 20px`}
      />
      {allMenus.map((menu, idx) => {
        return (
          <Wrapper
            key={idx}
            al={`flex-start`}
            ju={`flex-start`}
            borderBottom={` 1px solid rgb(64, 66, 86)`}
          >
            {idx === 0 ? (
              <SideMenu
                onClick={(event) => _openSubMenu(event, idx)}
                isActive={idx === currentTab}
              >
                {menu.menuName}
              </SideMenu>
            ) : (
              <React.Fragment>
                <SideMenu
                  onClick={(event) => _openSubMenu(event, idx)}
                  isActive={idx === currentTab}
                >
                  {menu.menuName}
                  <MdExpandMore />
                </SideMenu>
                <SubMenus margin={`5px 10px`} isActive={idx === currentTab}>
                  {typeof window !== `undefined` &&
                    menu.subMenu &&
                    menu.subMenu.map((sub, idx) => {
                      return (
                        <Flip key={idx} delay={idx * 80} right>
                          <SubMenu
                            onClick={() => moveLinkHandler(sub.subMenuLink)}
                          >
                            {sub.subMenuName}
                          </SubMenu>
                        </Flip>
                      );
                    })}
                </SubMenus>
              </React.Fragment>
            )}
          </Wrapper>
        );
      })}
    </WholeWrapper>
  );
};

export default A_Side;
