import React, { useState } from "react";

const useOnlyNumberInput = (initValue) => {
  const [value, setValue] = useState(initValue);

  const onChange = (e) => {
    const inputValue = e.target.value;
    const newValue = inputValue.replace(/[^0-9]/g, "");

    setValue(newValue);
  };

  return { value, onChange, setValue };
};

export default useOnlyNumberInput;
