import React from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./Sound.module.scss";


export default function Sound({className, children}) {
  return (
    <div className={classNames(styles["sound"], className)}>
      {children}
    </div>
  );
}
Sound.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

