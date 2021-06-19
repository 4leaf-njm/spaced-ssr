import React, { useState } from "react";
import {
  Wrapper,
  TabSection,
} from "../../../../Components/AdminCommonComponents";

export default ({ tabs, currentTab, setCurrentTab }) => {
  return (
    <Wrapper
      isTab={true}
      margin={`0px 0px 30px`}
      dr={`row`}
      al={`center`}
      ju={`flex-start`}
    >
      {tabs &&
        tabs.map((tab, idx) => {
          return (
            <TabSection
              isActive={currentTab === idx}
              key={idx}
              onClick={() => setCurrentTab(idx)}
            >
              {tab}
            </TabSection>
          );
        })}
    </Wrapper>
  );
};
