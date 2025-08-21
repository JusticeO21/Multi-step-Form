// Example usage of the improved ThankYou component
import ThankYou from './ThankYou';

// Example 1: Basic usage (default behavior)
const BasicThankYouExample = () => {
  return <ThankYou />;
};

// Example 2: Custom configuration
const CustomThankYouExample = () => {
  const handleRedirect = () => {
    console.log('Custom redirect logic executed');
  };

  return (
    <ThankYou
      title="Registration Complete!"
      message="Welcome to our platform! Your account has been successfully created. For any questions, please contact us at"
      supportEmail="help@example.com"
      autoRedirectDelay={10000} // 10 seconds
      redirectPath="/dashboard"
      showCountdown={true}
      allowCancelRedirect={true}
      onRedirect={handleRedirect}
      className="custom-thank-you"
    />
  );
};

// Example 3: No auto-redirect (manual navigation only)
const ManualNavigationExample = () => {
  return (
    <ThankYou
      title="Thank You for Your Purchase!"
      message="Your order has been confirmed. You will receive an email confirmation shortly. Need help? Contact us at"
      supportEmail="orders@shop.com"
      autoRedirectDelay={0} // Disable auto-redirect
      showCountdown={false}
    />
  );
};

// Example 4: Quick redirect without countdown
const QuickRedirectExample = () => {
  return (
    <ThankYou
      title="Success!"
      message="Your action was completed successfully"
      autoRedirectDelay={2000} // 2 seconds
      showCountdown={false}
      allowCancelRedirect={false}
    />
  );
};

// Example 5: Custom redirect path
const CustomRedirectExample = () => {
  return (
    <ThankYou
      title="Profile Updated!"
      message="Your profile changes have been saved successfully"
      autoRedirectDelay={3000}
      redirectPath="/profile"
      showCountdown={true}
    />
  );
};

export { 
  BasicThankYouExample, 
  CustomThankYouExample, 
  ManualNavigationExample, 
  QuickRedirectExample,
  CustomRedirectExample 
};
