import React, {useContext, useMemo} from 'react';
import {header} from "../../constants/copyright";
import {node} from "prop-types";
import ModalProvider from "../baseComponents/controllers/modalController/ModalProvider";
import Preloader from "../baseComponents/gui/preloader/Preloader";
import styles from "./MainLayout.module.scss";
import classNames from "classnames";

export default function MainLayout({children}) {
  return (
    <ModalProvider
      aliases={useMemo(() => ({
      }), [])}
    >
      <Preloader/>
      {children}
    </ModalProvider>
  )
}

MainLayout.propTypes = {
  children: node,
};
