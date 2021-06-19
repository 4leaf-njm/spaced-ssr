import React, { useState } from "react";
import { WholeWrapper, Wrapper } from "../../AdminCommonComponents";
import Head from "next/head";
import { withApollo } from "../../../../lib/apollo";
import A_Header from "./A_Header";
import A_Side from "./A_Side";
import Theme from "../../../Styles/Theme";
import { NextSeo } from "next-seo";
import seoConfig from "../../../seo.config.json";

const AdminLayout = ({ children, title, isSide = true }) => {
  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
      </Head>

      <NextSeo
        title={seoConfig.title}
        subject={seoConfig.subject}
        author={seoConfig.author}
        description={seoConfig.description}
        keywords={seoConfig.keywords}
        openGraph={{
          type: seoConfig.openGraph.type,
          site_name: seoConfig.openGraph.site_name,
          title: seoConfig.openGraph.title,
          description: seoConfig.openGraph.description,
          keywords: seoConfig.openGraph.keywords,
          url: seoConfig.openGraph.url,
          images: [
            {
              url: seoConfig.openGraph.images[0].url,
              width: seoConfig.openGraph.images[0].width,
              height: seoConfig.openGraph.images[0].height,
            },
          ],
        }}
      />

      <A_Header />

      <WholeWrapper
        height={`100vh`}
        al={`flex-start`}
        ju={`flex-start`}
        dr={`row`}
      >
        {isSide && (
          <Wrapper
            width={`200px`}
            minWidth={`200px`}
            al={`center`}
            ju={`flex-start`}
            height={`100%`}
            shadow={`5px 0px 10px ${Theme.grey_C}`}
            bgColor={`rgb(56, 58, 77)`}
          >
            <A_Side />
          </Wrapper>
        )}

        <Wrapper
          al={`flex-start`}
          ju={`flex-start`}
          height={`100%`}
          padding={isSide ? `20px` : `0`}
          isScroll={true}
        >
          {children}
        </Wrapper>
      </WholeWrapper>
    </React.Fragment>
  );
};

export default withApollo(AdminLayout);
