import React, { useState, useEffect } from "react";
import MM00Presenter from "./MM00Presenter";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {} from "./MM00Queries";
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

  ///////////// - USE MUTATION- /////////////

  ///////////// - EVENT HANDLER- ////////////

  ////////////// - USE EFFECT- //////////////
  useEffect(() => {
    if (typeof window === `undefined`) return;

    scroll.scrollTo(0);
  }, []);

  useEffect(() => {
    if (size.width) {
      setWidth(size.width);
    }
  }, [size.width]);

  return <MM00Presenter width={width} />;
};

export default MM00Container;
