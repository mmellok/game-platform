import React from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./Rating.module.scss";


export default function Rating({className, children}) {
  return (
    <div className={classNames(styles["rating"], className)}>
      {children}
    </div>
  );
}
Rating.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

