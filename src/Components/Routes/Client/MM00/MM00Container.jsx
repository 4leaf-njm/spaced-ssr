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
import { useCookies } from "react-cookie";

const MM00Container = () => {
  ////////////// - VARIABLE- ///////////////
  const size = useWindowSize();

  const router = useRouter();
  const query = router.query;

  const addressList = ["경기"];

  // lat: "37.412723757389806",
  // lon: "127.12990235563846",

  const type = {
    DEFAULT: {
      name: "광희빌딩",
      lat: "37.39233416034177",
      lon: "126.63922928447333",
      logo: "https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/SPACE%2Fassets%2Fimages%2Flogo%2Flogo-KH.png?alt=media&token=aeacb699-4eee-4ecf-8bcc-da1c762bfebc",
    },

    KH: {
      name: "광희빌딩",
      lat: "37.564228799608344",
      lon: "127.00569095238045",
      logo: "https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/SPACE%2Fassets%2Fimages%2Flogo%2Flogo-KH.png?alt=media&token=aeacb699-4eee-4ecf-8bcc-da1c762bfebc",
    },
  };

  const [cookies, setCookie, removeCookie] = useCookies();

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
    if (
      cookies[`SPACEADD-${query.type || `DEFAULT`}-CURRENT-WEATHER`] &&
      cookies[`SPACEADD-${query.type || `DEFAULT`}-DAILY-WEATHER`] &&
      localStorage.getItem(`SPACEADD-${query.type || `DEFAULT`}-DAILY-WEATHER`)
    ) {
      setCurrentWeather(
        cookies[`SPACEADD-${query.type || `DEFAULT`}-CURRENT-WEATHER`]
      );
      setDailyWeatherList(
        JSON.parse(
          localStorage.getItem(
            `SPACEADD-${query.type || `DEFAULT`}-DAILY-WEATHER`
          )
        )
      );

      return;
    }

    const lat = query.type ? type[query.type].lat : type["DEFAULT"].lat;
    const lon = query.type ? type[query.type].lon : type["DEFAULT"].lon;

    // faa4512d2d4f3d6e504d9a594d0d2128
    // 5b6544a9120182f939912f117ffdc900

    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?units=metric&lat=${lat}&lon=${lon}&appid=b1e69cf636fd7783aeddaf8252ace45a`,
        {},
        {
          heasers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )
      .then((response) => {
        setCookie(
          `SPACEADD-${query.type || `DEFAULT`}-CURRENT-WEATHER`,
          JSON.stringify(response.data.current),
          {
            path: "/",
            maxAge: 60 * 60 * 8,
          }
        );

        localStorage.setItem(
          `SPACEADD-${query.type || `DEFAULT`}-DAILY-WEATHER`,
          JSON.stringify(response.data.daily)
        );

        setCookie(`SPACEADD-${query.type || `DEFAULT`}-DAILY-WEATHER`, "true", {
          path: "/",
          maxAge: 60 * 60 * 8,
        });

        setCurrentWeather(response.data.current);
        setDailyWeatherList(response.data.daily);
      });
  };

  const getYesterdayWeatherAPI = async () => {
    if (cookies[`SPACEADD-${query.type || `DEFAULT`}-YESTERDAY-WEATHER`]) {
      setYesterDayWeather(
        cookies[`SPACEADD-${query.type || `DEFAULT`}-YESTERDAY-WEATHER`]
      );

      return;
    }

    const lat = query.type ? type[query.type].lat : type["DEFAULT"].lat;
    const lon = query.type ? type[query.type].lon : type["DEFAULT"].lon;

    const date = new Date();
    date.setDate(date.getDate() - 1);

    const timestamp = Math.floor(date.getTime() / 1000);

    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall/timemachine?units=metric&dt=${timestamp}&lat=${lat}&lon=${lon}&appid=b1e69cf636fd7783aeddaf8252ace45a`,
        {},
        {
          heasers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )
      .then((response) => {
        setCookie(
          `SPACEADD-${query.type || `DEFAULT`}-YESTERDAY-WEATHER`,
          response.data.current,
          {
            path: "/",
            maxAge: 60 * 60 * 8,
          }
        );

        setYesterDayWeather(response.data.current);
      });
  };

  const getAddressAPI = async () => {
    if (cookies[`SPACEADD-${query.type || `DEFAULT`}-CURRENT-ADDRESS`]) {
      setCurrentAddress(
        cookies[`SPACEADD-${query.type || `DEFAULT`}-CURRENT-ADDRESS`]
      );

      return;
    }

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
          setCookie(
            `SPACEADD-${query.type || `DEFAULT`}-CURRENT-ADDRESS`,
            response.data.documents[0].address,
            {
              path: "/",
              maxAge: 60 * 60 * 24,
            }
          );

          console.log(response.data.documents[0]);
          setCurrentAddress(response.data.documents[0].address);
        }
      });
  };

  ////////////// - USE EFFECT- //////////////
  useEffect(() => {
    if (typeof window === `undefined`) return;

    scroll.scrollTo(0);

    getWeatherAPI();
    getYesterdayWeatherAPI();
    getAddressAPI();

    if (
      cookies[`SPACEADD-${query.type || `DEFAULT`}-NEWS`] &&
      localStorage.getItem(`SPACEADD-${query.type || `DEFAULT`}-NEWS`)
    ) {
      setNewsViewDatum(
        JSON.parse(
          localStorage.getItem(`SPACEADD-${query.type || `DEFAULT`}-NEWS`)
        )
      );
    } else {
      newsRefetch();

      setTimeout(() => {
        setNewsSkip(false);
      }, 1000);
    }

    if (cookies[`SPACEADD-${query.type || `DEFAULT`}-FINEDUST`]) {
      setFineDustViewData(
        cookies[`SPACEADD-${query.type || `DEFAULT`}-FINEDUST`]
      );
    } else {
      fineDustRefetch();

      setTimeout(() => {
        setFineDustSkip(false);
      }, 1000);
    }
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

  useInterval(() => {
    if (!newsViewDatum) {
      if (
        cookies[`SPACEADD-${query.type || `DEFAULT`}-NEWS`] &&
        localStorage.getItem(`SPACEADD-${query.type || `DEFAULT`}-NEWS`)
      ) {
        setNewsViewDatum(
          JSON.parse(
            localStorage.getItem(`SPACEADD-${query.type || `DEFAULT`}-NEWS`)
          )
        );
      } else {
        setNewsSkip(false);
      }
    }

    if (!fineDustViewData) {
      if (cookies[`SPACEADD-${query.type || `DEFAULT`}-FINEDUST`]) {
        setFineDustViewData(
          cookies[`SPACEADD-${query.type || `DEFAULT`}-FINEDUST`]
        );
      } else {
        setFineDustSkip(false);
      }
    }
  }, 3000);

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
        setNewsViewDatum(newsDatum.getNewsData);

        localStorage.setItem(
          `SPACEADD-${query.type || `DEFAULT`}-NEWS`,
          JSON.stringify(newsDatum.getNewsData)
        );

        setCookie(`SPACEADD-${query.type || `DEFAULT`}-NEWS`, "true", {
          path: "/",
          maxAge: 60 * 60,
        });

        setIsRequest(false);
        setNewsSkip(true);
      }
    }
  }, [newsDatum]);

  useEffect(() => {
    if (fineDustData) {
      if (fineDustData.getFineDustData) {
        setCookie(
          `SPACEADD-${query.type || `DEFAULT`}-FINEDUST`,
          fineDustData.getFineDustData,
          {
            path: "/",
            maxAge: 60 * 60 * 12,
          }
        );

        setFineDustViewData(fineDustData.getFineDustData);
        setFineDustSkip(true);
      }
    }
  }, [fineDustData]);

  return (
    <MM00Presenter
      width={width}
      //
      addressList={addressList}
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
