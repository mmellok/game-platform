import React from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./Auth.module.scss";


export default function Auth({className, children}) {
  return (
    <div className={classNames(styles["auth"], className)}>
      {children}
    </div>
  );
}
Auth.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

