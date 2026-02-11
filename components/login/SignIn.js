import React from "react";
import requests from "../../redux/reducer/requests";
import UserForm from "./UserForm";
import {required} from "../../constants/form";
import Input from "../baseComponents/gui/input/Input";
import styles from "./Form.module.scss";
import classNames from "classnames";
import CustomButton from "../baseComponents/gui/customButton/CustomButton";

export default function SignIn(args) {
  return (
    <UserForm action={requests.thunks.login} {...args}
              className={classNames(args.className, styles.form)}
    >
      <Input
        name="login"
        label="email: "
        autoComplete={"email"}
        defaultValue="asd@asd.as"
        rules={required("e-mail")}
      />
      <Input
        name="password"
        type="password"
        autoComplete={"current-password"}
        label="Пароль: "
        defaultValue="111111"
        rules={required("пароль")}
      />
      <CustomButton tag={"button"}
                    type={"submit"}
                    text={"Отправить"}
                    className={classNames(styles.form__button)}
      />
    </UserForm>
  );
}
