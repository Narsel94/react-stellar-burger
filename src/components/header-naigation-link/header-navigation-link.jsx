import React from "react";
import styles from './header-navigation-link.module.css';

function NavigationLink(props) {
  const onFocusLink = (e) => {
    console.log(e.target);
    e.target.classList.remove('text_color_inactive');
    e.target.classList.add('text_color_primary')
  }

  const onLeaveLink = (e) => {
    e.target.classList.add('text_color_inactive');
    e.target.classList.remove('text_color_primary')
  }

  return (
    // console.log(props),
    <a href={props.href} onFocus={onFocusLink} onBlur={onLeaveLink} className={`text text_type_main-default text_color_inactive ${styles.link}`}>
     {props.children} 
    </a>
  )
};

export default NavigationLink