import React, {useCallback, useState} from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import {useModal} from "../../../../hooks/useModal";
import styles from "./CustomModal.module.scss";
import {motion} from "framer-motion";


export default function CustomModal(
  {
    children,
    horizontalPosition = "center",
    verticalPosition = "middle",
    startPosition = {
      opacity: 0,
      scale: 0.8,
      y: "100%",
    },
    donePosition = {
      opacity: 1,
      scale: 1,
      y: 0,
    },
    endPosition = {
      opacity: 0,
      scale: 0.8,
    },
    className,
    isFullPage,
    onClickOutside
  }
) {
  const [done, setDone] = useState(false);
  const {id, closeModal, timeout} = useModal();

  const close = useCallback(() => closeModal(id), [id]);

  const animationBg = {
    enter: {
      opacity: 0,
      transition: {
        type: "tween",
        ease: 'easeInOut',
        duration: timeout?.enter,
      }
    },
    done: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
      transition: {
        type: "tween",
        ease: 'easeInOut',
        duration: timeout?.exit * .5,
        delay: timeout?.exit * .5
      }
    }
  }

  const animationContent = {
    enter: {
      ...startPosition,
      transition: {
        ease: 'easeIn',
        duration: timeout?.enter * .5,
        delay: timeout?.enter * .5,
      },
      onAnimationComplete: () => setDone(true),
    },
    done: {...donePosition},
    exit: {
      ...endPosition,
      transition: {
        ease: 'easeOut',
        duration: timeout?.exit * .5,
      }
    }
  }

  return (
    <div
      className={classNames(
        styles.customModal,
        {[styles.customModal_fullpage]: isFullPage},
        b(horizontalPosition),
        b(verticalPosition),
        className
      )}
      style={{
        [`--time-enter`]: `${timeout.enter}s`,
        [`--time-exit`]: `${timeout.exit}s`,
      }}
    >
      <motion.div
        initial={'enter'}
        animate={'done'}
        exit={'exit'}
        variants={animationBg}
        className={styles.customModal__bg}
        onClick={onClickOutside}
      />

      <motion.div
        initial={'enter'}
        animate={'done'}
        exit={'exit'}
        variants={animationContent}
        className={styles.customModal__block}
        onAnimationComplete={() => setDone(true)}
      >
        <div className={styles.customModal__content} style={{
          pointerEvents: `${done ? "all" : "none"}`,
        }}>
          {
            typeof children === "function"
              ? children({id, close})
              : children
          }
        </div>
      </motion.div>
    </div>
  )
}

function b(list) {
  if (!list) return list;
  if (typeof list === "string") list = list.split(" ");
  return list.map(mod => `customModal_${mod}`);
}

CustomModal.propTypes = {
  isFullPage: PropTypes.bool,
  horizontalPosition: PropTypes.oneOf(["left", "right", "center"]),
  verticalPosition: PropTypes.oneOf(["top", "bottom", "middle"]),
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  onClickOutside: PropTypes.func,
  startPosition: PropTypes.object,
  donePosition: PropTypes.object,
  endPosition: PropTypes.object,
};
