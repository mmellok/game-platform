import React, {useState, useEffect} from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./Intro.module.scss";
import {safeHTML} from "@/utils/safeHTML";
import CustomButton from "../customButton/CustomButton";
import Transition from "../transition/Transition";
import {motion} from "framer-motion";

export default function IntroFooter(props) {
  const {introState} = props

  return (
    <div className={classNames(styles["intro__footer"])}>
      <Transition
        as={IntroFooterBlock}
        keyId={`intro__footerBlock-${introState}`}
        switchMode
        customProps={{className: "intro__footerBlock", ownClass: styles.intro__footerBlock}}
        {...props}
      />
    </div>
  );
}

function IntroFooterBlock({introState, progress, loadNote, doneNote, button, ...rest}){
  const components = {
    load: () => (
      <div className={classNames(styles["intro__load"])}>
        <div className={classNames(styles["intro__progress"])}>
          <div 
            className={classNames(styles["intro__progressLine"])}
            style={{transform: `translateX(-${100 - (progress * 100)}%)`}}
          />
        </div>
        <span className={classNames(styles["intro__loadNote"])}>{loadNote}</span>
      </div>
    ),
    done: () => (
      <div className={classNames(styles["intro__done"])}>
        <CustomButton {...button}/>
        <span className={classNames(styles["intro__loadNote"])}>{doneNote}</span>
      </div>
    ),
  } 

  return (
    <motion.div className={classNames(styles.intro__footerBlock)}  {...rest}>
      {components[introState]?.()}
    </motion.div>
  )
}

IntroFooter.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

