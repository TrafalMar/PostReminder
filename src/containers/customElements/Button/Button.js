import React from "react";
import classes from "./Button.module.css";

const Button = (props) => {
  let styles = [classes.Button];

  switch (props.color) {
    case "red":
      styles.push(classes.Red);
      break;
    case "green":
      styles.push(classes.Green);
      break;
    case "gray":
      styles.push(classes.Gray);
      break;
    default:
      styles.push(classes.Black);
      break;
  }

  if (props.bold) styles.push(classes.Bold);

  styles = styles.join(" ");

  return (
    <button disabled={props.disabled} className={styles} {...props}>
      {props.children}
    </button>
  );
};

export default Button;
