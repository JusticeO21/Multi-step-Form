import styles from "./PersonalInfoForm.module.css";
import FormPreview from "../../Atoms/FormPreview/FormPreview";
import Header from "../../Atoms/Header/Header";
import Input from "../../Atoms/Input/Input";
import Button from "../../Atoms/Button/Button";
import useInput from "../../../Hooks/UseInput";
import useCustomNavigate from "../../../Hooks/UseNavigate";
import { useAppDispatch, useAppSelector } from "../../../Hooks/useRedux";
import { goToNextStep } from "../../../Redux/sidebarSlice";
import {
  minLength,
  maxLength,
  emailPattern,
  numberPattern,
  namePattern,
  required,
} from "./utils";
import { reset as resetPersonalInfo } from "../../../Redux/personalInfoSlice";
import Reset from "../../Atoms/Reset/Reset";

function PersonalInfoForm() {
  const { goToSelectedStep } = useCustomNavigate();
  const dispatch = useAppDispatch();
  const { name, mail, phone } = useAppSelector((state) => state.personalInfo);

  const {
    value: nameValue,
    handleChange: handleNameChange,
    errors: nameErrors,
    resetInput: resetName,
    setFieldReqiredError: setNameFieldRequired,
  } = useInput(name, [required, namePattern, minLength(2), maxLength(50)]);

  const {
    value: emailValue,
    handleChange: handleEmailChange,
    errors: emailErrors,
    resetInput: resetMail,
    setFieldReqiredError: setEmailFieldRequired,
  } = useInput(mail, [required, emailPattern, maxLength(100)]);

  const {
    value: phoneValue,
    handleChange: handlePhoneChange,
    errors: phoneErrors,
    resetInput: resetPhone,
    setFieldReqiredError: setPhoneFieldRequired,
  } = useInput(phone, [required, numberPattern]);

  function handleReset() {
    dispatch(resetPersonalInfo());
    resetMail();
    resetName();
    resetPhone();
  }

  function handleSubmit() {
    !nameValue && setNameFieldRequired();
    !emailValue && setEmailFieldRequired();
    !phoneValue && setPhoneFieldRequired();
    if (
      !nameValue ||
      !emailErrors ||
      !phoneValue ||
      nameErrors[0] ||
      emailErrors[0] ||
      phoneErrors[0]
    )
      return;
    dispatch(goToNextStep());
    goToSelectedStep();
  }

  return (
    <>
      <Header
        stageHeader="Personal info"
        explainHeader="Pease provide your name, email address and phone number"
      />
      <Reset onClick={handleReset} />
      <FormPreview>
        <Input
          type="text"
          name="name"
          label="name"
          onChange={handleNameChange}
          value={nameValue}
          placeholder="e.g Justice Owusu"
          error={nameErrors[0] ?? nameErrors[0]}
        />
        <Input
          type="email"
          name="mail"
          label="email address"
          onChange={handleEmailChange}
          value={emailValue}
          placeholder="e.g justice@gmail.com"
          error={emailErrors[0] ?? emailErrors[0]}
        />
        <Input
          type="phone"
          name="phone"
          label="phone number"
          onChange={handlePhoneChange}
          value={phoneValue}
          error={phoneErrors[0] ?? phoneErrors[0]}
          placeholder="+1 234 567 890"
        />
      </FormPreview>
      <span className={styles.buttons}>
        <Button
          onClick={() => {
            handleSubmit();
          }}
          text="Next Step"
          positionButton="right"
        />
      </span>
    </>
  );
}

export default PersonalInfoForm;
