import React from 'react';
import { Link } from 'react-router-dom';

// Components
import Navbar from "./Navbar";
import Button from "../Buttons/Button";
// Styles
import { BtnWrap, HeaderBody, HeaderInner, HeaderWrap } from './Header.styles';
// Img
import mainLogo from '../../assets/img/logo.png';


function Header(props) {
    return (
      <HeaderWrap>
        <div className="main-container">
          <HeaderInner>
            <div>
              <Link to="/">
                <img src={mainLogo} alt="" />
              </Link>
            </div>
            <HeaderBody>
            <Navbar />
            <BtnWrap>
              <Link to="/sign-in">
                <Button btnClassName={'sign-in'} btnText="Sign In" />
              </Link>
              <Link to="/sign-up">
                <Button btnText="Sign Up" />
              </Link>
            </BtnWrap>

            </HeaderBody>
          </HeaderInner>
        </div>
      </HeaderWrap>
    );
}

export default Header;