import React, { useState } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { RegisterInput } from '../../../components/Inputs/RegisterInput';
import { CheckBoxInput } from '../../../components/Inputs/CheckBoxInput';
import { RegisterButton } from '../../../components/Buttons/RegisterButton';

// Style
import { AuthContent, AuthWrap, Divider, NavigationList, SocialMediaList } from '../Auth.styles';
// Img
import fbIcon from "../../../assets/img/Facebook.png";
import googleIcon from "../../../assets/img/google.png";
import twitterIcon from "../../../assets/img/twitter.png";


const SignIn = () => {

  const [isChecked, setIsChecked] = useState(false);
  const [loader, setLoader] = useState(false);
  const { handleSubmit, register, reset } = useForm();

  function onSubmit(data) {
    setLoader(true);
    axios
      .post("https://qo-url@-@stex-dir", data)
      .then(() => {
        setLoader(false);
        toast("Your message was sent");
        reset();
      })
      .catch(() => {
        setLoader(false);
    
        toast("Something went wrong");
      });
  }
  return (
    <AuthWrap>
      <AuthContent>
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <RegisterInput
            inputType={"email"}
            inputPlaceholder={"Email"}
            register={register}
            registerTarget={"email"}
            isRequired={true}
          />
          <RegisterInput
            inputType={"password"}
            inputPlaceholder={"Password"}
            register={register}
            registerTarget={"password"}
            isRequired={true}
          />
          <CheckBoxInput
            inputId={"remember"}
            inputChecked={isChecked}
            onInputChange={(event) => setIsChecked(event.target.checked)}
            inputLabelText={"Remamber"}
          />
          <RegisterButton
            buttonType={"submit"}
            buttonLoader={loader}
            buttonClassName={"submit-button"}
          >
            {"Sign In"}
          </RegisterButton>
        </form>
        <Divider>Or</Divider>
        <SocialMediaList>
          
            <li>
              <a href="https://twitter.com/" rel="noopener noreferrer">
                <img src={twitterIcon} alt="twitter" />
              </a>
            </li>
          <li>
            <a href="https://www.facebook.com/" rel="noopener noreferrer">
              <img src={fbIcon} alt="facebook" />
            </a>
          </li>
          <li>
            <a href="http://google.com/" rel="noopener noreferrer">
              <img src={googleIcon} alt="google" />
            </a>
            
          </li>
        </SocialMediaList>
        <NavigationList>
            <li>
              <Link className="forgot-pass" to={"forgot-password"}>
                Forgot your password?{" "}
              </Link>
              <span style={{ margin: "10px" }}>|</span>
            </li>
          
          <li>
            <Link to={"/sign-up"}>
              {"Sign Up"}
            </Link>
          </li>
        </NavigationList>
      </AuthContent>
    </AuthWrap>
  );
}

export default SignIn
