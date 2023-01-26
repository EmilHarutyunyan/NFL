import React from 'react';
import { Link } from 'react-router-dom';

// Components
import Navbar from "./Navbar";
import Button from "../Buttons/Button";
// Styles
import { BtnWrap, HeaderBody, HeaderInner, HeaderWrap, ProfileInfo } from './Header.styles';
// Img
import mainLogo from '../../assets/img/logo.png';
import TokenService from '../../service/token.service';
import profileImg from "../../assets/img/profile.png"
import { useDispatch } from 'react-redux';
import { logout } from '../../app/features/user/userSlice';
import { useState } from 'react';


function Header(props) {
    const user = TokenService.getUser() || null;
    const [userLog, setUserLog] = useState(user);
    const dispatch = useDispatch()

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
                {!userLog ? (
                  <>
                    <Link to="/sign-in">
                      <Button btnClassName={"sign-in"} btnText="Sign In" />
                    </Link>
                    <Link to="/sign-up">
                      <Button btnText="Sign Up" />
                    </Link>
                  </>
                ) : (
                  <>
                    <ProfileInfo>
                      <img
                        src={profileImg}
                        alt="profile"
                        width={22}
                        height={22}
                      />
                      {userLog?.first_name && <p>Hi, {userLog?.first_name}</p>}
                      <Button
                        btnText="Logout"
                        onBtnClick={() => {
                          dispatch(logout());
                          setUserLog(null);
                        }}
                      />
                    </ProfileInfo>
                  </>
                )}
              </BtnWrap>
            </HeaderBody>
          </HeaderInner>
        </div>
      </HeaderWrap>
    );
}

export default Header;