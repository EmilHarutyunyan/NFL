import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { RegisterButton } from "../../../components/Buttons/RegisterButton";
import {CheckBoxInput} from "../../../components/Inputs/CheckBoxInput";
import {RegisterInput} from "../../../components/Inputs/RegisterInput";
import fbIcon from '../../assets/img/Facebook.png';
import googleIcon from '../../../components/assets/img/google.png';
import twitterIcon from '../../../components/assets/img/twitter.png';

export const RegisterSection = () => {
   const _isSignInPage = window.location.pathname === "/sign-in";

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
      <section className="register">
         <div className="register-content">
            <h2>{_isSignInPage ? "Sign In" : "Sign Up"}</h2>
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
               {!_isSignInPage && (
                  <RegisterInput
                     inputType={"password"}
                     inputPlaceholder={"Confirm Password"}
                     register={register}
                     registerTarget={"confirmPassword"}
                     isRequired={true}
                  />
               )}
               <CheckBoxInput
                  inputId={_isSignInPage ? "remember" : "agree"}
                  inputChecked={isChecked}
                  onInputChange={(event) => setIsChecked(event.target.checked)}
                  inputLabelText={
                     _isSignInPage ? (
                        <>Remamber</>
                     ) : (
                        <>
                           I agree to the{" "}
                           <Link to={"terms-of-use"}>Terms of Service</Link> and{" "}
                           <Link to={"/privacy-policy"}>Privacy Policy</Link>
                        </>
                     )
                  }
               />
               <RegisterButton
                  buttonType={"submit"}
                  buttonLoader={loader}
                  buttonClassName={"submit-button"}
               >
                  {_isSignInPage ? "Sign In" : "Sign Up"}
               </RegisterButton>
            </form>
            <div className="divider">Or</div>
            <ul className="social-medias-list">
               {_isSignInPage && (
                  <li>
                     <a href="https://twitter.com/" rel="noopener noreferrer">
                        <img src={twitterIcon} alt="twitter" />
                     </a>
                  </li>
               )}
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
            </ul>
            <ul className="navigation-list">
               {_isSignInPage && (
                  <li >
                     <Link className="forgot-pass" to={"forgot-password"}>Forgot your password? </Link>
                     <span style={{margin:"10px"}}>|</span>
                  </li>
               )}
               <li>
                  <Link to={_isSignInPage ? "/sign-up" : "/sign-in"}>
                     {_isSignInPage ? "Sign Up" : "Sign In"}
                  </Link>
               </li>
            </ul>
         </div>
      </section>
   );
};
