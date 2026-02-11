import React, {useContext, useMemo} from 'react';
import CustomHeader from '../baseComponents/gui/customHeader/CustomHeader';
import Footer from '../baseComponents/gui/footer/Footer';
import {header} from "../../constants/copyright";
import {node} from "prop-types";
import ModalProvider from "../baseComponents/controllers/modalController/ModalProvider";
import Preloader from "../baseComponents/gui/preloader/Preloader";
import ErrorHandlerModal from "../baseComponents/gui/errorHandlerModal/ErrorHandlerModal";
import styles from "./MainLayout.module.scss";
import classNames from "classnames";
import {BurgerContext} from "../../providers/BurgerProvider";
import TestModal from "../testModal/TestModal";

export default function MainLayout({children}) {
  const { burger } = useContext(BurgerContext);
  return (
    <ModalProvider
      aliases={useMemo(() => ({
        // errorHandlerModal: {Modal: ErrorHandlerModal},
        // infoModal: {Modal: InfoModal, props: {message: "Lorem ipsum"}}
        testModal: {Modal: TestModal, props: {text: "Lorem ipsum 2222"}}
      }), [])}
    >
      <Preloader/>
      <input type={"checkbox"}
             id={"menu-burger"}
             checked={burger}
             value={burger}
             readOnly={true}
      />
      <div className={classNames('main-container',styles.mainContainer,{
        [styles.mainContainer_overflow]:burger
      })}>
        <CustomHeader {...header}/>
        <div className={classNames('content-wrapper',styles.contentWrapper)}>{children}</div>
        <Footer/>
      </div>
    </ModalProvider>
  )
}

MainLayout.propTypes = {
  children: node,
};
