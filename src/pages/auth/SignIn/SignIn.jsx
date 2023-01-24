import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { CheckBoxInput } from "../../../components/Inputs/CheckBoxInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// styles
import {
  AuthContent,
  AuthWrap,
  BtnWrap,
  CheckWrap,
  Error,
  InputWrap,
  NavigationList,
} from "../Auth.styles";
// images
import logoMid from "../../../assets/img/logoMid.png";
import { EyeCloseIcon, EyeOpenIcon } from "../../../components/Icons/Icons";
import { CircularProgress } from "@mui/material";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should have correct format")
    .required("Required"),
  password: yup
    .string()
    .required("Required")
    .min(8, "Password is too short - should be 8 chars minimum."),
});

const SignIn = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    // onSubmit
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    // alert(JSON.stringify(data));
    setLoader(!loader)
    setErrorMsg("Your email address or password is not correct");
    console.log(data);
  };
  return (
    <AuthWrap>
      <AuthContent>
        <Link to={"/"}>
          <img src={logoMid} alt="logo" />
        </Link>
        <h2>Sign In</h2>
        {errorMsg && <Error>{errorMsg}</Error>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputWrap>
            <input {...register("email")} placeholder="Email" />

            <Error messageEmail={errors.email?.message}>
              {errors.email?.message ? errors.email?.message : <br />}
            </Error>
          </InputWrap>
          <InputWrap>
            <div>
              <input
                {...register("password")}
                placeholder="Password"
                type={showPassword ? "text" : "password"}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOpenIcon /> : <EyeCloseIcon />}
              </button>
            </div>
            <Error messagePass={errors.password?.message}>
              {errors.password?.message ? errors.password?.message : <br />}
            </Error>
          </InputWrap>
          <CheckWrap>
            <CheckBoxInput
              inputId={"remember"}
              inputChecked={isChecked}
              onInputChange={(event) => setIsChecked(event.target.checked)}
              inputLabelText={"Remember"}
            />
            <Link to={"/"}>Forgot your password?</Link>
          </CheckWrap>
          <BtnWrap>
            <button type="submit">
              {loader && <CircularProgress size={17} color={"inherit"} />}
              Sign In
            </button>
          </BtnWrap>
        </form>

        <NavigationList>
          <li>
            Already have an account? <Link to={"/sign-up"}>{"Sign Up"}</Link>
          </li>
        </NavigationList>
      </AuthContent>
    </AuthWrap>
  );
};

export default SignIn;
