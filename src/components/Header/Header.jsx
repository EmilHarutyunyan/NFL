import React from 'react';
import { Link } from 'react-router-dom';
import './header.css'
// Components
import Navbar from "./Navbar";
import Button from "../Buttons/Button";
// Styles
import { BtnWrap, HeaderInner, HeaderWrap } from './Header.styles';
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
            <Navbar />
            <BtnWrap>
              <Link to="/sign-in">
                <Button btnText="Sign In" />
              </Link>
              <Link to="/sign-up">
                <Button btnText="Sign Up" />
              </Link>
            </BtnWrap>
          </HeaderInner>
        </div>
      </HeaderWrap>
    );
}

export default Header;