import {useEffect} from "react";

export default function useEruda() {
  /**
   * Для просмотра консоли на мобильных устройствах
   * Пример: http://localhost:3000/?eruda=true
   */
  useEffect(() => {
    if (!/eruda=true/.test(window.location)) return;
    const script = document.createElement("script");
    script.src = '//cdn.jsdelivr.net/npm/eruda';
    script.async = true;
    script.onload = () => global.eruda.init();
    document.body.appendChild(script);
  }, []);
}
