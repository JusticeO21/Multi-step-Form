import styles from './StageNumber.module.css'

type StageNumberProps = {
    stage: number;
    current: boolean;
};

function StageNumber({stage, current}: Readonly<StageNumberProps>) {
  return (
      <div className={`${styles.container} ${current && styles.active}`}>
          <p>{ stage }</p>
      </div>
  )
}

export default StageNumber
