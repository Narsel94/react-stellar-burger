import {FC} from "react";
import styles from "./section.module.css";
import { TSectionProps } from "../../utils/types";

const Section:FC<TSectionProps> = (props) => {
  return <section className={styles.section}>{props.children}</section>;
}

export default Section