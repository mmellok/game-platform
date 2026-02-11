import React from 'react';
import PageDescription from "../components/baseComponents/head/pageDescription/PageDescription";
import defaultPage from "../constants/page-description";
import CustomButton from "../components/baseComponents/gui/customButton/CustomButton";
import {useModal} from "../hooks/useModal";

export default function HomeModals() {
  const {addModal} = useModal();

  return (
    <>
      <PageDescription {...defaultPage}/>

      <CustomButton text={"модальник"}
                    onClick={() => addModal(
                      {
                        type: "testModal",
                        props: {text: `Теперь настройка времени анимации вынесена в функцию вызова модальника.\n
                        А настройка самой анимации в компонент, который вызвает CustomModal\n\n
                        Если в CustomModal не передавать никаких настроек, то берутся значения по умолчанию
                        `},
                      }
                    )}
      />
    </>
  );
}

