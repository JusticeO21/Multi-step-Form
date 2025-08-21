import { combineReducers } from "@reduxjs/toolkit";
import sidebarReducer from "./sidebarSlice";
import personalInfoReducer from "./personalInfoSlice";
import planAndAddOnsReducer from "./PlanAndAddOnSlice";
import type { PersonalInfoState } from "./personalInfoSlice";
import type { SidebarState } from "./sidebarSlice";
import type { PlanAndAddOnsState } from "./PlanAndAddOnSlice";

export interface RootState {
  personalInfo: PersonalInfoState;
  sidebar: SidebarState;
  planAndAddOns: PlanAndAddOnsState;
}

const rootReducer = combineReducers({
  personalInfo: personalInfoReducer,
  sidebar: sidebarReducer,
  planAndAddOns: planAndAddOnsReducer,
});

export type { PersonalInfoState, SidebarState, PlanAndAddOnsState };

export const selectPersonalInfo = (state: RootState) => state.personalInfo;
export const selectSidebar = (state: RootState) => state.sidebar;
export const selectPlanAndAddOns = (state: RootState) => state.planAndAddOns;

export const selectCurrentStep = (state: RootState) => state.sidebar.step;
export const selectUserName = (state: RootState) => state.personalInfo.name;
export const selectUserEmail = (state: RootState) => state.personalInfo.mail;
export const selectUserPhone = (state: RootState) => state.personalInfo.phone;
export const selectSelectedPlan = (state: RootState) =>
  state.planAndAddOns.plan;
export const selectSelectedAddOns = (state: RootState) =>
  state.planAndAddOns.addOns;
export const selectTotalCost = (state: RootState) => state.planAndAddOns.total;
export const selectIsYearlyPlan = (state: RootState) =>
  state.planAndAddOns.isAYearPlan;

export const selectIsFormComplete = (state: RootState) => {
  const { name, mail, phone } = state.personalInfo;
  const { plan } = state.planAndAddOns;
  return Boolean(name.trim() && mail.trim() && phone.trim() && plan);
};

export const selectFormProgress = (state: RootState) => {
  const { step } = state.sidebar;
  const maxSteps = 4;
  return Math.round((step / maxSteps) * 100);
};

export default rootReducer;
