import React from 'react'
import { ProfileDesc, ProfileTitle } from '../Profile.styles'
import { BadgesItem, BadgesItems } from './Badges.styles';

// images
import bpaImg from "../../../assets/img/bpa.png"
// import bpaImg from "../../../assets/img/bpa.png"
// import bpaImg from "../../../assets/img/bpa.png"
// import bpaImg from "../../../assets/img/bpa.png"
// import bpaImg from "../../../assets/img/bpa.png"


const Badges = () => {
  return (
    <>
      <ProfileTitle>Badges</ProfileTitle>
      <ProfileDesc>Existing Badges</ProfileDesc>
      <BadgesItems>
        <BadgesItem>
          <img src={bpaImg} alt={'bpa'} />
        </BadgesItem>
        {/* <BadgesItem>
          <img src={bpaImg} alt={'bpa'} />
        </BadgesItem>
        <BadgesItem>
          <img src={bpaImg} alt={'bpa'} />
        </BadgesItem>
        <BadgesItem>
          <img src={bpaImg} alt={'bpa'} />
        </BadgesItem>
        <BadgesItem>
          <img src={bpaImg} alt={'bpa'} />
        </BadgesItem>
        <BadgesItem>
          <img src={bpaImg} alt={'bpa'} />
        </BadgesItem> */}
      </BadgesItems>
    </>
  );
}

export default Badges