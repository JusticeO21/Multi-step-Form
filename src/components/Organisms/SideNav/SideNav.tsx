import styles from "./SideNav.module.css";
import Stage from "../../Molecules/Stage/Stage";
import useCustomNavigate from "../../../Hooks/UseNavigate";
import { useAppSelector, useAppDispatch } from "../../../Hooks/useRedux";
import { updateStep } from "../../../Redux/sidebarSlice";
import { useCallback } from "react";
import useMediaQuery from "../../../Hooks/useMediaQuery";

interface StageData {
  stage: number;
  label: string;
  stageUrl: string;
}

type SideNavProps = {
  stages: Array<StageData>;
  className?: string;
  "aria-label"?: string;
  enableKeyboardNavigation?: boolean;
  desktopBreakpoint?: number;
};

function SideNav({
  stages,
  className = "",
  "aria-label": ariaLabel = "Navigation steps",
  enableKeyboardNavigation = true,
  desktopBreakpoint = 1000,
}: Readonly<SideNavProps>) {
  const { goTo } = useCustomNavigate();
  const currentStep = useAppSelector((state) => state.sidebar.step);
  const dispatch = useAppDispatch();

  // Check if we're on desktop
  const isDesktop = useMediaQuery(`(min-width: ${desktopBreakpoint}px)`);

  const handleStageClick = useCallback(
    (stageUrl: string, targetStep: number) => {
      // Only allow navigation on desktop or if explicitly enabled
      if (!isDesktop) return;

      // Navigate to the selected stage
      goTo(`/register/${stageUrl}`);
      dispatch(updateStep({ step: targetStep }));
    },
    [isDesktop, goTo, dispatch]
  );

  // Build container classes
  const containerClasses = [styles.container, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClasses}>
      <nav role="navigation" aria-label={ariaLabel} aria-current="step">
        {stages.map((stageData, index) => {
          const stepNumber = index + 1;
          const isCurrent = currentStep === stepNumber;
          const isClickable = isDesktop;

          if (isClickable) {
            return (
              <Stage
                key={`stage-${stageData.stage}-${index}`}
                stage={stageData.stage}
                label={stageData.label}
                current={isCurrent}
                clickable={true}
                onClick={() => handleStageClick(stageData.stageUrl, stepNumber)}
                disabled={!enableKeyboardNavigation}
                aria-label={`Step ${stepNumber}: ${stageData.label}${
                  isCurrent ? " (current)" : ""
                }`}
              />
            );
          }

          return (
            <Stage
              key={`stage-${stageData.stage}-${index}`}
              stage={stageData.stage}
              label={stageData.label}
              current={isCurrent}
              clickable={false}
              aria-label={`Step ${stepNumber}: ${stageData.label}${
                isCurrent ? " (current)" : ""
              }`}
            />
          );
        })}
      </nav>
    </div>
  );
}

export default SideNav;
