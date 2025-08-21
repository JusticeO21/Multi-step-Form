// Add-ons configuration data
export type AddOnConfig = {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  popular?: boolean;
  category?: string;
  icon?: string;
  features?: string[];
};

export const ADD_ONS_CONFIG: AddOnConfig[] = [
  {
    id: "online_service",
    name: "Online Service",
    description: "Access to multiplayer games",
    monthlyPrice: 1,
    yearlyPrice: 10,
    popular: true,
    category: "gaming",
    icon: "/images/icon-online.svg",
    features: [
      "Multiplayer gaming",
      "Online tournaments",
      "Global leaderboards",
      "Cross-platform play"
    ]
  },
  {
    id: "larger_storage",
    name: "Larger Storage",
    description: "Extra 1TB of cloud save",
    monthlyPrice: 3,
    yearlyPrice: 30,
    category: "storage",
    icon: "/images/icon-storage.svg",
    features: [
      "1TB cloud storage",
      "Automatic backups",
      "Cross-device sync",
      "Version history"
    ]
  },
  {
    id: "customizable_profile",
    name: "Customizable Profile",
    description: "Custom theme on your profile",
    monthlyPrice: 1,
    yearlyPrice: 10,
    category: "personalization",
    icon: "/images/icon-profile.svg",
    features: [
      "Custom themes",
      "Profile badges",
      "Avatar customization",
      "Unique username colors"
    ]
  },
];

// Helper functions for add-ons
export const getAddOnById = (id: string): AddOnConfig | undefined => {
  return ADD_ONS_CONFIG.find(addOn => addOn.id === id);
};

export const getAddOnsByCategory = (category: string): AddOnConfig[] => {
  return ADD_ONS_CONFIG.filter(addOn => addOn.category === category);
};

export const getPopularAddOns = (): AddOnConfig[] => {
  return ADD_ONS_CONFIG.filter(addOn => addOn.popular);
};

export const calculateTotalPrice = (
  selectedAddOnIds: string[], 
  isYearly: boolean
): number => {
  return selectedAddOnIds.reduce((total, id) => {
    const addOn = getAddOnById(id);
    if (addOn) {
      return total + (isYearly ? addOn.yearlyPrice : addOn.monthlyPrice);
    }
    return total;
  }, 0);
};

export const formatPrice = (price: number, isYearly: boolean): string => {
  const period = isYearly ? "yr" : "mo";
  return `$${price}/${period}`;
};

export const getAddOnSavings = (addOn: AddOnConfig): number => {
  const yearlyTotal = addOn.yearlyPrice;
  const monthlyTotal = addOn.monthlyPrice * 12;
  return monthlyTotal - yearlyTotal;
};

export const getAddOnSavingsPercentage = (addOn: AddOnConfig): number => {
  const savings = getAddOnSavings(addOn);
  const monthlyTotal = addOn.monthlyPrice * 12;
  return Math.round((savings / monthlyTotal) * 100);
};
