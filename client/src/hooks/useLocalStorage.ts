import { useState, useEffect } from "react";

const PREFIX: string = "whatsapp";

const useLocalStorage = (key?: string, initialValue?: any) => {
  const specailKey = `${PREFIX}${key}`;
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(specailKey);
    if (jsonValue !== null) {
      return JSON.parse(jsonValue);
    }
    if (typeof initialValue === "function") {
      return initialValue(null);
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    if (value !== undefined) {
      localStorage.setItem(specailKey, JSON.stringify(value));
    }
  }, [specailKey, value]);

  return [value, setValue];
};

export default useLocalStorage;
