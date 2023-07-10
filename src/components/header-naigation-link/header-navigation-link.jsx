import React from "react";
import styles from "./header-navigation-link.module.css";
import PropTypes from "prop-types";

function NavigationLink(props) {
  NavigationLink.propTypes = {
    text: PropTypes.string,
    href: PropTypes.string,
    children: PropTypes.element
  };

  const [isActive, setActive] = React.useState(null);

  const onFocusLink = () => {
    setActive(styles.linkActive);
  };

  const onLeaveLink = () => {
    setActive(null);
  };

  return (
    <a
      href={props.href}
      onClick={onFocusLink}
      onBlur={onLeaveLink}
      className={`${styles.link} ${isActive} text text_type_main-default text_color_inactive`}
    >
      {props.children}
      <span className="ml-2">{props.text}</span>
    </a>
  );
}

export default NavigationLink;
