import React from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./MapBase.module.scss";
import {safeHTML} from "../../../../utils/safeHTML";


export default function MapBasePoint({style, position, name, onClick}) {

  return (
    <div className={classNames("map-base__point", styles.mapBase__point, {
      [`map-base__point_${position}`]: position !== undefined
    })}
         style={style}
         onClick={onClick}
    >
      <div className={classNames("map-base__point-circle",styles.mapBase__pointCircle)}>
        <div className={classNames("map-base__point-circle-block",styles.mapBase__pointCircleBlock)}/>
      </div>
      {name && <div className={classNames("map-base__point-title",styles.mapBase__pointTitle)}>{safeHTML(name)}</div>}

    </div>
  );
}
MapBasePoint.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

