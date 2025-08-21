import styles from "./Reset.module.css";

type ResetProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};
function Reset({onClick} : Readonly<ResetProps>) {
  return (
      <button className={styles.button} onClick={onClick}>
          Reset
    </button>
  )
}

export default Reset
