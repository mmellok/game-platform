import React from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./<%-class_name%>.module.scss";

<% if (type === "class") { %>
export default class <%-ClassName%> extends React.Component {
  render() {
    return (
      <div className={"<%-class_name%>"}>
      </div>
    );
  }
}
<% } else { %>
export default function <%-ClassName%>({className, children}) {
  return (
    <div className={classNames(styles["<%-class_name%>"], className)}>
      {children}
    </div>
  );
}
<%-ClassName%>.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
<% } %>
