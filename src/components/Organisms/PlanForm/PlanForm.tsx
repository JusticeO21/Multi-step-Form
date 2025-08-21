import styles from "./PlanForm.module.css";
import Header from "../../Atoms/Header/Header";
import Card from "../../Molecules/Card/Card";
import Button from "../../Atoms/Button/Button";
import useCustomNavigate from "../../../Hooks/UseNavigate";
import ThemeSwitch from "../../Molecules/ThemeSwitch/ThemeSwitch";
import { useAppDispatch, useAppSelector } from "../../../Hooks/useRedux";
import { goToNextStep, goBack } from "../../../Redux/sidebarSlice";
import {
  updatePlan,
  updatePlanDuration,
  reset as resetPlan,
} from "../../../Redux/PlanAndAddOnSlice";
import Reset from "../../Atoms/Reset/Reset";

// Plan configuration constants
const PLANS_CONFIG = [
  {
    name: "Arcade",
    iconSrc: "/Images/icon-arcade.svg",
    monthlyPrice: 15,
    yearlyPrice: 150,
  },
  {
    name: "Advanced",
    iconSrc: "/Images/icon-advanced.svg",
    monthlyPrice: 12,
    yearlyPrice: 120,
  },
  {
    name: "Pro",
    iconSrc: "/Images/icon-pro.svg",
    monthlyPrice: 9,
    yearlyPrice: 90,
  },
] as const;

function PlanForm() {
  const { goToSelectedStep } = useCustomNavigate();
  const { plan, isAYearPlan } = useAppSelector((state) => state.planAndAddOns);
  const selectedPlan = plan?.name || "";
  const dispatch = useAppDispatch();

  function handleCardClick(plan: string, cost: number) {
    const storedplan = {
      name: plan,
      cost: cost,
    };
    dispatch(updatePlan(storedplan));
  }

  function handleReset() {
    dispatch(resetPlan());
  }

  function handleToggleTheme() {
    dispatch(updatePlanDuration());
    dispatch(resetPlan());
  }

  function handleNextButtonClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    dispatch(goToNextStep());
    goToSelectedStep();
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
      <Reset onClick={handleReset} />
      <Header
        stageHeader="Select your plan"
        explainHeader="You have the option of monthly or yearly billing."
      />
      <div className={styles.container}>
        {PLANS_CONFIG.map((planConfig) => {
          const price = isAYearPlan
            ? planConfig.yearlyPrice
            : planConfig.monthlyPrice;
          const period = isAYearPlan ? "yr" : "mo";

          return (
            <Card
              key={planConfig.name}
              iconSrc={planConfig.iconSrc}
              planName={planConfig.name}
              plan={`$${price}/${period}`}
              selected={selectedPlan === planConfig.name ? "selected" : ""}
              isAYearPlan={isAYearPlan}
              onClick={() => handleCardClick(planConfig.name, price)}
            />
          );
        })}
      </div>
      <ThemeSwitch isYearly={isAYearPlan} onToggle={handleToggleTheme} />
      <span className={styles.buttons}>
        <Button text="go back" onClick={(e) => handleBackButtonClick(e)} />

        <Button
          positionButton="right"
          text="next step"
          onClick={(e) => handleNextButtonClick(e)}
        />
      </span>
    </>
  );
}

export default PlanForm;
