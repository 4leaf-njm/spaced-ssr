import storageFn from "./fsStorage";
import storageRef from "./firebase";

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const emptyCheck = (value) => {
  if (!value || value.trim() === "") {
    return false;
  } else {
    return true;
  }
};

export const searchYearAndMonth = () => {
  const currentYear = new Date().getFullYear() + "";
  let currentMonth = new Date().getMonth() + 1;
  currentMonth = currentMonth < 10 ? "0" + currentMonth : currentMonth + "";

  const comboYear = [
    currentYear + "",
    currentYear - 1 + "",
    currentYear - 2 + "",
  ];

  const comboMonth = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];

  return { currentYear, comboYear, comboMonth, currentMonth };
};

export const progressLoading = (
  origin_file,
  folder_name,
  setProgress,
  setPath,
  isResize,
  width,
  height
) => {
  const d = new Date();

  let year = d.getFullYear() + "";
  let month = d.getMonth() + 1 + "";
  let date = d.getDate() + "";
  let hour = d.getHours() + "";
  let min = d.getMinutes() + "";
  let sec = d.getSeconds() + "";

  const resultTime = year + month + date + hour + min + sec;
  const filename = resultTime + origin_file.filename;

  return new Promise((resolve, reject) => {
    try {
      let task = storageRef
        .child(`${process.env.STORAGE_NAME}/uploads/${folder_name}/${filename}`)
        .put(origin_file);

      task.on(
        `state_changed`,
        async (snapshot) => {
          let progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          setProgress(parseInt(Math.floor(progress)));
        },
        (error) => {
          console.log(error);
        },
        async () => {
          if (isResize) {
            const db_path = await resizeImage(
              `${process.env.STORAGE_NAME}/uploads/${folder_name}/${filename}`,
              origin_file,
              width,
              height
            );

            setPath(db_path);
          } else {
            const db_path = await storageFn.getSotragePath(
              `${process.env.STORAGE_NAME}/uploads/${folder_name}/${filename}`
            );
            setPath(db_path);
          }

          resolve(true);
        }
      );
    } catch (e) {
      console.log(e);
    } finally {
      return true;
    }
  });
};

export const resizeImage = (uploadPath, file, width, height) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const image = new Image();

      image.src = e.target.result;
      image.onload = async () => {
        let canvas = document.createElement("canvas");

        canvas.width = width;

        if (height) {
          canvas.height = height;
        } else {
          let ratio = image.width / width;

          canvas.height = image.height / ratio;
        }

        canvas
          .getContext("2d")
          .drawImage(image, 0, 0, canvas.width, canvas.height);

        const dataURL = canvas.toDataURL("image/jpeg");

        const blob = dataURItoBlob(dataURL);
        const resultFile = new File([blob], file.name, { type: "image/jpeg" });

        const path = await storageFn.uploadFile(
          uploadPath,
          decodeURI(resultFile.name),
          resultFile
        );

        const db_path = await storageFn.getSotragePath(path);

        resolve(db_path);
      };
    };
    reader.readAsDataURL(file);
  });
};

export const dataURItoBlob = (dataURI) => {
  const byteString = atob(dataURI.split(",")[1]);

  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
};

export const checkCookie = (info) => {
  if (!info) {
    return false;
  }
  if (!info.id) {
    return false;
  }
  if (!info.sort) {
    return false;
  }
  return true;
};

export const checkCookieSort = (info, limit) => {
  if (info.sort < limit) {
    return false;
  }
  return true;
};
