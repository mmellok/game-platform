import React, {useState, useCallback} from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./Button.module.scss";

const defaults = {
  up: styles.button_up,
  down: styles.button_down,
  hover: styles.button_hover,
  tag: "button"
};

const Button = React.forwardRef(
  function Button({
                    className,
                    tag,
                    compclass,
                    color,
                    border,
                    type,
                    onClick,
                    children,
                    up,
                    down,
                    hover,
                    ...rest
                  }, ref) {
    const [pressed, setPressed] = useState(false);
    const [hovered, setHover] = useState(false);
    const settings = {up: up ?? defaults.up, down: down ?? defaults.down, hover: hover ?? defaults.hover};
    const Tag = tag || defaults.tag;

    const pressedOn = useCallback(() => setPressed(true), []);
    const pressedOff = useCallback(() => setPressed(false), []);
    const hoverOn = useCallback(() => setHover(true), []);
    const hoverOff = useCallback(() => setHover(false), []);
    return (
      <Tag
        {...rest}
        className={
          classNames(
            styles.button, "button", compclass,
            {
              [`button_${color}`]: !!color,
              [`button_${border}`]: !!border,
              [`button_${type}`]: !!type,
              [settings.down]: pressed,
              [settings.hover]: hovered && !pressed,
              [settings.up]: !hovered && !pressed,
            },
            className
          )
        }

        ref={ref}

        onClick={onClick}

        onMouseUp={pressedOff}
        onMouseDown={pressedOn}
        onMouseMove={hoverOn}
        onMouseLeave={hoverOff}

        onTouchStart={pressedOn}
        onTouchEnd={pressedOff}
        onTouchCancel={pressedOff}
      >
        {children}
      </Tag>)
  }
);

export default Button;

Button.defaultProps = defaults;

Button.propTypes = {

  /**
   * Внетренние элементы копмонента
   */
  children: PropTypes.node,
  /**
   * Классы для компонента
   */
  className: PropTypes.string,
  /**
   * Все пропы пробрасываются. Так что можно сделать кнопку с тегом a и пробросить проп href, для получения ссылки
   */
  tag: PropTypes.string,
  /**
   * Класс по умолчанию
   */
  up: PropTypes.string,
  /**
   * Класс когда кнопка нажата
   */
  down: PropTypes.string,
  /**
   * Класс на ховер
   */
  hover: PropTypes.string,
  /**
   * Модификатор для цвета
   */
  color: PropTypes.string,
  /**
   * Модификатор для рамки
   */
  border: PropTypes.string,
  /**
   * Модификатор для определенного типа
   */
  type: PropTypes.string,
  /**
   * Дополнительный класс
   */
  compclass: PropTypes.string,
};
