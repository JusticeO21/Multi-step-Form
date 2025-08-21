import Header from "../../Atoms/Header/Header";
import SelectedPlan from "../../Atoms/SelectedPlan/SelectedPlan";
import styles from "./FinishinUp.module.css";
import Button from "../../Atoms/Button/Button";
import useCustomNavigate from "../../../Hooks/UseNavigate";
import { useAppDispatch, useAppSelector } from "../../../Hooks/useRedux";
import { goBack, updateStep } from "../../../Redux/sidebarSlice";
import { reset as resetPlan } from "../../../Redux/PlanAndAddOnSlice";
import { reset as resetPersonalInfo } from "../../../Redux/personalInfoSlice";
import globalState from "../../../AppState/GlobalState";

function FinishingUp() {
  const { total, plan, addOns, isAYearPlan } = useAppSelector(
    (state) => state.planAndAddOns
  );

  const { name, mail, phone } = useAppSelector((state) => state.personalInfo);
  const { goToSelectedStep, goTo } = useCustomNavigate();
  const dispatch = useAppDispatch();

  const handleChangePlan = () => {
    goTo("/register/select-plan");
    globalState.setState("stage", 1);
  };

  function handleConfirmButtonClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    if (!plan) {
      dispatch(updateStep({ step: 2 }));
      goToSelectedStep();
      return;
    }

    if (!name || !mail || !phone) {
      dispatch(updateStep({ step: 1 }));
      goToSelectedStep();
      return;
    }

    dispatch(resetPlan());
    dispatch(resetPersonalInfo());
    return goTo("/register/thank-you");
  }

  function handleBackButtonClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    dispatch(goBack());
    goToSelectedStep();
  }

  return (
    <>
      <Header
        stageHeader="Finishing up"
        explainHeader="Double-check everything looks OK before confirming"
      />
      <div className={styles.selected_plan_container}>
        {plan && (
          <SelectedPlan
            plan={`${plan["name"]}`}
            planCost={`$ ${plan["cost"]}/${isAYearPlan ? "yr" : "mo"}`}
            variant="main_plan"
            showChangeButton={true}
            onChangeClick={handleChangePlan}
          />
        )}

        {addOns &&
          Object.entries(addOns).map(([key, value]) => {
            return (
              <SelectedPlan
                plan={key.replace(/_/g, " ")}
                planCost={`+$${value}/${isAYearPlan ? "yr" : "mo"}`}
                variant="addon"
                key={key}
              />
            );
          })}
      </div>

      <span className={styles.total_container}>
        <p>Total ({isAYearPlan ? "yearly" : "monthly"})</p>
        <p className={styles.total_cost}>${total}</p>
      </span>

      <span className={styles.buttons}>
        <Button text="go back" onClick={(e) => handleBackButtonClick(e)} />

        <Button
          positionButton="right"
          text="confirm"
          onClick={(e) => handleConfirmButtonClick(e)}
        />
      </span>
    </>
  );
}

export default FinishingUp;
