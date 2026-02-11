import React from "react";
import UserForm from "./UserForm";
import {email, required} from "../../constants/form";
import {useUser} from "../../redux/reducer/user";
import {useDispatch} from "react-redux";
import requests from "../../redux/reducer/requests";
import Input from "../baseComponents/gui/input/Input";
import Phone from "../baseComponents/gui/phone/Phone";
import classNames from "classnames";
import styles from "./Form.module.scss";
import CustomButton from "../baseComponents/gui/customButton/CustomButton";

export default function ProfileEdit(args) {
  const {profile} = useUser();
  const dispatch = useDispatch();
  return (
    <>
      <UserForm action={requests.thunks.update} {...args}
                className={classNames(args.className, styles.form)}
      >
        <Input
          name="username"
          label="username : "
          autoComplete={"username"}
          defaultValue={profile?.username}
          rules={required("username")}
        />
        <Input
          name="first_name"
          label="Имя : "
          autoComplete={"given-name"}
          defaultValue={profile?.first_name}
          rules={required("Имя")}
        />
        <Input
          name="last_name"
          label="Фамилия : "
          autoComplete={"family-name"}
          defaultValue={profile?.last_name}
          rules={required("Фамилия")}
        />
        <Input
          name="email"
          label="email : "
          autoComplete={"email"}
          defaultValue={profile?.email}
          rules={email("email")}
        />
        <button type="submit">Отправить</button>
      </UserForm>
      <hr style={{
        borderColor:"red"
      }}/>
      <UserForm
        className={classNames(args.className, styles.form)}
      >
        <h3 className={classNames(styles.form__title)}>Сменить пароль</h3>
        <Input
          labelProps={{style: {display: "none"}}}
          name="username"
          label="username : "
          autoComplete={"username"}
          defaultValue={profile?.username}
          rules={required("username")}
        />
        <Input
          name="password"
          type="password"
          autoComplete={"current-password"}
          label="Текущий пароль: "
          rules={required("")}
        />
        <Input
          name="new_password"
          type="password"
          autoComplete={"new-password"}
          label="Новый пароль: "
          rules={required("")}
        />
        <Input
          name="new_password"
          type="password"
          autoComplete={"new-password"}
          label="Ещё раз новый пароль: "
          rules={required("")}
        />

        <CustomButton tag={"button"} type={"submit"} text={"Отправить"}
                      className={classNames(styles.form__button)}
        />
      </UserForm>

      <hr/>

      <button onClick={() => dispatch(requests.thunks.logout())}>Выйти</button>

    </>
  );
}
