import styled from "styled-components";

export const AuthWrap = styled.section`
  background: #022142;
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AuthContent = styled.div`
  box-shadow: 0px 0px 20px rgba(96, 106, 117, 0.2);
  border-radius: 10px;
  background-color: white;
  padding: 40px 80px;
  max-width: 600px;
  width: 100%;
  h2 {
    text-align: center;
    margin-bottom: 40px;
    font-size: 40px;
    color: #0e1118;
    font-family: "Saira Semi Condensed", sans-serif;
    font-weight: 400;
  }
`;

export const Divider = styled.div`
  color: #0e1118;
  font-size: 16px;
  font-family: "Saira Semi Condensed", sans-serif;
  font-weight: 400;
  margin-bottom: 32px;
  position: relative;
  text-align: center;
  ::before {
    content: "";
    border: 1px solid #afb4b9;
    position: absolute;
    left: 0;
    width: 188px;
    top: 50%;
    transform: translateY(-50%);
  }
  ::after {
    content: "";
    border: 1px solid #afb4b9;
    position: absolute;
    right: 0;
    width: 188px;
    top: 50%;
    transform: translateY(-50%);
  }
`;
export const SocialMediaList = styled.ul`
  list-style-type: none;
  display: flex;
  justify-content: center;
  li:not(:first-child) {
    margin-left: 24px;
  }
`;
export const NavigationList = styled.ul`
  list-style-type: none;
  text-align: center;
  margin-top: 40px;
  display: flex;
  justify-content: center;
  li a {
    color: #004ea3;
    font-size: 16px;
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    text-decoration: none;
    border-bottom: 1px solid;
  }
  li a.forgot-pass {
    color: #004ea3 !important;
    font-family: "Poppins", sans-serif !important;
    font-weight: 400 !important;
    text-decoration: none !important;
  }
`;
