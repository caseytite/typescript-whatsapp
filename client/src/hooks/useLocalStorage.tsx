import { useState, useEffect } from "react";

const PREFIX = "whatsapp";

const useLocalStorage = (key?: string, initialValue?: () => void) => {
  const specailKey = `${PREFIX}${key}`;
  const [value, setValue] = useState<() => void>(() => {
    const jsonValue = localStorage.getItem(specailKey);
    if (jsonValue !== null) {
      return JSON.parse(jsonValue);
    }
    if (typeof initialValue === "function") {
      return initialValue();
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(specailKey, JSON.stringify(value));
  }, [specailKey, value]);

  return [value, setValue];
};

export default useLocalStorage;
