import React from "react";
import classNames from "classnames";
import LabelInput from "../form/LabelInput";
import styles from "./Input.module.scss";


export default function Input({label, comp, ...rest}) {
  return (
    <LabelInput
      labelProps={{
        className: classNames("input", styles.input, comp, {
          [`input_error`]: Object.values(rest?.error?.props?.errors[rest.name] || {}).length,
          [styles.input_error]: Object.values(rest?.error?.props?.errors[rest.name] || {}).length
        })
      }}
      label={label ? <div className={classNames("input__name", styles.input__name)}>{label}</div> : null}
      className={classNames("input__block",styles.input__block)}
      maxLength={`${rest.max ? rest.max : null}`}
      {...rest}
    />
  );
}

