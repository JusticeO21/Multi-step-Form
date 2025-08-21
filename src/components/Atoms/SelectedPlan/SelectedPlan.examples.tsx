// Example usage of the improved SelectedPlan component
import SelectedPlan from './SelectedPlan';

// Example 1: Main plan with change button
const MainPlanExample = () => {
  const handleChangePlan = () => {
    console.log('Navigate to plan selection');
  };

  return (
    <SelectedPlan
      plan="Pro Plan"
      planCost="$90/yr"
      variant="main_plan"
      showChangeButton={true}
      onChangeClick={handleChangePlan}
      changeButtonText="Change Plan"
    />
  );
};

// Example 2: Add-on without change button
const AddonExample = () => {
  return (
    <SelectedPlan
      plan="Online Service"
      planCost="+$10/yr"
      variant="addon"
    />
  );
};

// Example 3: Custom styling and accessibility
const CustomExample = () => {
  return (
    <SelectedPlan
      plan="Advanced Plan"
      planCost="$120/yr"
      className="custom-plan"
      aria-label="Advanced plan selected, costs $120 per year"
    />
  );
};

export { MainPlanExample, AddonExample, CustomExample };
