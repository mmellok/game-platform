import getId from "../utils/getId";
import React, {useCallback, useContext, useMemo, useState} from "react";
import {ModalContext} from "../components/baseComponents/controllers/modalController/ModalProvider";

export function useModal() {
  return useContext(ModalContext);
}

function useAddModal(setModals, aliases) {
  return useCallback((modal) => {
    const info = {
      id: getId(),
      notify: {
        onOpen: modal.notify?.onOpen,
        onClose: modal.notify?.onClose,
      },
      timeout: modal?.timeout
    };

    if (!React.isValidElement(modal)) {
      info.type = typeof modal === "string" ? modal : modal.type;
      if (!aliases[info.type]) return false;

      const {Modal, props} = aliases[info.type];
      modal = React.createElement(Modal, Object.assign({modal: info}, props, modal.props, modal?.timeout));
    }

    const item = {...info, modal};
    info.notify.onOpen?.();
    setModals(v => [...v, item]);
    return {...info};
  }, [setModals, aliases]);
}

const isAll = id => id === "all" || id.type === "all" || id.all === true;
const makeFilter = (id) => {
  if (["string", "number"].indexOf(typeof id) >= 0) id = {id};
  const entries = Object.entries(id);
  return m => !entries.every(([key, value]) => m[key] === value);
}

function useCloseModal(setModals) {
  return useCallback((id) => {
    const filterFunction = isAll(id) ? () => false : makeFilter(id);

    setModals(v => {
      const passed = v.filter(filterFunction);
      const closeList = v.filter(item => !filterFunction(item));
      closeList.forEach(modal => modal.notify.onClose?.());
      return passed;
    });
  }, [setModals]);
}

export function useModalValue(aliases) {
  const [modals, setModals] = useState([]);
  const addModal = useAddModal(setModals, aliases);
  const closeModal = useCloseModal(setModals);
  return [
    modals,
    useMemo(() => ({addModal, closeModal}), [addModal, closeModal])
  ];
}
