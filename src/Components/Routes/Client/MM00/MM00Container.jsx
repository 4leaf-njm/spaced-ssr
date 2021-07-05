import React, { useState, useEffect } from "react";
import MM00Presenter from "./MM00Presenter";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_NEWS_DATA, GET_FINEDUST_DATA } from "./MM00Queries";
import { animateScroll as scroll } from "react-scroll";
import { toast } from "react-nextjs-toast";
import { useRouter } from "next/router";
import useWindowSize from "../../../Hooks/useWindowSize";
import useInterval from "react-useinterval";
import axios from "axios";
import { shuffle } from "../../../../commonUtils";
import { WORD_LIST } from "../../../../words";

const MM00Container = () => {
  ////////////// - VARIABLE- ///////////////
  const size = useWindowSize();

  const router = useRouter();
  const query = router.query;

  const type = {
    DEFAULT: {
      name: "광희빌딩",
      lat: "37.564451476951575",
      lon: "127.00568181154762",
      logo: "https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/SPACE%2Fassets%2Fimages%2Flogo%2Flogo-KH.png?alt=media&token=aeacb699-4eee-4ecf-8bcc-da1c762bfebc",
    },

    KH: {
      name: "광희빌딩",
      lat: "37.564451476951575",
      lon: "127.00568181154762",
      logo: "https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/SPACE%2Fassets%2Fimages%2Flogo%2Flogo-KH.png?alt=media&token=aeacb699-4eee-4ecf-8bcc-da1c762bfebc",
    },
  };

  ////////////// - USE STATE- ///////////////
  const [width, setWidth] = useState(size.width);

  const [logoPath, setLogoPath] = useState(type["DEFAULT"].logo);

  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [week, setWeek] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [ampm, setAmpm] = useState("");

  const [currentWeather, setCurrentWeather] = useState(null);
  const [yesterDayWeather, setYesterDayWeather] = useState(null);
  const [dailyWeatherList, setDailyWeatherList] = useState([]);

  const [currentAddress, setCurrentAddress] = useState(null);

  const [newsSkip, setNewsSkip] = useState(true);
  const [isRequest, setIsRequest] = useState(true);
  const [newsViewDatum, setNewsViewDatum] = useState(null);

  const [fineDustSkip, setFineDustSkip] = useState(true);
  const [fineDustViewData, setFineDustViewData] = useState(null);

  ////////////// - USE QUERY- ///////////////
  const { data: newsDatum, refetch: newsRefetch } = useQuery(GET_NEWS_DATA, {
    variables: {
      isRequest,
    },
    skip: newsSkip,
  });

  const { data: fineDustData, refetch: fineDustRefetch } = useQuery(
    GET_FINEDUST_DATA,
    {
      variables: {
        lat: query.type ? type[query.type].lat : type["DEFAULT"].lat,
        lon: query.type ? type[query.type].lon : type["DEFAULT"].lon,
      },
      skip: fineDustSkip,
    }
  );

  ///////////// - USE MUTATION- /////////////

  ///////////// - EVENT HANDLER- ////////////
  const getWeatherAPI = async () => {
    const lat = query.type ? type[query.type].lat : type["DEFAULT"].lat;
    const lon = query.type ? type[query.type].lon : type["DEFAULT"].lon;

    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?units=metric&lat=${lat}&lon=${lon}&appid=faa4512d2d4f3d6e504d9a594d0d2128`,
        {},
        {
          heasers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )
      .then((response) => {
        setCurrentWeather(response.data.current);
        setDailyWeatherList(response.data.daily);
      });
  };

  const getYesterdayWeatherAPI = async () => {
    const lat = query.type ? type[query.type].lat : type["DEFAULT"].lat;
    const lon = query.type ? type[query.type].lon : type["DEFAULT"].lon;

    const date = new Date();
    date.setDate(date.getDate() - 1);

    const timestamp = Math.floor(date.getTime() / 1000);

    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall/timemachine?units=metric&dt=${timestamp}&lat=${lat}&lon=${lon}&appid=faa4512d2d4f3d6e504d9a594d0d2128`,
        {},
        {
          heasers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )
      .then((response) => {
        setYesterDayWeather(response.data.current);
      });
  };

  const getAddressAPI = async () => {
    const lat = query.type ? type[query.type].lat : type["DEFAULT"].lat;
    const lon = query.type ? type[query.type].lon : type["DEFAULT"].lon;

    await axios
      .get(
        `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lon}&y=${lat}`,
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Authorization: "KakaoAK 018e5247a1f33089f1a6cd8969d1c9cc",
          },
        }
      )
      .then((response) => {
        if (response.data.documents.length > 0) {
          setCurrentAddress(response.data.documents[0].address);
        }
      });
  };

  ////////////// - USE EFFECT- //////////////
  useEffect(() => {
    if (typeof window === `undefined`) return;

    scroll.scrollTo(0);

    newsRefetch();
    fineDustRefetch();

    getWeatherAPI();
    getYesterdayWeatherAPI();
    getAddressAPI();

    setTimeout(() => {
      setNewsSkip(false);
      setFineDustSkip(false);
    }, 100);
  }, []);

  useInterval(() => {
    const weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const date = new Date();

    setYear(date.getFullYear());
    setMonth(("0" + (date.getMonth() + 1)).slice(-2));
    setDay(("0" + date.getDate()).slice(-2));
    setWeek(weeks[date.getDay()]);

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;
    hours = ("0" + hours).slice(-2);
    minutes = ("0" + minutes).slice(-2);

    setHours(hours);
    setMinutes(minutes);
    setAmpm(ampm);
  }, 1000);

  useEffect(() => {
    if (size.width) {
      setWidth(size.width);
    }
  }, [size.width]);

  useEffect(() => {
    setLogoPath(query.type ? type[query.type].logo : type["DEFAULT"].logo);
    getWeatherAPI();
  }, [query.type]);

  useEffect(() => {
    if (newsDatum) {
      if (newsDatum.getNewsData) {
        const newsList = newsDatum.getNewsData.filter((data, idx) => {
          return (
            newsDatum.getNewsData.findIndex((data2) => {
              return data.title === data2.title;
            }) === idx
          );
        });

        const filterList = newsList.filter(
          (data) => !WORD_LIST.includes(data.title)
        );

        const shuffleList = shuffle(filterList);

        setNewsViewDatum(shuffleList);
        setIsRequest(false);
        setNewsSkip(true);
      }
    }
  }, [newsDatum]);

  useEffect(() => {
    if (fineDustData) {
      if (fineDustData.getFineDustData) {
        setFineDustViewData(fineDustData.getFineDustData);
        setFineDustSkip(true);
      }
    }
  }, [fineDustData]);

  return (
    <MM00Presenter
      width={width}
      //
      logoPath={logoPath}
      year={year}
      month={month}
      day={day}
      week={week}
      hours={hours}
      minutes={minutes}
      ampm={ampm}
      currentWeather={currentWeather}
      yesterDayWeather={yesterDayWeather}
      dailyWeatherList={dailyWeatherList}
      currentAddress={currentAddress}
      //
      newsDatum={newsViewDatum}
      fineDustData={fineDustViewData}
    />
  );
};

export default MM00Container;
