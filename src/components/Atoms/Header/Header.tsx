import styles from "./Header.module.css";

type HeaderProps = {
    stageHeader: string;
    explainHeader: string;
}
 
function Header({stageHeader, explainHeader}:Readonly<HeaderProps>) {
  return (
      <header className={styles.container}>
          <h1>{stageHeader }</h1>
          <p>{explainHeader}</p>
      </header>
  )
}

export default Header
