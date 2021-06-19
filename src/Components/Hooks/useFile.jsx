import React, { useState } from "react";

const useFile = (initValue) => {
  const [value, setValue] = useState(initValue);
  const [filename, setFilename] = useState("-");

  const onChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    setValue(file);
    setFilename(file.name);
  };

  return { value, onChange, setValue, filename, setFilename };
};

export default useFile;
