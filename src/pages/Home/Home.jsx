import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Buttons/Button";
import { HomeWrap } from "./Home.styles";
import homeLogo from "../../assets/img/home-logo.png";

const Home = () => {
  return (
    <HomeWrap>
      <img src={homeLogo} alt="" />
      <h1>NFL Mock Draft Simulator</h1>
      <p>
        Practice for your draft with fast mocks against realistic opponents.
      </p>
      <p>Take full control of your favorite team's every move</p>
      <Link to="/select-draft">
        <Button btnClassName="start-draft" btnText={"Start a mack draft"} />
      </Link>
    </HomeWrap>
  );
};

export default Home;
