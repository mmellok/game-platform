import React from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./Main.module.scss";
import {image} from "@/utils/data/baseUrl";
import CustomButton from "@/components/customButton/CustomButton";

export default function Main({className, name, lifes, footer}) {
  return (
    <div className={classNames(styles["main"], className)}>
      <div className={classNames(styles["main__header"])}>
        <div className={classNames(styles["main__life"])}>
          <img className={classNames(styles["main__lifeImage"])} src={image("life.png")}/>
          <div className={classNames(styles["main__lifeCounter"])}>{lifes}</div>
        </div>
        <h3 className={classNames(styles["main__name"])}></h3>
      </div>
      <div className={classNames(styles["main__buttons"])}>
        {footer.map((item, index) => (
          <CustomButton
            key={`CustomButton-${index}`}
            {...item}
          />
        ))}
      </div>
    </div>
  );
}
Main.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

