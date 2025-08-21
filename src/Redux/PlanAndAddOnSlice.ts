import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Plan {
  name: string;
  cost: number;
}

export interface AddOns {
  [key: string]: number;
}

export interface PlanAndAddOnsState {
  plan?: Plan;
  addOns?: AddOns;
  total: number;
  isAYearPlan: boolean;
}

export type PlanUpdate = Plan;
export type AddOnUpdate = { [key: string]: number };

const initialState: PlanAndAddOnsState = {
  plan: undefined,
  addOns: undefined,
  total: 0,
  isAYearPlan: false,
};

const planAndAddOnsSlice = createSlice({
  name: "planAndAddOns",
  initialState,
  reducers: {
    updatePlan: (state, action: PayloadAction<PlanUpdate>) => {
      const previousCost = state.plan?.cost || 0;
      state.total -= previousCost;
      state.plan = { ...action.payload };
      state.total += action.payload.cost;
    },

    updateAddOns: (state, action: PayloadAction<AddOnUpdate>) => {
      state.addOns ??= {};

      Object.entries(action.payload).forEach(([key, cost]) => {
        if (typeof cost === "number" && cost >= 0) {
          const previousCost = state.addOns?.[key] || 0;
          state.total -= previousCost;
          state.addOns![key] = cost;
          state.total += cost;
        }
      });
    },

    removeAddOn: (state, action: PayloadAction<string>) => {
      const addOnId = action.payload;
      if (state.addOns && addOnId in state.addOns) {
        const cost = state.addOns[addOnId];
        state.total -= cost;
        delete state.addOns[addOnId];

        if (Object.keys(state.addOns).length === 0) {
          state.addOns = undefined;
        }
      }
    },

    clearAllAddOns: (state) => {
      if (state.addOns) {
        const totalAddOnsCost = Object.values(state.addOns).reduce(
          (sum, cost) => sum + cost,
          0
        );
        state.total -= totalAddOnsCost;
        state.addOns = undefined;
      }
    },

    updatePlanDuration: (state) => {
      state.isAYearPlan = !state.isAYearPlan;
    },

    setPlanDuration: (state, action: PayloadAction<boolean>) => {
      state.isAYearPlan = action.payload;
    },

    recalculateTotal: (state) => {
      const planCost = state.plan?.cost || 0;
      const addOnsCost = state.addOns
        ? Object.values(state.addOns).reduce((sum, cost) => sum + cost, 0)
        : 0;
      state.total = planCost + addOnsCost;
    },

    reset: (state) => {
      return {
        ...initialState,
        isAYearPlan: state.isAYearPlan,
      };
    },

    fullReset: () => {
      return { ...initialState };
    },
  },
});

export const {
  updatePlan,
  updateAddOns,
  removeAddOn,
  clearAllAddOns,
  updatePlanDuration,
  setPlanDuration,
  recalculateTotal,
  reset,
  fullReset,
} = planAndAddOnsSlice.actions;

export const selectPlanAndAddOns = (state: {
  planAndAddOns: PlanAndAddOnsState;
}) => state.planAndAddOns;

export const selectPlan = (state: { planAndAddOns: PlanAndAddOnsState }) =>
  state.planAndAddOns.plan;

export const selectAddOns = (state: { planAndAddOns: PlanAndAddOnsState }) =>
  state.planAndAddOns.addOns;

export const selectTotal = (state: { planAndAddOns: PlanAndAddOnsState }) =>
  state.planAndAddOns.total;

export const selectIsYearPlan = (state: {
  planAndAddOns: PlanAndAddOnsState;
}) => state.planAndAddOns.isAYearPlan;

export const selectHasPlan = (state: { planAndAddOns: PlanAndAddOnsState }) =>
  Boolean(state.planAndAddOns.plan);

export const selectHasAddOns = (state: { planAndAddOns: PlanAndAddOnsState }) =>
  Boolean(
    state.planAndAddOns.addOns &&
      Object.keys(state.planAndAddOns.addOns).length > 0
  );

export const selectAddOnCount = (state: {
  planAndAddOns: PlanAndAddOnsState;
}) =>
  state.planAndAddOns.addOns
    ? Object.keys(state.planAndAddOns.addOns).length
    : 0;

export const selectSelectedAddOnIds = (state: {
  planAndAddOns: PlanAndAddOnsState;
}) =>
  state.planAndAddOns.addOns ? Object.keys(state.planAndAddOns.addOns) : [];

export const selectIsAddOnSelected =
  (addOnId: string) => (state: { planAndAddOns: PlanAndAddOnsState }) =>
    Boolean(state.planAndAddOns.addOns?.[addOnId]);

export const selectAddOnCost =
  (addOnId: string) => (state: { planAndAddOns: PlanAndAddOnsState }) =>
    state.planAndAddOns.addOns?.[addOnId] || 0;

export default planAndAddOnsSlice.reducer;
