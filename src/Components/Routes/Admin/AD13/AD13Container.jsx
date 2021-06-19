import React, { useEffect, useState } from "react";
import AD15Presenter from "./AD13Presenter";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { GET_USERS_BY_EXIT } from "./AD13Queries.js";
import { toast } from "react-nextjs-toast";
import storageFn from "../../../../fsStorage";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export default () => {
  ////////////// - USE STATE- ///////////////
  const [currentTab, setCurrentTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const [searchValue, setSearchValue] = useState("");

  const [currentData, setCurrentData] = useState(null);

  ////////////// - VARIABLE- ////////////////

  ////////////// - USE QUERY- ///////////////
  const {
    data: userDatum,
    loading: userLoading,
    refetch: userRefetch,
  } = useQuery(GET_USERS_BY_EXIT, {
    variables: {
      searchValue,
    },
  });

  ///////////// - USE MUTATION- /////////////

  ///////////// - EVENT HANDLER- ////////////

  ////////////// - USE EFFECT- //////////////
  useEffect(() => {
    userRefetch();
  }, []);

  return (
    <AD15Presenter
      currentTab={currentTab}
      setCurrentTab={setCurrentTab}
      isLoading={isLoading}
      openDialog={openDialog}
      currentData={currentData}
      //
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      //
      userDatum={userDatum && userDatum.getUsersByExit}
      //
    />
  );
};
