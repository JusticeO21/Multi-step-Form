import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PersonalInfoState {
  name: string;
  mail: string;
  phone: string;
}

export type PersonalInfoUpdate = Partial<PersonalInfoState>;

const initialState: PersonalInfoState = {
  name: "",
  mail: "",
  phone: "",
};

const isValidPersonalInfoField = (
  key: string
): key is keyof PersonalInfoState => {
  return ["name", "mail", "phone"].includes(key);
};

const personalInfoSlice = createSlice({
  name: "personalInfo",
  initialState,
  reducers: {
    updatePersonalInfo: (state, action: PayloadAction<PersonalInfoUpdate>) => {
      Object.entries(action.payload).forEach(([key, value]) => {
        if (isValidPersonalInfoField(key) && typeof value === "string") {
          state[key] = value.trim();
        }
      });
    },

    updateField: (
      state,
      action: PayloadAction<{ field: keyof PersonalInfoState; value: string }>
    ) => {
      const { field, value } = action.payload;
      state[field] = value.trim();
    },

    clearField: (state, action: PayloadAction<keyof PersonalInfoState>) => {
      state[action.payload] = "";
    },

    reset: () => {
      return { ...initialState };
    },

    setPersonalInfo: (state, action: PayloadAction<PersonalInfoState>) => {
      const { name, mail, phone } = action.payload;
      state.name = name.trim();
      state.mail = mail.trim();
      state.phone = phone.trim();
    },
  },
});

export const {
  updatePersonalInfo,
  updateField,
  clearField,
  reset,
  setPersonalInfo,
} = personalInfoSlice.actions;

export const selectPersonalInfo = (state: {
  personalInfo: PersonalInfoState;
}) => state.personalInfo;

export const selectName = (state: { personalInfo: PersonalInfoState }) =>
  state.personalInfo.name;

export const selectEmail = (state: { personalInfo: PersonalInfoState }) =>
  state.personalInfo.mail;

export const selectPhone = (state: { personalInfo: PersonalInfoState }) =>
  state.personalInfo.phone;

export const selectIsPersonalInfoComplete = (state: {
  personalInfo: PersonalInfoState;
}) => {
  const { name, mail, phone } = state.personalInfo;
  return Boolean(name.trim() && mail.trim() && phone.trim());
};

export default personalInfoSlice.reducer;
