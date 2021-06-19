import React, { useState, useEffect } from "react";
import MM00Presenter from "./MM00Presenter";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  ADD_ACCEPT_RECORD,
  GET_MAINBANNER_ALL,
  GET_MOBILEBANNER_ALL,
} from "./MM00Queries";
import { animateScroll as scroll } from "react-scroll";
import { toast } from "react-nextjs-toast";
import { useRouter } from "next/router";
import useWindowSize from "../../../Hooks/useWindowSize";

const MM00Container = () => {
  ////////////// - VARIABLE- ///////////////
  const size = useWindowSize();

  const router = useRouter();

  ////////////// - USE STATE- ///////////////
  const [width, setWidth] = useState(size.width);

  ////////////// - USE QUERY- ///////////////
  const { data: mainBannerData, refetch: mainBannerRefetch } = useQuery(
    GET_MAINBANNER_ALL
  );

  const { data: mobileBannerData, refetch: mobileBannerRefetch } = useQuery(
    GET_MOBILEBANNER_ALL
  );

  ///////////// - USE MUTATION- /////////////
  const [addAcceptRecordMutation] = useMutation(ADD_ACCEPT_RECORD);

  ///////////// - EVENT HANDLER- ////////////
  const _addAceeptRecord = async () => {
    const d = new Date();
    const year = d.getFullYear();
    let month = d.getMonth() + 1;
    let date = d.getDate();
    month = ("00" + month).slice(-2);
    date = ("00" + date).slice(-2);

    const regDate = year + month + date;

    const {
      data: { addAcceptRecord },
    } = await addAcceptRecordMutation({
      variables: {
        date: regDate,
      },
    });

    await sessionStorage.setItem("ALKJSDLJOQIUALSX", "LAZKNJXOIUQASDSA");
  };

  ////////////// - USE EFFECT- //////////////
  useEffect(() => {
    if (typeof window === `undefined`) return;

    const item = sessionStorage.getItem("ALKJSDLJOQIUALSX");

    if (item !== "LAZKNJXOIUQASDSA") {
      _addAceeptRecord();
    }

    scroll.scrollTo(0);

    mainBannerRefetch();
    mobileBannerRefetch();
  }, []);

  useEffect(() => {
    if (size.width) {
      setWidth(size.width);
    }
  }, [size.width]);

  return (
    <MM00Presenter
      width={width}
      //
      mainBannerData={mainBannerData && mainBannerData.getMainBannerAll}
      mobileBannerData={
        mobileBannerData && mobileBannerData.getMobileMainBannerAll
      }
    />
  );
};

export default MM00Container;
