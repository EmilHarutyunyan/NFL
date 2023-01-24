import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RegisterButton } from '../../../components/Buttons/RegisterButton';
import { CheckBoxInput } from '../../../components/Inputs/CheckBoxInput';
import { RegisterInput } from '../../../components/Inputs/RegisterInput';

// Style
import { AuthContent, AuthWrap, Divider, NavigationList, SocialMediaList } from '../Auth.styles';
// Img
import fbIcon from "../../../assets/img/Facebook.png";
import googleIcon from "../../../assets/img/google.png";


const SignUp = () => {
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
        <h2>{"Sign Up"}</h2>
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
       
            <RegisterInput
              inputType={"password"}
              inputPlaceholder={"Confirm Password"}
              register={register}
              registerTarget={"confirmPassword"}
              isRequired={true}
            />
      
          <CheckBoxInput
            inputId={"agree"}
            inputChecked={isChecked}
            onInputChange={(event) => setIsChecked(event.target.checked)}
            inputLabelText={
                <>
                  I agree to the{" "}
                  <Link to={"terms-of-use"}>Terms of Service</Link> and{" "}
                  <Link to={"/privacy-policy"}>Privacy Policy</Link>
                </>
              
            }
          />
          <RegisterButton
            buttonType={"submit"}
            buttonLoader={loader}
            buttonClassName={"submit-button"}
          >
            {"Sign Up"}
          </RegisterButton>
        </form>
        <Divider>Or</Divider>
        <SocialMediaList>
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
            <Link to={"/sign-in"}>
              {"Sign In"}
            </Link>
          </li>
        </NavigationList>
      </AuthContent>
    </AuthWrap>
  );
} 

export default SignUp