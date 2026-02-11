import React, {useMemo} from "react";
import * as PropTypes from "prop-types";
import percentage from "@/utils/percentage";
import styles from "./Progressbar.module.scss";
import classNames from "classnames";

export default function ProgressbarRect({progress, countdown}) {
  const f = useMemo(() => {
    return countdown ? v => 1 - v : v => v;
  }, [countdown]);

  const v = f(progress) - 1;
  return (
    <div className={classNames("progressbar progressbar-rect",
      styles.progressbar,
      styles.progressbarRect,
    )}>
      <div className={classNames("progressbar-rect__bar", styles.progressbarRect__bar)}
           style={{transform: `translate(${percentage(v)})`}}>
        <div className={classNames("progressbar-rect__bar-line", styles.progressbarRect__barLine)}
             style={{transform: `translate(${percentage(-v)})`}}/>
      </div>
    </div>
  )
}

ProgressbarRect.propTypes = {
  progress: PropTypes.number,
  countdown: PropTypes.bool,
}
