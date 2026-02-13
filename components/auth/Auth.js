import React, {useState} from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./Auth.module.scss";
import Form from "@/components/baseComponents/gui/form/Form";
import CustomButton from "@/components/customButton/CustomButton";
import Input from "@/components/baseComponents/gui/input/Input";
import Checkbox from "@/components/baseComponents/gui/checkbox/Checkbox";
import Transition from "../transition/Transition";
import {motion} from "framer-motion";

const FORMFIELD = {
  button: CustomButton,
  checkbox: Checkbox,
  input: Input,
};

export default function Auth({className, auth, reg}) {
  const [formState, setFormState] = useState("auth");

  return (
    <div className={classNames(styles["auth"], className)}>
      <Transition
        as={AuthBlock}
        keyId={`auth__block-${formState}`}
        switchMode
        customProps={{className: "auth__block", ownClass: styles.auth__block}}
        auth={auth}
        reg={reg}
        formState={formState}
      />
    </div>
  );
}

function AuthBlock({auth, reg, formState, ...rest}){
  const components = {
    auth: () => (
      <div className={classNames(styles["auth__container"])}>
        <h2 className={classNames(styles["auth__title"])}>{auth.title}</h2>
        <AuthForm {...auth}/>
      </div>
    ),
    reg: () => (
      <div className={classNames(styles["auth__container"])}>
        <h2 className={classNames(styles["auth__title"])}>{reg.title}</h2>
        <AuthForm {...reg}/>
      </div>
    ),
  } 

  return (
    <motion.div className={classNames(styles.auth__block)}  {...rest}>
      {components[formState]?.()}
    </motion.div>
  )
}


function AuthForm({list, title}){
  return(
    <form className={styles["auth__form"]}>
      {list.map((field, index) => (
        <FormField
          key={`field-${index}`}
          {...field}
        />
      ))}
    </form>
  )
}

function FormField({ type, props }) {
  const Component = FORMFIELD[type];
  if (!Component) return null;
  return <Component {...props} />;
}

Auth.propTypes = {
  className: PropTypes.string
};

