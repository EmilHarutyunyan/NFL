import React, { Suspense, lazy } from 'react'
import Layout from "../layout/Layout";
import { Route, Routes } from "react-router-dom"
import ProtectRouter from './ProtectRouter';
import { useSelector } from 'react-redux';
import { selectDraftResult } from '../app/features/draftResult/draftResultSlice';
import { selectDraftConfig } from '../app/features/draftConfig/draftConfigSlice';
// Pages
// import Home from "../pages/Home/Home"
// import SelectDraft from "../pages/SelectDraft/SelectDraft"
import SignUp from '../pages/auth/SignUp/SignUp';
import SignIn from '../pages/auth/SignIn/SignIn';
import ResetPass from '../pages/auth/ResetPass/ResetPass';
import ForgotPass from '../pages/auth/ForgotPass/ForgotPass';
// import Players from '../pages/Players/Players';
import DraftConfiguration from '../pages/DraftConfiguration/DraftConfiguration';
// import DraftValueChart from '../pages/DraftValueChart/DraftValueChart';
import DraftPlayer from '../pages/DraftPlayer/DraftPlayer';
import TeamNeeds from '../pages/TeamNeeds/TeamNeeds';
// import DraftResult from '../pages/DraftResult/DraftResult';
import TeamList from '../pages/TeamList/TeamList';
import NotFound from '../pages/NotFoundPage/NotFoundPage';
import Spinner from '../components/Spinner/Spinner';

// Pages Lazy
const Home = lazy(() => import("../pages/Home/Home"));
const SelectDraft = lazy(() => import("../pages/SelectDraft/SelectDraft"));
const Players = lazy(() => import("../pages/Players/Players"));
const DraftResult = lazy(() => import("../pages/DraftResult/DraftResult"));
const DraftValueChart = lazy(() => import("../pages/DraftValueChart/DraftValueChart"));



const Router = () => {
  const { teamSelect } = useSelector(selectDraftConfig)
  const { results } = useSelector(selectDraftResult)

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={
            <Suspense fallback={<Spinner />}>
              <Home />
            </Suspense>
          }
          />
          <Route path="select-draft" element={
            <Suspense fallback={<Spinner />}>
              <SelectDraft />
            </Suspense>
          }
          />
          <Route path="draft-configuration" element={<DraftConfiguration />} />
          <Route path="draft-player" element={<ProtectRouter access={teamSelect} redirect={'/draft-configuration'}><DraftPlayer /></ProtectRouter>} />
          <Route path="draft-result" element={
            <ProtectRouter access={results} redirect={'/draft-configuration'}>
              <Suspense fallback={<Spinner />}>
                <DraftResult />
              </Suspense>
            </ProtectRouter>
          }

          />
          <Route path="players" element={
            <Suspense fallback={""}>
              <Players />
            </Suspense>
          }
          />
          <Route path="draft-value-chart" element={
            <Suspense fallback={<Spinner />}>
              <DraftValueChart /> 
            </Suspense>
          } />
          <Route path="team-needs" element={<TeamNeeds />} />
          <Route path="team-list" element={<TeamList />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPass />} />
        <Route path="/reset-password" element={<ResetPass />} />
      </Routes>
    </>
  );
}

export default Router