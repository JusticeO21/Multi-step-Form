import styles from "./StageLabel.module.css"


type StageLabelProps = {
    stage: number;
    label: string;
}

function StageLabel({ stage, label }: Readonly<StageLabelProps>) {
  return (
      <div className={styles.container}>
          <p>step {stage}</p>
          <h4>{label}</h4>
    </div>
  )
}

export default StageLabel

