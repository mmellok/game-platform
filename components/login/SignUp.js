import React from "react";
import Select from "../baseComponents/gui/form/Select";
import Checkbox from "../baseComponents/gui/form/Checkbox";
import UserForm from "./UserForm";
import {useForm} from "react-hook-form";
import {email, required} from "../../constants/form";
import requests from "../../redux/reducer/requests";
import Input from "../baseComponents/gui/input/Input";
import Phone from "../baseComponents/gui/phone/Phone";
import CustomButton from "../baseComponents/gui/customButton/CustomButton";
import styles from "./Form.module.scss";
import classNames from "classnames";

export default function SignUp(args) {
  const form = useForm();

  const inputs = [
    {
      name:"username",
      label:"Имя: ",
      autoComplete:"given-name",
      defaultValue:"Имя",
      rules:{
        ...required("Имя")
      }
    },
    {
      type:"phone",
      name:"phone"
    },
    {
      name:"last_name",
      label:"Фамилия: ",
      autoComplete:"family-name",
      defaultValue:"Фамилия",
      rules:{
        ...required("Фамилия")
      }
    },
    {
      name:"email",
      label:"E-mail: ",
      autoComplete:"email",
      defaultValue:"asd@asd.as",
      rules:{
        ...required("E-mail")
      }
    },
    {
      name:"password",
      type:"password",
      label:"Пароль: ",
      autoComplete:"new-password",
      defaultValue:"1",
      rules:{
        ...required("Пароль")
      }
    },
    {
      name:"password_repeat",
      type:"password",
      label:"Ещё раз пароль: ",
      autoComplete:"new-password",
      defaultValue:"1",
      rules:{
        ...required("Пароль")
      }
    },
    {
      type:"select",
      name:"gender",
      label:"Пол: ",
      options:[
        {label: "Жен", value: 1},
        {label: "Муж", value: 2},
        {label: "другое", value: 3}
      ]
    },
    {
      type:"checkbox",
      name:"agreement",
      labelAs:<>Согласен с <a>политикой безопасности</a>:</>,
      value:1,
      defaultChecked:true,
      rules:{
        ...required({"message": "Необходимо согласиться с политикой безопасности"})
      }
    },
  ];

  return (
    <UserForm form={form} action={requests.thunks.signup} {...args}
              className={classNames(args?.className, styles.form)}
    >
      <Input
        name="username"
        label="Имя: "
        autoComplete={"given-name"}
        defaultValue="Имя"
        rules={required("Имя")}
      />
      <Phone name={"phone"}/>
      <Input
        name="last_name"
        label="Фамилия: "
        autoComplete={"family-name"}
        defaultValue="Фамилия"
        rules={required("Фамилия")}
      />
      <Input
        name="email"
        label="E-mail: "
        autoComplete={"email"}
        defaultValue="asd@asd.as"
        rules={email("E-mail")}
      />
      <Input
        name="password"
        type="password"
        autoComplete={"new-password"}
        label="Пароль: "
        defaultValue="1"
        rules={required("Пароль")}
      />
      <Input
        name="password_repeat"
        type="password"
        autoComplete={"new-password"}
        label="Ещё раз пароль: "
        defaultValue="1"
        // rules={{
        //   ...required("Пароль"),
        //   validate: value => value === form.getValues("password") || "Введенные пароли не совпадают"
        // }}
      />
      <Select
        name="gender"
        label="Пол: "
        options={[
          {label: "Жен", value: 1},
          {label: "Муж", value: 2},
          {label: "другое", value: 3}
        ]}
      />
      <Checkbox
        labelAs={<>Согласен с <a>политикой безопасности</a>:</>}
        name="agreement"
        defaultChecked
        value={1}
        rules={required({"message": "Необходимо согласиться с политикой безопасности"})}
      />
      <CustomButton tag={"button"} type={"submit"} text={"Отправить"}
                    className={classNames(styles.form__button)}
      />
    </UserForm>
  );
}
