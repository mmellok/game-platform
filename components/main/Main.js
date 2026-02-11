import React from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./Main.module.scss";


export default function Main({className, children}) {
  return (
    <div className={classNames(styles["main"], className)}>
      {children}
    </div>
  );
}
Main.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

