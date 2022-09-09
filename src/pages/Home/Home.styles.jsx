import styled from "styled-components";
import { device } from "../../themes/Breakpoints";

export const HomeWrap = styled.section`
  max-width: 880px;
  width: 100%;
  margin: 67px auto 0;
  text-align: center;
  padding-bottom: 100px;
  padding-left: 10px;
  padding-right: 10px;
  img {
    max-width: 179px;
    width: 100%;
    margin-bottom: 60px;
  }
  h1 {
    font-size: 65px;
    color: #004ea3;
    font-family: "Saira Semi Condensed", sans-serif;
    font-weight: 600;
    margin-bottom: 80px;
  }
  p {
    font-size: 32px;
    font-family: "Saira Semi Condensed", sans-serif;
    font-weight: 400;
    color: #46484a;
    margin-bottom: 13px;
  }
  @media ${device.laptop} {
    h1 {
      font-size: 40px;
    }
    p {
      font-size: 20px;
    }
  }
`;