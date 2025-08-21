import styles from "./DashBoardPreview.module.css";
import SideNav from "../../Organisms/SideNav/SideNav";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAppSelector } from "../../../Hooks/useRedux";
import useCustomNavigate from "../../../Hooks/UseNavigate";
import data from "../../../appData/stageData";

function DashBoardPreview() {
  const { step } = useAppSelector((state) => state.sidebar);
  const { goTo } = useCustomNavigate();

  useEffect(() => {
    goTo(`/register/${data[step - 1]["stageUrl"]}`);
  }, [step]);

  return (
    <div className={styles.container}>
      <SideNav stages={data} />
      <section className={styles.formsContainer}>
        <div className={styles.formContent}>
          <Outlet />
        </div>
      </section>
    </div>
  );
}

export default DashBoardPreview;
