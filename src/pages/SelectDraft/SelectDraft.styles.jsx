import styled from "styled-components";
import { device } from "../../themes/Breakpoints";

export const Wrap = styled.div`
  max-width: 1000px;
  padding: 0 10px;
  margin: 165px auto;
  text-align: center;
  h1 {
    font-size: 64px;
    margin-bottom: 120px;
    color: #004ea3;
    font-family: "Saira Semi Condensed", sans-serif;
    font-weight: 500;
  }
  @media ${device.tablet} {
   h1 {
    font-size: 40px;
   }
  }
`;

export const SelectLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  a {
    padding: 40px 120px;
    background-color: #004ea3;
    font-family: "Saira Semi Condensed", sans-serif;
    font-weight: 400;
    color: #ffffff;
    font-size: 40px;
    text-decoration: none;
    border-radius: 10px;
  }
  @media ${device.tablet} {
    justify-content: center !important;
    a {
      padding: 9px 47px;
      font-size: 18px;
      margin: 0 10px;
    }
  }
`;
