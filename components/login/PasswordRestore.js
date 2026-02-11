import React, {useRef} from "react";
import {required} from "../../constants/form";
import Form from "../baseComponents/gui/form/Form";
import {post} from "../../utils/api/api";
import Input from "../baseComponents/gui/input/Input";
import classNames from "classnames";
import styles from "./Form.module.scss";
import UserForm from "./UserForm";

export default function PasswordRestore() {
  const onSubmit = useRef((data) => {
    post("/user/password-restore", data);
  });
  return (
    <Form onSubmit={onSubmit.current}
          className={classNames(styles.form)}
    >
      <Input
        name="email"
        label="email: "
        defaultValue="asd@asd.as"
        rules={required("e-mail")}
      />
      <br/>
      <button type="submit">Отправить</button>
    </Form>
  );
}
