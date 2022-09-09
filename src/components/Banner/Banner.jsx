import React from 'react'
// Styles
import { BannerContent, BannerWrap } from './Banner.styles';
// Image
import nflLogo from "../../assets/img/nfl-logo.png";

const Banner = () => {
  return (
    <BannerWrap>
      <BannerContent>
        <h1>NFL DRAFT 2023</h1>
        <img src={nflLogo} alt="" />
      </BannerContent>
    </BannerWrap>
  );
}

export default Banner