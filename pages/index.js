import React, { useEffect, useRef } from "react";
import { withApollo } from "../lib/apollo";
import MM00 from "../src/Components/Routes/Client/MM00";
import ClientLayout from "../src/Components/Routes/Layouts/ClientLayout";
import { NextSeo } from "next-seo";
import seoConfig from "../src/seo.config.json";

const Main = () => {
  const wholeRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      if (wholeRef.current) {
        let html = "";

        let s = document.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.src = "https://www.googletagmanager.com/gtag/js?id=G-JJPMTEZ9PN";

        wholeRef.current.appendChild(s);

        s = document.createElement("script");
        s.type = "text/javascript";
        s.async = true;

        html = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-JJPMTEZ9PN');
        `;
        s.innerHTML = html;

        wholeRef.current.appendChild(s);
      }
    }, 100);
  }, [wholeRef.current]);

  return (
    <ClientLayout ref={wholeRef} title={`메인 | ${process.env.HOMEPAGE_NAME}`}>
      <NextSeo
        title={seoConfig.title}
        subject={seoConfig.subject}
        author={seoConfig.author}
        description={seoConfig.description}
        keywords={seoConfig.keywords}
        canonical={seoConfig.canonical}
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

      <MM00 />
    </ClientLayout>
  );
};

export default withApollo(Main);
