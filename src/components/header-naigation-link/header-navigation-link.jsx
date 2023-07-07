import React from "react";
import styles from './header-navigation-link.module.css';

function NavigationLink(props) {
  const [isActive, setActiv] = React.useState(false);

  const onFocusLink = (e) => {
    //console.log(e.target);
    // e.target.classList.remove('text_color_inactive');
    // e.target.classList.add('text_color_primary');
    setActiv({
      isActive: !isActive,
    })
    console.log(`focus ${isActive}`)
  }

  React.useEffect(()=> {

  }, [isActive])

  const onLeaveLink = () => {
    setActiv({
      isActive: !isActive,
    })
    console.log(`leave ${isActive}`)
  }

  // text_color_inactive ${styles.link}`}>

  return (
    <a  onFocus={onFocusLink} onBlur={onLeaveLink} className={`${styles.link} text text_type_main-default ${isActive ? "text_color_primary" : "text_color_inactive"}`}>
      {props.children} 
    </a>
  )
};

export default NavigationLink