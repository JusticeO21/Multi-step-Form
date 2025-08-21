// Example usage of the improved AddOnsForm component
import AddOnsForm from './AddOnsForm';

// Example 1: Basic usage (default behavior)
const BasicAddOnsFormExample = () => {
  return <AddOnsForm />;
};

// Example 2: Custom configuration
const CustomAddOnsFormExample = () => {
  return (
    <AddOnsForm
      title="Choose Your Add-ons"
      subtitle="Enhance your experience with these optional features"
      allowSkip={false}
      maxSelections={2}
      className="custom-addons-form"
    />
  );
};

// Example 3: Limited selections
const LimitedSelectionsExample = () => {
  return (
    <AddOnsForm
      title="Premium Add-ons"
      subtitle="Select up to 1 premium feature"
      allowSkip={true}
      maxSelections={1}
    />
  );
};

// Example 4: Required selections
const RequiredSelectionsExample = () => {
  return (
    <AddOnsForm
      title="Required Add-ons"
      subtitle="Please select at least one add-on to continue"
      allowSkip={false}
    />
  );
};

// Example 5: Custom styling
const CustomStyledExample = () => {
  return (
    <div style={{ padding: '2rem', backgroundColor: '#f5f5f5' }}>
      <AddOnsForm
        title="Gaming Enhancements"
        subtitle="Take your gaming to the next level"
        allowSkip={true}
        maxSelections={3}
        className="gaming-addons"
      />
    </div>
  );
};

export { 
  BasicAddOnsFormExample, 
  CustomAddOnsFormExample, 
  LimitedSelectionsExample,
  RequiredSelectionsExample,
  CustomStyledExample
};
