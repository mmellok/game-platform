import React from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./Container.module.scss";
import Transition from "../transition/Transition";

export default function Container({className, children, state}) {
  return (
    <div className={classNames(styles.container, className, {
      [styles[`container_${state}`]]: state
    })}>
      <Transition keyId={`container__block-${state}`} customProps={{className: "container__block", ownClass: styles.container__block}}>
        {children}
      </Transition>
    </div>
  );
}
Container.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

