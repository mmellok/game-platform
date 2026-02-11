import React from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import Button from "../button/Button";
import Icon from "../icon/Icon";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {image} from "../../../../utils/data/baseUrl";
import style from "./CustomButton.module.scss";


const CustomButton = React.forwardRef(
  function CustomButton(props, ref) {
    const {
      className, children,
      text,
      icon,
      img,
      isLoad = false,
      ...rest
    } = props;

    return (
      <Button
        className={classNames( style.customButton,  className,  {
          [style.customButton_icon]: icon,
          [style.customButton_hideContent]: isLoad,
        })}
        ref={ref}
        {...rest}
      >
        {text && <div className={classNames(style.customButton__text)}>{text}</div>}
        {img && <div className={classNames(style.customButton__image)}><img src={img} alt={''}/></div>}
        {icon && <div className={classNames(style.customButton__image)}><Icon name={icon}/></div>}
        <TransitionGroup component={null}>
          {isLoad ?
            <CSSTransition key={isLoad} timeout={{enter: 500, exit: 500}}
                           classNames={classNames(style.customButton__load)}>
              <div className={classNames(style.customButton__load)}>
                <img src={image("test/load.svg", true)}/>
              </div>
            </CSSTransition> : null}
        </TransitionGroup>
        {children}
      </Button>
    );
  });

export default CustomButton;

CustomButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

