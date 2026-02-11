import React, {useCallback, useContext} from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./CustomMenu.module.scss";
import {BurgerContext} from "../../../../providers/BurgerProvider";


export default function CustomMenuItem(props) {
  const {setBurger } = useContext(BurgerContext);

  const closeMenu = useCallback(()=>{
    setBurger(false)
  },[]);

  return (
    <li {...props.attr}
        className={classNames(styles.customMenu__item, props?.attr?.className, props?.className)} >
      <a className={styles.customMenu__itemLink}
         href={props.href}
         onClick={closeMenu}
      >
        {props.text}
      </a>
    </li>
  )
}

CustomMenuItem.propTypes = {
  className: PropTypes.string,
  attr: PropTypes.object,
  href: PropTypes.string,
  text: PropTypes.string,
};
