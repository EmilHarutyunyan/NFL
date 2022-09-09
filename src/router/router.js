import React from 'react'
import Layout from "../layout/Layout";
import {Route,Routes} from "react-router-dom"
// Pages
import Home from "../pages/Home/Home"
import SelectDraft from "../pages/SelectDraft/SelectDraft"
import SignUp  from '../pages/auth/SignUp/SignUp';
import SignIn from '../pages/auth/SignIn/SignIn';
import Players from '../pages/Players/Players';
import { DraftConfiguration } from '../pages/DraftConfiguration/DraftConfiguration';
import DraftValueChart from '../pages/DraftValueChart/DraftValueChart';

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="select-draft" element={<SelectDraft />} />
          <Route path="draft-configuration" element={<DraftConfiguration />} />
          <Route path="/players" element={<Players />}/>
          <Route path="/draft-value-chart" element={<DraftValueChart />}/>

        </Route>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </>
  );
}

export default Router