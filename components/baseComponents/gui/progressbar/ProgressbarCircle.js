import React, {useMemo} from "react";
import * as PropTypes from "prop-types";
import styles from "./Progressbar.module.scss";
import classNames from "classnames";

export default function ProgressbarCircle({R=50, W=R * 0.5, progress, ccw, isFill}) {
  const {D, r, L} = useMemo(() => {
    const r = R - W * 0.5;
    return {
      R: 50,
      D: 2 * R,
      W: R * 0.5,
      r,
      L: (2 * Math.PI * r),
    }
  }, [R, W]);

  const f = useMemo(() => {
    return (p) => {
      if (isFill) p = p - 1;
      if (ccw) return -p;

      return p;
    }
  }, [ccw, isFill]);

  return (
    <svg viewBox={`0 0 ${D} ${D}`} width={D} height={D}
         className={classNames("progressbar progressbar-circle",
           styles.progressbar,
           styles.progressbarCircle
           )}
    >
      <circle
        suppressHydrationWarning={true}
        cx={R}
        cy={R}
        r={r}
        fill={"none"}
        stroke={"#000000"}
        strokeWidth={W}
        strokeDasharray={`${L} ${L}`}
        strokeDashoffset={-L * f(progress)}
        transform={"rotate(-90)"}
        style={{transformOrigin: `${R}px ${R}px`}}
      />
    </svg>
  )
}

ProgressbarCircle.propTypes = {
  R: PropTypes.number,
  W: PropTypes.number,
  progress: PropTypes.number,
  ccw: PropTypes.bool,
  isFill: PropTypes.bool,
}
