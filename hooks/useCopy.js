import {useEffect, useState} from "react";

const COPY_DELAY = 1500;

export const useCopy = (defaultValue, copyValue) => {
  const [text, setText] = useState(defaultValue)

  useEffect(() => {
    if (text === defaultValue) return;

    const timeoutId = setTimeout(() => setText(defaultValue), COPY_DELAY);

    (async () => {
      if ("clipboard" in navigator && copyValue)
        await navigator.clipboard.writeText(copyValue);
    })();

    return () => clearTimeout(timeoutId)
  }, [text, copyValue])

  return [text, setText, text !== defaultValue]
}
