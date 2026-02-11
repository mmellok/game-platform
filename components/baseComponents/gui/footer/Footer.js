import React from 'react';
import styles from "./Footer.module.scss"
import classNames from "classnames";

export default function Footer() {
  return (
    <footer className={classNames('footer',styles.footer)}>
      <div className={'footer-wrapper'}>
        @copyright {new Date().getFullYear()}
      </div>
    </footer>
  )
}
