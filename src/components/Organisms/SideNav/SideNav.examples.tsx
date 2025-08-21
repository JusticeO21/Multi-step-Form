// Example usage of the improved SideNav component
import SideNav from './SideNav';

const exampleStages = [
  {
    stage: 1,
    label: "YOUR INFO",
    stageUrl: "",
  },
  {
    stage: 2,
    label: "SELECT PLAN",
    stageUrl: "select-plan",
  },
  {
    stage: 3,
    label: "ADD-ONS",
    stageUrl: "add-ons",
  },
  {
    stage: 4,
    label: "SUMMARY",
    stageUrl: "finishing-up",
  },
];

// Example 1: Basic usage
const BasicSideNavExample = () => {
  return (
    <SideNav stages={exampleStages} />
  );
};

// Example 2: Custom configuration
const CustomSideNavExample = () => {
  return (
    <SideNav 
      stages={exampleStages}
      className="custom-sidenav"
      aria-label="Registration progress"
      enableKeyboardNavigation={true}
      desktopBreakpoint={768}
    />
  );
};

// Example 3: Mobile-only (no keyboard navigation)
const MobileSideNavExample = () => {
  return (
    <SideNav 
      stages={exampleStages}
      enableKeyboardNavigation={false}
      aria-label="Registration steps"
    />
  );
};

export { BasicSideNavExample, CustomSideNavExample, MobileSideNavExample };
