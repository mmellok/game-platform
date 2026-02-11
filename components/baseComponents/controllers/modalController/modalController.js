import React, {useEffect, useRef} from "react";
import * as PropTypes from "prop-types";
import {AnimatePresence} from "framer-motion";
import useErrorHandler from "../../../../hooks/useErrorHandler";
import {cssTransitionTimeIn, cssTransitionTimeOut} from "../../../../constants/modals";
import cm from "../../gui/customModal/CustomModal.module.scss";
import ml from "../../../../components/layouts/MainLayout.module.scss";

export default function ModalController({Context, value, modals}) {
  const scrollTop = useRef(null);
  const isModals = modals.length > 0;
  useErrorHandler();
  /**
   * добавление класса scroll-disabler на body
   */
  useEffect(() => {
    const DISABLER = ml.scrollDisabler;
    const {body, scrollingElement, documentElement} = document;
    const _scrollingElement = scrollingElement || documentElement;

    if (!isModals) {
      if (!body.classList.contains(DISABLER)) return;

      body.classList.remove(DISABLER);
      body.style.removeProperty("top");

      _scrollingElement.scrollTop = scrollTop.current;
    } else {
      const scrollTopValue = _scrollingElement.scrollTop;
      scrollTop.current = scrollTopValue;

      body.classList.add(DISABLER);
      body.style.top = `-${scrollTopValue}px`;
    }
  }, [isModals]);


  return (
    <AnimatePresence>
      {modals.map(({modal, timeout, ...info}) => {
        const enterTime = timeout?.enter ? timeout?.enter : timeout ? timeout : cssTransitionTimeIn;
        const exitTime = timeout?.exit ? timeout?.exit : timeout ? timeout : cssTransitionTimeOut;
        return (
          <div className={cm.customModal}>
            <Context.Provider value={{...value, ...info, timeout:{enter:enterTime,exit:exitTime}}}>
              {modal}
            </Context.Provider>
          </div>
        )
      })}
    </AnimatePresence>
  )

}

ModalController.propTypes = {
  Context: PropTypes.object,
  value: PropTypes.object,
  modals: PropTypes.array,
};
