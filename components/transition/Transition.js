import {STATES} from "./states";
import classNames from "classnames";
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {motion, AnimatePresence, useIsPresent} from "framer-motion";
import {animations} from "./animations";

export default function Transition({
  children,
  animation = "stub",
  keyId,
  customProps = {},
  as = "div",
  duration = 0.3,
  enterDuration,
  exitDuration,
  delay = 0,
  enterDelay,
  exitDelay,
  ease = "easeInOut",
  easeEnter,
  easeExit,
  switchMode,
  isVisible = true,
  onExitComplete,
  ...rest
}) {
  const tag = as;

  const enterTransition = {
    duration: enterDuration ?? duration,
    ease: easeEnter ?? ease,
    delay: enterDelay ?? delay,
    delayChildren: enterDelay ?? rest?.delayChildren,
    staggerChildren: rest?.staggerChildren || 0,
  };

  const exitTransition = {
    duration: exitDuration ?? duration,
    ease: easeExit ?? ease,
    delay: exitDelay ?? delay,
    delayChildren: exitDelay ?? rest?.delayChildren,
    staggerChildren: rest?.staggerChildren || 0,
  };

  const animationConfig = animations[animation];

  return (
    <AnimatePresence mode={switchMode ? "wait" : "sync"}>
      {isVisible && (
        <TransitionItem
          key={keyId}
          tag={tag}
          initial={animationConfig?.initial}
          animate={{
            ...animationConfig?.animate,
            transition: enterTransition,
          }}
          exit={{
            ...animationConfig?.exit,
            transition: exitTransition,
          }}
          transition={{duration, ease, delay}}
          {...customProps}
          onExitComplete={onExitComplete}
          children={children}
          {...rest}
        />
      )}
    </AnimatePresence>
  );
}

function TransitionItem({tag: Tag, children, className, onExitComplete, ...rest}) {
  const isPresent = useIsPresent();
  const [state, setState] = useState(STATES.PREPARE);
  const customClass = className ? `${className}-` : "";

  useEffect(() => {
    if (!isPresent) {
      setState(STATES.EXIT);
      return;
    }
    requestAnimationFrame(() => setState(STATES.ENTER));
  }, [isPresent]);

  return (
    <Tag
      {...rest}
      onAnimationComplete={() => {
        if (isPresent) {
          setState(STATES.ENTERED);
        } else {
          setState(STATES.EXITED);
          onExitComplete?.();
        }
      }}
      className={classNames(
        {
          [`${customClass}enter`]: state === STATES.ENTER || state === STATES.PREPARE,
          [`${customClass}enter-done`]: state === STATES.ENTERED,
          [`${customClass}enter-active`]: state === STATES.ENTER,
          [`${customClass}exit`]: state === STATES.EXIT || state === STATES.EXITED,
          [`${customClass}exit-active`]: state === STATES.EXIT,
          [`${customClass}exit-done`]: state === STATES.EXITED,
        },
        rest.className,
        rest.ownClass
      )}
    >
      {children}
    </Tag>
  );
}

Transition.propTypes = {
  children: PropTypes.node,
  animation: PropTypes.string,
  keyId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  customProps: PropTypes.object,
  as: PropTypes.string,
  duration: PropTypes.number,
  enterDuration: PropTypes.number,
  exitDuration: PropTypes.number,
  delay: PropTypes.number,
  enterDelay: PropTypes.number,
  exitDelay: PropTypes.number,
  ease: PropTypes.string,
  switchMode: PropTypes.bool,
};

Transition.defaultProps = {
  animation: "opacity",
  duration: 0.3,
  delay: 0,
  ease: "easeInOut",
  as: "div",
};
