import React from "react";
import * as PropTypes from "prop-types";
import CustomMenuItems from "./CustomMenuItems";
import styles from "./CustomMenu.module.scss";
import classNames from "classnames";


export default function CustomMenu({customMenuItems,className}) {
  return (
    <nav className={classNames(styles.customMenu,className)}>
      <ul className={styles.customMenu__list}>
        <CustomMenuItems items={customMenuItems}/>
      </ul>
    </nav>
  )
}


CustomMenu.propTypes = {
  customMenuItems: PropTypes.array
};
