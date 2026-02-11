import React, {useState, useEffect} from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./Intro.module.scss";
import {safeHTML} from "@/utils/safeHTML";
import IntroFooter from "./IntroFooter";

export default function Intro({className, title, img, button, loadNote, doneNote}) {
  const [introState, setIntroState] = useState("load");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (progress >= 1){
      setIntroState("done")
    } else {
      const t = setTimeout(() => {
        setProgress(progress + 0.25);
      }, 500)
      return () => clearTimeout(t)
    }
  }, [progress])

  return (
    <div className={classNames(styles["intro"], className)}>
      <h1 className={classNames(styles["intro__title"])}>{safeHTML(title)}</h1>
      <img className={classNames(styles["intro__image"])} src={img}/>
      <IntroFooter 
        button={button}
        loadNote={loadNote}
        introState={introState}
        progress={progress}
        doneNote={doneNote}
      />
    </div>
  );
}
Intro.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

