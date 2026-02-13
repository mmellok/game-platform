import React, {forwardRef, useCallback} from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import Button from "../baseComponents/gui/button/Button";
import styles from "./CustomButton.module.scss";
import {combineModifiers} from "@/utils/modifiers/combineModifiers";
import {safeHTML} from "@/utils/safeHTML";
import {useButtonAction} from "./hooks/useButtonAction";

const CustomButton = forwardRef(function (
  {
    className,
    children,
    text,
    img,
    onClick: _onClick,
    disabled,
    tag,
    href,
    target,
    mods,
    action,
    type = "button",
    ...rest
  },
  ref
) {

  const customButtonClasses = (className ?? "")
    .split(" ")
    .filter(className => className.includes("customButton"))
    .map(className => styles[className]);

  const otherClasses = (className ?? "").split(" ").filter(className => !className.includes("customButton"));

  const onActionClick = useButtonAction(action);

  const onClick = useCallback((e) => {
    onActionClick?.(e);
    _onClick?.();
  }, [onActionClick, _onClick]);

  return (
    <Button
      ref={ref}
      className={classNames(
        styles.customButton,
        ...otherClasses,
        ...customButtonClasses,
        ...combineModifiers(styles.customButton, mods)
      )}
      onClick={onClick}
      disabled={disabled}
      tag={tag}
      href={href}
      target={target}
      type={type}
      {...rest}
    >
      {children ?? (
        <div className={styles.customButton__block}>
          {(img) && (
            <div className={styles.customButton__image}>
              {img && <img src={img} />}
            </div>
          )}
          {text && (
            <div className={styles.customButton__text}>
              {safeHTML(text)}
            </div>
          )}
        </div>
      )}
    </Button>
  );
});

CustomButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default CustomButton;
